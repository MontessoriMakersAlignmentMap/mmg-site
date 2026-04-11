-- ============================================================
-- Practicum Hour Tracking & Portfolio Artifact Checklist
-- MACTE requirement: 540 teaching hours + 90 observation hours
-- ============================================================

-- Practicum daily log entries
create table if not exists residency_practicum_logs (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  log_date date not null,
  hours_teaching numeric(4,1) not null default 0 check (hours_teaching >= 0 and hours_teaching <= 12),
  hours_observation numeric(4,1) not null default 0 check (hours_observation >= 0 and hours_observation <= 12),
  lessons_given int not null default 0 check (lessons_given >= 0),
  observations_made int not null default 0 check (observations_made >= 0),
  reflection text,
  questions text,
  verified_by uuid references residency_profiles(id),
  verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique(resident_id, log_date)
);

alter table residency_practicum_logs enable row level security;

create policy "Residents manage own practicum logs"
  on residency_practicum_logs for all
  using (
    resident_id in (
      select id from residency_residents where profile_id = auth.uid()
    )
  );

create policy "Mentors view assigned resident practicum logs"
  on residency_practicum_logs for select
  using (
    resident_id in (
      select id from residency_residents where mentor_id = auth.uid()
    )
  );

create policy "Admins manage all practicum logs"
  on residency_practicum_logs for all
  using (
    exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin')
  );

-- Portfolio artifact types enum
do $$ begin
  create type portfolio_artifact_type as enum (
    'video_lesson',
    'photo_environment',
    'work_sample',
    'lesson_plan',
    'reflection',
    'observation_record',
    'parent_communication',
    'professional_development',
    'capstone_video',
    'capstone_reflection',
    'other'
  );
exception when duplicate_object then null;
end $$;

-- Portfolio artifact checklist with required quantities
create table if not exists residency_portfolio_requirements (
  id uuid primary key default gen_random_uuid(),
  artifact_type portfolio_artifact_type not null,
  label text not null,
  description text,
  required_count int not null default 1,
  sort_order int not null default 0,
  level_id uuid references residency_levels(id),
  created_at timestamptz not null default now()
);

alter table residency_portfolio_requirements enable row level security;

create policy "Anyone can read portfolio requirements"
  on residency_portfolio_requirements for select
  using (true);

create policy "Admins manage portfolio requirements"
  on residency_portfolio_requirements for all
  using (
    exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin')
  );

-- Candidate portfolio artifacts (uploaded items)
create table if not exists residency_portfolio_artifacts (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  requirement_id uuid references residency_portfolio_requirements(id),
  artifact_type portfolio_artifact_type not null,
  title text not null,
  description text,
  file_url text,
  file_name text,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'approved', 'revision_requested')),
  mentor_feedback text,
  reviewed_by uuid references residency_profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

alter table residency_portfolio_artifacts enable row level security;

create policy "Residents manage own portfolio artifacts"
  on residency_portfolio_artifacts for all
  using (
    resident_id in (
      select id from residency_residents where profile_id = auth.uid()
    )
  );

create policy "Mentors view assigned resident artifacts"
  on residency_portfolio_artifacts for select
  using (
    resident_id in (
      select id from residency_residents where mentor_id = auth.uid()
    )
  );

create policy "Admins manage all portfolio artifacts"
  on residency_portfolio_artifacts for all
  using (
    exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin')
  );

-- Seminar attendance tracking
create table if not exists residency_seminars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  seminar_date date not null,
  description text,
  created_at timestamptz not null default now()
);

alter table residency_seminars enable row level security;

create policy "Anyone can read seminars"
  on residency_seminars for select using (true);

create policy "Admins manage seminars"
  on residency_seminars for all
  using (
    exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin')
  );

create table if not exists residency_seminar_attendance (
  id uuid primary key default gen_random_uuid(),
  seminar_id uuid not null references residency_seminars(id) on delete cascade,
  resident_id uuid not null references residency_residents(id) on delete cascade,
  status text not null default 'present' check (status in ('present', 'absent', 'excused')),
  notes text,
  created_at timestamptz not null default now(),
  unique(seminar_id, resident_id)
);

alter table residency_seminar_attendance enable row level security;

create policy "Residents view own attendance"
  on residency_seminar_attendance for select
  using (
    resident_id in (
      select id from residency_residents where profile_id = auth.uid()
    )
  );

create policy "Admins manage attendance"
  on residency_seminar_attendance for all
  using (
    exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin')
  );

-- Competency sign-off (8 MACTE areas)
create table if not exists residency_competency_signoffs (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  competency_area text not null,
  met boolean not null default false,
  rubric_score numeric(3,2),
  signed_off_by uuid references residency_profiles(id),
  signed_off_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(resident_id, competency_area)
);

alter table residency_competency_signoffs enable row level security;

create policy "Residents view own competency signoffs"
  on residency_competency_signoffs for select
  using (
    resident_id in (
      select id from residency_residents where profile_id = auth.uid()
    )
  );

create policy "Mentors manage assigned resident signoffs"
  on residency_competency_signoffs for all
  using (
    resident_id in (
      select id from residency_residents where mentor_id = auth.uid()
    )
  );

create policy "Admins manage all signoffs"
  on residency_competency_signoffs for all
  using (
    exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin')
  );

-- Seed default portfolio requirements per MACTE handbook
insert into residency_portfolio_requirements (artifact_type, label, description, required_count, sort_order) values
  ('video_lesson', 'Lesson Presentation Videos', 'Video recordings of full lesson presentations demonstrating Montessori methodology', 6, 1),
  ('photo_environment', 'Prepared Environment Photos', 'Photographs documenting the prepared environment setup and organization', 10, 2),
  ('work_sample', 'Student Work Samples', 'Examples of student work demonstrating learning outcomes', 15, 3),
  ('lesson_plan', 'Detailed Lesson Plans', 'Written lesson plans with direct/indirect aims, materials, and presentation steps', 10, 4),
  ('reflection', 'Professional Reflections', 'Written reflections on teaching practice, growth areas, and professional development', 5, 5),
  ('observation_record', 'Child Observation Records', 'Structured observation records documenting individual child development', 8, 6),
  ('parent_communication', 'Parent Communication Samples', 'Examples of professional parent communications (conferences, newsletters, progress reports)', 3, 7),
  ('professional_development', 'Professional Development Log', 'Documentation of professional development activities and learning', 2, 8),
  ('capstone_video', 'Capstone Lesson Video', 'Final capstone lesson video demonstrating mastery', 1, 9),
  ('capstone_reflection', 'Capstone Reflection Paper', 'Comprehensive reflection paper accompanying capstone presentation', 1, 10)
on conflict do nothing;

-- Updated_at triggers
create or replace function update_practicum_log_timestamp()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger trg_practicum_log_updated
  before update on residency_practicum_logs
  for each row execute function update_practicum_log_timestamp();

create or replace function update_portfolio_artifact_timestamp()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger trg_portfolio_artifact_updated
  before update on residency_portfolio_artifacts
  for each row execute function update_portfolio_artifact_timestamp();
