-- Keep the legacy outreach statuses while allowing every status in CRM_STAGES.
-- Existing contact records are not modified.
begin;

alter table public.influencers
  drop constraint influencers_status_check;

alter table public.influencers
  add constraint influencers_status_check check (
    status in (
      'Not started', 'Pitched', 'Contacted', 'In conversation',
      'Active', 'Waiting', 'Paused', 'Closed',
      'Interview Prep', 'Reviewing', 'Published'
    )
  );

commit;
