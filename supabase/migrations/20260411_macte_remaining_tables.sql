-- ============================================================
-- Remaining MACTE features: warnings, support plans, evaluations,
-- placement sites, final recommendations
-- ============================================================

-- Academic warning triggers (auto-generated alerts)
create table if not exists residency_academic_warnings (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  warning_type text not null check (warning_type in (
    'low_rubric_score', 'insufficient_hours', 'missing_artifacts',
    'excessive_absences', 'missing_competencies', 'overdue_submissions'
  )),
  severity text not null default 'warning' check (severity in ('notice', 'warning', 'critical')),
  title text not null,
  details text,
  acknowledged boolean not null default false,
  acknowledged_by uuid references residency_profiles(id),
  acknowledged_at timestamptz,
  resolved boolean not null default false,
  resolved_at timestamptz,
  created_at timestamptz not null default now()
);

alter table residency_academic_warnings enable row level security;

create policy "Residents view own warnings"
  on residency_academic_warnings for select
  using (resident_id in (select id from residency_residents where profile_id = auth.uid()));

create policy "Mentors view assigned resident warnings"
  on residency_academic_warnings for select
  using (resident_id in (select id from residency_residents where mentor_id = auth.uid()));

create policy "Admins manage all warnings"
  on residency_academic_warnings for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Support plans
create table if not exists residency_support_plans (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  created_by uuid not null references residency_profiles(id),
  status text not null default 'active' check (status in ('draft', 'active', 'completed', 'extended', 'withdrawn')),
  reason text not null,
  goals text[] not null default '{}',
  strategies text[] not null default '{}',
  timeline_weeks int not null default 4 check (timeline_weeks between 4 and 12),
  start_date date not null,
  end_date date not null,
  outcome text,
  outcome_date timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table residency_support_plans enable row level security;

create policy "Residents view own support plans"
  on residency_support_plans for select
  using (resident_id in (select id from residency_residents where profile_id = auth.uid()));

create policy "Mentors manage assigned resident plans"
  on residency_support_plans for all
  using (resident_id in (select id from residency_residents where mentor_id = auth.uid()));

create policy "Admins manage all support plans"
  on residency_support_plans for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Support plan check-ins (monthly)
create table if not exists residency_support_checkins (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references residency_support_plans(id) on delete cascade,
  checkin_date date not null,
  progress_notes text not null,
  goals_met text[] not null default '{}',
  adjustments text,
  checked_by uuid not null references residency_profiles(id),
  created_at timestamptz not null default now()
);

alter table residency_support_checkins enable row level security;

create policy "Residents view own checkins"
  on residency_support_checkins for select
  using (plan_id in (
    select sp.id from residency_support_plans sp
    join residency_residents r on r.id = sp.resident_id
    where r.profile_id = auth.uid()
  ));

create policy "Mentors manage assigned checkins"
  on residency_support_checkins for all
  using (plan_id in (
    select sp.id from residency_support_plans sp
    join residency_residents r on r.id = sp.resident_id
    where r.mentor_id = auth.uid()
  ));

create policy "Admins manage all checkins"
  on residency_support_checkins for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Mentor evaluations (mid-year + end-of-year)
create table if not exists residency_mentor_evaluations (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  mentor_id uuid not null references residency_profiles(id),
  evaluation_type text not null check (evaluation_type in ('mid_year', 'end_of_year')),
  academic_year text not null,
  -- Scored areas (1-4 scale)
  lesson_planning_score numeric(3,2),
  classroom_management_score numeric(3,2),
  child_observation_score numeric(3,2),
  environment_preparation_score numeric(3,2),
  professional_conduct_score numeric(3,2),
  communication_score numeric(3,2),
  growth_mindset_score numeric(3,2),
  equity_practice_score numeric(3,2),
  -- Narrative sections
  strengths text,
  areas_for_growth text,
  recommendations text,
  overall_assessment text,
  -- Final recommendation (end-of-year only)
  final_recommendation text check (final_recommendation is null or final_recommendation in (
    'ready', 'ready_with_conditions', 'needs_additional_support', 'not_recommended'
  )),
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(resident_id, evaluation_type, academic_year)
);

alter table residency_mentor_evaluations enable row level security;

create policy "Residents view own evaluations"
  on residency_mentor_evaluations for select
  using (resident_id in (select id from residency_residents where profile_id = auth.uid()));

create policy "Mentors manage own evaluations"
  on residency_mentor_evaluations for all
  using (mentor_id = auth.uid());

create policy "Admins manage all evaluations"
  on residency_mentor_evaluations for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Placement sites
create table if not exists residency_placement_sites (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  contact_name text,
  contact_email text,
  contact_phone text,
  site_type text check (site_type in ('montessori_school', 'public_montessori', 'charter', 'community_program', 'other')),
  accreditation_status text,
  age_levels text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'approved', 'active', 'inactive', 'suspended')),
  approved_at timestamptz,
  approved_by uuid references residency_profiles(id),
  last_review_date date,
  next_review_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table residency_placement_sites enable row level security;

create policy "Anyone can read placement sites"
  on residency_placement_sites for select using (true);

create policy "Admins manage placement sites"
  on residency_placement_sites for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Link residents to placement sites
create table if not exists residency_placements (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  site_id uuid not null references residency_placement_sites(id) on delete cascade,
  start_date date not null,
  end_date date,
  status text not null default 'active' check (status in ('active', 'completed', 'withdrawn')),
  supervising_teacher text,
  notes text,
  created_at timestamptz not null default now(),
  unique(resident_id, site_id, start_date)
);

alter table residency_placements enable row level security;

create policy "Residents view own placements"
  on residency_placements for select
  using (resident_id in (select id from residency_residents where profile_id = auth.uid()));

create policy "Admins manage all placements"
  on residency_placements for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Final recommendation status on resident record
alter table residency_residents
  add column if not exists final_recommendation text
    check (final_recommendation is null or final_recommendation in (
      'ready', 'ready_with_conditions', 'needs_additional_support', 'not_recommended'
    )),
  add column if not exists recommendation_date timestamptz,
  add column if not exists recommendation_by uuid references residency_profiles(id);

-- Updated_at triggers
create or replace function update_support_plan_timestamp()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

create trigger trg_support_plan_updated
  before update on residency_support_plans
  for each row execute function update_support_plan_timestamp();

create or replace function update_mentor_evaluation_timestamp()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

create trigger trg_mentor_evaluation_updated
  before update on residency_mentor_evaluations
  for each row execute function update_mentor_evaluation_timestamp();

create or replace function update_placement_site_timestamp()
returns trigger as $$ begin new.updated_at = now(); return new; end; $$ language plpgsql;

create trigger trg_placement_site_updated
  before update on residency_placement_sites
  for each row execute function update_placement_site_timestamp();
