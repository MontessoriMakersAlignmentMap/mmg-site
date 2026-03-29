-- jobs table
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  contact_name text not null,
  contact_email text not null,
  job_title text not null,
  level text not null,
  location text not null,
  start_date date,
  credential text not null default '',
  compensation text not null default '',
  employment_type text not null default '',
  school_type text not null default '',
  school_description text not null default '',
  job_summary text not null,
  application_link text not null default '',
  plan_type text not null default 'single',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

-- guide_profiles table
create table if not exists guide_profiles (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_initial text not null,
  email text not null,
  location text not null,
  open_to_relocate text not null default 'No',
  levels text[] not null default '{}',
  credential text not null,
  years_experience integer not null default 0,
  summary text not null,
  tags text[] not null default '{}',
  leadership_experience boolean not null default false,
  bilingual boolean not null default false,
  public_montessori boolean not null default false,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

-- RLS: enable row level security
alter table jobs enable row level security;
alter table guide_profiles enable row level security;

-- Allow anyone to insert (form submissions)
create policy "Anyone can submit a job" on jobs for insert with check (true);
create policy "Anyone can submit a guide profile" on guide_profiles for insert with check (true);

-- Only approved records are publicly readable
create policy "Public can read approved jobs" on jobs for select using (status = 'approved');
create policy "Public can read approved profiles" on guide_profiles for select using (status = 'approved');

-- ─── Migrations: run against existing DB (skip if running schema fresh) ────────

-- payment_status
alter table jobs
  add column if not exists payment_status text default null
  check (payment_status in ('paid', 'unpaid'));

-- admin review columns
alter table jobs add column if not exists approved_at  timestamptz default null;
alter table jobs add column if not exists expires_at   timestamptz default null;
alter table jobs add column if not exists notes        text        default null;

-- update status check to allow 'archived'
alter table jobs drop constraint if exists jobs_status_check;
alter table jobs
  add constraint jobs_status_check
  check (status in ('pending', 'approved', 'rejected', 'archived'));

-- allow service role to update jobs (used by admin actions + verify-checkout)
create policy "Service role can update jobs" on jobs
  for update using (true)
  with check (true);

-- source tracking (form origin)
alter table jobs          add column if not exists source text default null;
alter table guide_profiles add column if not exists source text default null;
