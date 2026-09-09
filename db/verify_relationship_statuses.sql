-- Run as a transaction: no verification contacts are retained.
-- Status/category arrays match crm.js at the time of this regression fix.
begin;
set local role authenticated;
do $$
declare
  contact_category text;
  contact_status text;
  contact_id uuid;
  saved_id uuid;
  affected integer;
begin
  foreach contact_category in array array['Creator', 'Athlete', 'Collaborator', 'Supplier'] loop
    foreach contact_status in array array['Not started', 'Pitched', 'Contacted', 'In conversation', 'Active', 'Waiting', 'Paused', 'Closed'] loop
      -- All fields sent by the actual new-contact form, including its default status.
      insert into public.influencers
        (person_name, category, organization, status, email, phone, platform,
         date_contacted, page_link, notes, next_action, follow_up_date)
      values
        ('CRM status regression', contact_category, null, contact_status, null, null,
         array['Instagram', 'Facebook'], current_date, null, null, null, current_date)
      returning id into contact_id;
      select id into saved_id from public.influencers
        where id = contact_id and status = contact_status and category = contact_category;
      assert saved_id = contact_id, 'New contact could not be read back';
      update public.influencers set status = contact_status, notes = 'Verified edit'
        where id = contact_id;
      get diagnostics affected = row_count;
      assert affected = 1, 'Contact status update failed';
      delete from public.influencers where id = contact_id;
    end loop;
  end loop;
  -- Preserve legacy statuses, including unset status on existing contacts.
  foreach contact_status in array array['Interview Prep', 'Reviewing', 'Published', null] loop
    insert into public.influencers(person_name, category, status)
      values ('CRM legacy status regression', 'Creator', contact_status)
      returning id into contact_id;
    delete from public.influencers where id = contact_id;
  end loop;
  begin
    insert into public.influencers(person_name, category, status)
      values ('Invalid CRM status regression', 'Athlete', 'Unsupported status');
    raise exception 'Invalid status was accepted';
  exception when check_violation then null;
  end;
end $$;
rollback;
select jsonb_build_object(
  'status_category_combinations', 32,
  'insert_read_update_delete', 'passed under authenticated role',
  'legacy_and_null_statuses', 'passed',
  'invalid_status', 'rejected',
  'test_writes', 'rolled back',
  'row_count', (select count(*) from public.influencers),
  'fingerprint', (select md5(jsonb_agg(to_jsonb(i) order by id)::text) from public.influencers i),
  'constraint_validated', (select convalidated from pg_constraint where conrelid='public.influencers'::regclass and conname='influencers_status_check')
) as verification;
