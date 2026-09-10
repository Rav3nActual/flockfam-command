-- Shared business payables and dated repayments. No real entries are seeded.
begin;
create table public.payables (
  id uuid primary key default gen_random_uuid(),
  payee text not null check (length(btrim(payee)) > 0),
  purpose text not null check (length(btrim(purpose)) > 0),
  original_amount numeric(12,2) not null check (original_amount > 0 and original_amount < 10000000000),
  incurred_on date not null default current_date,
  due_date date,
  repayment_terms text,
  contact_id uuid references public.influencers(id) on delete set null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default clock_timestamp()
);
create table public.payable_payments (
  id uuid primary key default gen_random_uuid(),
  payable_id uuid not null references public.payables(id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0 and amount < 10000000000),
  paid_on date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default clock_timestamp()
);
create index payables_contact_idx on public.payables(contact_id);
create index payable_payments_parent_date_idx on public.payable_payments(payable_id, paid_on desc);

alter table public.payables enable row level security;
alter table public.payable_payments enable row level security;
revoke all on public.payables, public.payable_payments from public, anon, authenticated;
grant select, insert, update, delete on public.payables, public.payable_payments to authenticated;
grant all on public.payables, public.payable_payments to service_role;
-- Match the existing signed-in, shared Command Center workspace.
create policy authenticated_shared_payables on public.payables
  for all to authenticated using (true) with check (true);
create policy authenticated_shared_payables on public.payable_payments
  for all to authenticated using (true) with check (true);

create function public.payables_validate_edit()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare repaid numeric;
begin
  if new.original_amount is distinct from old.original_amount then
    select coalesce(sum(amount),0) into repaid from public.payable_payments where payable_id=old.id;
    if new.original_amount < repaid then
      raise exception 'Original amount cannot be less than the payments already recorded.';
    end if;
  end if;
  new.updated_at=clock_timestamp();
  return new;
end;
$$;
create trigger payables_validate_edit before update on public.payables
  for each row execute function public.payables_validate_edit();

create function public.payable_payments_validate()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare parent_id uuid; original numeric; repaid numeric;
begin
  if tg_op='UPDATE' and new.payable_id is distinct from old.payable_id then
    raise exception 'A payment cannot be moved to another payable.';
  end if;
  parent_id=case when tg_op='DELETE' then old.payable_id else new.payable_id end;
  -- Lock and touch the parent before checking the total: concurrent payments serialize.
  update public.payables set updated_at=clock_timestamp() where id=parent_id
    returning original_amount into original;
  if not found then
    if tg_op='DELETE' then return old; end if; -- Parent deletion cascades to payments.
    raise exception 'This payable is no longer available. Refresh and try again.';
  end if;
  if tg_op='DELETE' then return old; end if;
  select coalesce(sum(amount),0) into repaid from public.payable_payments
    where payable_id=parent_id and id<>new.id;
  if repaid+new.amount > original then
    raise exception 'Payment exceeds the remaining balance. Refresh to see the latest balance.';
  end if;
  new.updated_at=clock_timestamp();
  return new;
end;
$$;
create trigger payable_payments_validate before insert or update or delete on public.payable_payments
  for each row execute function public.payable_payments_validate();

create function public.save_payable_payment(
  p_id uuid, p_payable_id uuid, p_amount numeric, p_paid_on date, p_notes text,
  p_expected_updated_at timestamptz default null
)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare payment public.payable_payments; parent public.payables;
begin
  select * into parent from public.payables where id=p_payable_id for update;
  if not found then raise exception 'This payable is no longer available. Refresh and try again.'; end if;
  select * into payment from public.payable_payments where id=p_id;
  if p_expected_updated_at is null then
    if found then
      -- A retry after a lost response must not create a second payment.
      if payment.payable_id is distinct from p_payable_id or payment.amount is distinct from p_amount
        or payment.paid_on is distinct from p_paid_on or payment.notes is distinct from p_notes then
        raise exception 'A payment was already saved from this form. Close it and refresh before making changes.';
      end if;
    else
      insert into public.payable_payments(id,payable_id,amount,paid_on,notes)
        values(p_id,p_payable_id,p_amount,p_paid_on,p_notes) returning * into payment;
    end if;
  else
    if not found or payment.payable_id<>p_payable_id or payment.updated_at<>p_expected_updated_at then
      raise exception 'This payment changed. Close the form and refresh before editing.';
    end if;
    update public.payable_payments set amount=p_amount,paid_on=p_paid_on,notes=p_notes
      where id=p_id returning * into payment;
  end if;
  select * into parent from public.payables where id=p_payable_id;
  return jsonb_build_object('payment',to_jsonb(payment),'payable',to_jsonb(parent));
end;
$$;

create function public.delete_payable_payment(p_id uuid,p_expected_updated_at timestamptz)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare payment public.payable_payments; parent public.payables;
begin
  select * into payment from public.payable_payments where id=p_id;
  if not found then raise exception 'This payment is no longer available. Refresh and try again.'; end if;
  select * into parent from public.payables where id=payment.payable_id for update;
  delete from public.payable_payments where id=p_id and updated_at=p_expected_updated_at returning * into payment;
  if not found then raise exception 'This payment changed. Refresh before deleting it.'; end if;
  select * into parent from public.payables where id=payment.payable_id;
  return jsonb_build_object('deleted_id',p_id,'payable',to_jsonb(parent));
end;
$$;
revoke all on function public.payables_validate_edit(),public.payable_payments_validate() from public,anon,authenticated;
revoke all on function public.save_payable_payment(uuid,uuid,numeric,date,text,timestamptz),public.delete_payable_payment(uuid,timestamptz) from public,anon;
grant execute on function public.save_payable_payment(uuid,uuid,numeric,date,text,timestamptz),public.delete_payable_payment(uuid,timestamptz) to authenticated,service_role;
comment on table public.payables is 'Original obligations; remaining balances are derived from dated repayments.';
comment on table public.payable_payments is 'Recorded repayments only. No money transfers are initiated.';
commit;
