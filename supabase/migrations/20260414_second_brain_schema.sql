-- ============================================================================
-- MMG Second Brain — Karpathy LLM Wiki pattern
-- 2026-04-14
--
-- Three layers:
--   raw_sources  — immutable ingested content (Google Drive, web)
--   wiki_pages   — LLM-compiled, structured markdown (owned by the LLM)
--   ingest_log   — append-only audit trail of ingest/compile/query ops
-- ============================================================================

-- ─── Raw sources ────────────────────────────────────────────────────────────
create table if not exists sb_raw_sources (
  id           uuid primary key default gen_random_uuid(),
  source_type  text not null check (source_type in ('drive', 'web')),
  external_id  text not null,              -- Drive file id or URL
  url          text,                        -- canonical URL (web page or drive link)
  title        text not null,
  mime_type    text,
  content      text not null,               -- extracted plain text / markdown
  content_hash text not null,               -- sha256 of content, for idempotent upsert
  metadata     jsonb not null default '{}'::jsonb,
  fetched_at   timestamptz not null default now(),
  compiled_at  timestamptz,                  -- null = not yet compiled into wiki
  unique (source_type, external_id)
);

create index if not exists sb_raw_sources_compiled_at_idx
  on sb_raw_sources (compiled_at);
create index if not exists sb_raw_sources_type_idx
  on sb_raw_sources (source_type);

-- ─── Wiki pages ─────────────────────────────────────────────────────────────
-- The LLM owns this layer. Slugs are stable identifiers (e.g. "index",
-- "entity/hannah-richardson", "concept/adult-culture").
create table if not exists sb_wiki_pages (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  kind        text not null check (kind in ('index', 'log', 'summary', 'entity', 'concept', 'topic')),
  body        text not null,                 -- markdown
  source_refs uuid[] not null default '{}',  -- raw_source ids that contributed
  updated_at  timestamptz not null default now(),
  created_at  timestamptz not null default now()
);

create index if not exists sb_wiki_pages_kind_idx on sb_wiki_pages (kind);
create index if not exists sb_wiki_pages_updated_idx on sb_wiki_pages (updated_at desc);

-- ─── Ingest log ─────────────────────────────────────────────────────────────
create table if not exists sb_ingest_log (
  id         uuid primary key default gen_random_uuid(),
  ts         timestamptz not null default now(),
  action     text not null,                  -- ingest_drive | ingest_web | compile | query
  status     text not null check (status in ('ok', 'error', 'skipped')),
  ref_id     uuid,                            -- raw_source or wiki_page id
  notes      text,
  metadata   jsonb not null default '{}'::jsonb
);

create index if not exists sb_ingest_log_ts_idx on sb_ingest_log (ts desc);

-- All three tables are admin-only. No RLS policies; access is gated at the
-- API route layer via ADMIN_PASSWORD + service-role Supabase client.
