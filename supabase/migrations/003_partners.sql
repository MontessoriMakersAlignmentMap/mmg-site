-- partners table
create table if not exists partners (
  id uuid primary key default gen_random_uuid(),
  partner_name text not null,
  logo_image text,
  website_url text,
  short_description text,
  category text not null default 'organization' check (category in ('school', 'nonprofit', 'network', 'organization')),
  display_order integer not null default 0,
  is_featured boolean not null default false,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- index for public page query
create index if not exists partners_published_order_idx on partners (is_published, display_order);
