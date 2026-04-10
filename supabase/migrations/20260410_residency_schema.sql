-- ============================================================================
-- Montessori Makers Residency — Core Schema
-- 2026-04-10
-- ============================================================================

-- ─── Enums ─────────────────────────────────────────────────────────────────

create type residency_role as enum ('resident', 'mentor', 'admin');
create type lesson_status as enum ('draft', 'published', 'archived');
create type assignment_status as enum ('assigned', 'in_progress', 'submitted', 'reviewed', 'completed');
create type album_entry_status as enum ('draft', 'submitted', 'reviewed', 'approved', 'revision_requested');
create type resident_status as enum ('enrolled', 'active', 'on_leave', 'completed', 'withdrawn');

-- ─── Strands ───────────────────────────────────────────────────────────────
-- Montessori curriculum areas (e.g., Practical Life, Sensorial, Math, Language, Cultural)

create table residency_strands (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Levels ────────────────────────────────────────────────────────────────
-- Age/developmental bands (e.g., Infant/Toddler, Primary, Lower El, Upper El)

create table residency_levels (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  age_range text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Categories ────────────────────────────────────────────────────────────
-- Lesson types (e.g., Key Lesson, Extension, Enrichment, Introduction)

create table residency_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ─── Profiles ──────────────────────────────────────────────────────────────
-- Extends Supabase auth.users for residency-specific data

create table residency_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role residency_role not null default 'resident',
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Residents ─────────────────────────────────────────────────────────────

create table residency_residents (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references residency_profiles(id) on delete cascade,
  status resident_status not null default 'enrolled',
  cohort text,
  enrollment_date date not null default current_date,
  expected_completion date,
  mentor_id uuid references residency_profiles(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(profile_id)
);

-- ─── Lessons ───────────────────────────────────────────────────────────────

create table residency_lessons (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null,
  description text,
  content text,
  strand_id uuid not null references residency_strands(id),
  level_id uuid not null references residency_levels(id),
  category_id uuid not null references residency_categories(id),
  status lesson_status not null default 'draft',
  objectives text[],
  materials text[],
  file_urls text[],
  sort_order int not null default 0,
  created_by uuid references residency_profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(strand_id, level_id, slug)
);

-- ─── Lesson Assignments ───────────────────────────────────────────────────

create table residency_assignments (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  lesson_id uuid not null references residency_lessons(id) on delete cascade,
  assigned_by uuid references residency_profiles(id),
  status assignment_status not null default 'assigned',
  due_date date,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(resident_id, lesson_id)
);

-- ─── Album Entries ─────────────────────────────────────────────────────────
-- Resident-submitted work products tied to a lesson

create table residency_album_entries (
  id uuid primary key default gen_random_uuid(),
  resident_id uuid not null references residency_residents(id) on delete cascade,
  lesson_id uuid not null references residency_lessons(id),
  assignment_id uuid references residency_assignments(id),
  title text not null,
  content text,
  file_urls text[],
  status album_entry_status not null default 'draft',
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Feedback ──────────────────────────────────────────────────────────────
-- Mentor feedback on album entries

create table residency_feedback (
  id uuid primary key default gen_random_uuid(),
  album_entry_id uuid not null references residency_album_entries(id) on delete cascade,
  mentor_id uuid not null references residency_profiles(id),
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Indexes ───────────────────────────────────────────────────────────────

create index idx_lessons_strand on residency_lessons(strand_id);
create index idx_lessons_level on residency_lessons(level_id);
create index idx_lessons_category on residency_lessons(category_id);
create index idx_lessons_status on residency_lessons(status);
create index idx_assignments_resident on residency_assignments(resident_id);
create index idx_assignments_lesson on residency_assignments(lesson_id);
create index idx_assignments_status on residency_assignments(status);
create index idx_album_entries_resident on residency_album_entries(resident_id);
create index idx_album_entries_lesson on residency_album_entries(lesson_id);
create index idx_album_entries_status on residency_album_entries(status);
create index idx_feedback_album_entry on residency_feedback(album_entry_id);
create index idx_feedback_mentor on residency_feedback(mentor_id);
create index idx_residents_mentor on residency_residents(mentor_id);
create index idx_residents_cohort on residency_residents(cohort);
create index idx_profiles_role on residency_profiles(role);

-- ─── RLS Policies ──────────────────────────────────────────────────────────

alter table residency_strands enable row level security;
alter table residency_levels enable row level security;
alter table residency_categories enable row level security;
alter table residency_profiles enable row level security;
alter table residency_residents enable row level security;
alter table residency_lessons enable row level security;
alter table residency_assignments enable row level security;
alter table residency_album_entries enable row level security;
alter table residency_feedback enable row level security;

-- Public read for taxonomy tables
create policy "Public read strands" on residency_strands for select using (true);
create policy "Public read levels" on residency_levels for select using (true);
create policy "Public read categories" on residency_categories for select using (true);

-- Profiles: users can read all, update own
create policy "Read all profiles" on residency_profiles for select using (true);
create policy "Update own profile" on residency_profiles for update using (auth.uid() = id);

-- Lessons: published visible to all authenticated, draft/archived to admins
create policy "Read published lessons" on residency_lessons for select
  using (status = 'published' or exists (
    select 1 from residency_profiles where id = auth.uid() and role = 'admin'
  ));
create policy "Admin manage lessons" on residency_lessons for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Assignments: residents see own, mentors see their mentees, admins see all
create policy "Read own assignments" on residency_assignments for select
  using (
    resident_id in (select id from residency_residents where profile_id = auth.uid())
    or exists (select 1 from residency_profiles where id = auth.uid() and role in ('admin', 'mentor'))
  );
create policy "Admin manage assignments" on residency_assignments for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- Album entries: residents see/edit own, mentors and admins see all
create policy "Read own album entries" on residency_album_entries for select
  using (
    resident_id in (select id from residency_residents where profile_id = auth.uid())
    or exists (select 1 from residency_profiles where id = auth.uid() and role in ('admin', 'mentor'))
  );
create policy "Residents manage own album entries" on residency_album_entries for insert
  with check (resident_id in (select id from residency_residents where profile_id = auth.uid()));
create policy "Residents update own album entries" on residency_album_entries for update
  using (resident_id in (select id from residency_residents where profile_id = auth.uid()));

-- Feedback: mentors create, residents read own, admins read all
create policy "Read feedback" on residency_feedback for select
  using (
    album_entry_id in (
      select ae.id from residency_album_entries ae
      join residency_residents r on ae.resident_id = r.id
      where r.profile_id = auth.uid()
    )
    or exists (select 1 from residency_profiles where id = auth.uid() and role in ('admin', 'mentor'))
  );
create policy "Mentors create feedback" on residency_feedback for insert
  with check (exists (select 1 from residency_profiles where id = auth.uid() and role in ('admin', 'mentor')));
create policy "Mentors update own feedback" on residency_feedback for update
  using (mentor_id = auth.uid());

-- Residents: own record visible, mentors see mentees, admins see all
create policy "Read own resident record" on residency_residents for select
  using (
    profile_id = auth.uid()
    or mentor_id = auth.uid()
    or exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin')
  );
create policy "Admin manage residents" on residency_residents for all
  using (exists (select 1 from residency_profiles where id = auth.uid() and role = 'admin'));

-- ─── Storage bucket ────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public) values ('residency', 'residency', false)
on conflict (id) do nothing;

create policy "Authenticated upload to residency" on storage.objects for insert
  with check (bucket_id = 'residency' and auth.role() = 'authenticated');

create policy "Authenticated read residency files" on storage.objects for select
  using (bucket_id = 'residency' and auth.role() = 'authenticated');

-- ─── Updated_at trigger ────────────────────────────────────────────────────

create or replace function residency_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on residency_profiles
  for each row execute function residency_set_updated_at();
create trigger set_updated_at before update on residency_residents
  for each row execute function residency_set_updated_at();
create trigger set_updated_at before update on residency_lessons
  for each row execute function residency_set_updated_at();
create trigger set_updated_at before update on residency_assignments
  for each row execute function residency_set_updated_at();
create trigger set_updated_at before update on residency_album_entries
  for each row execute function residency_set_updated_at();
create trigger set_updated_at before update on residency_feedback
  for each row execute function residency_set_updated_at();
