-- Extend the existing shared Command Center contact records in place.
-- Original IDs, names, links, platforms, notes, status, owners and timestamps stay intact.
-- Apply with Supabase's migration API as extend_relationship_crm.
begin;

alter table public.influencers
  add column category text not null default 'Creator'
    check (category in ('Creator', 'Athlete', 'Collaborator', 'Supplier')),
  add column organization text,
  add column email text,
  add column phone text,
  add column next_action text,
  add column follow_up_date date;

create table public.crm_activities (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.influencers(id) on delete cascade,
  kind text not null default 'Note'
    check (kind in ('Note', 'Email', 'DM', 'Call', 'Meeting', 'Other')),
  occurred_on date not null default current_date,
  body text not null check (length(btrim(body)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.crm_commitments (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references public.influencers(id) on delete cascade,
  title text not null check (length(btrim(title)) > 0),
  responsible_party text not null default 'FlockFam'
    check (responsible_party in ('FlockFam', 'Contact')),
  due_date date,
  status text not null default 'Planned'
    check (status in ('Planned', 'In progress', 'Complete', 'Cancelled')),
  value_usd numeric(12,2) check (value_usd >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index crm_activities_contact_date_idx
  on public.crm_activities (contact_id, occurred_on desc, created_at desc);
create index crm_commitments_contact_id_idx
  on public.crm_commitments (contact_id);
create index crm_commitments_open_due_idx
  on public.crm_commitments (due_date) where status in ('Planned', 'In progress');
create index influencers_follow_up_idx
  on public.influencers (follow_up_date) where follow_up_date is not null;

create function public.crm_set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke all on function public.crm_set_updated_at() from public, anon, authenticated;
create trigger crm_activities_updated_at before update on public.crm_activities
  for each row execute function public.crm_set_updated_at();
create trigger crm_commitments_updated_at before update on public.crm_commitments
  for each row execute function public.crm_set_updated_at();

alter table public.crm_activities enable row level security;
alter table public.crm_commitments enable row level security;
revoke all on public.crm_activities, public.crm_commitments from public, anon, authenticated;
grant select, insert, update, delete on public.crm_activities, public.crm_commitments to authenticated;
grant all on public.crm_activities, public.crm_commitments to service_role;

-- Same signed-in shared-workspace access as the existing influencers table.
-- Contacts are shared business records, not private per-user address books.
create policy authenticated_shared_crm on public.crm_activities
  for all to authenticated using (true) with check (true);
create policy authenticated_shared_crm on public.crm_commitments
  for all to authenticated using (true) with check (true);

comment on column public.influencers.category is
  'CRM category. Existing influencer records remain Creators with their original IDs and fields.';
comment on table public.crm_activities is 'Manually logged contact conversations and notes. Does not send messages.';
comment on table public.crm_commitments is 'Promises and deliverables for shared Command Center relationships.';

commit;
