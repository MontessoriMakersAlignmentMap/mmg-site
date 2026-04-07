create table if not exists careers_jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  location text not null,
  job_type text not null,
  teaser text not null,
  content_html text not null,
  original_filename text,
  pdf_url text,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

alter table careers_jobs enable row level security;

create policy "Public can read active jobs" on careers_jobs
  for select using (is_active = true);

create policy "Service role full access" on careers_jobs
  for all using (true);
