-- Run this once in Supabase: SQL Editor > New query > paste > Run
create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('gallery','video','ba','doctor','site','youtube','pano')),
  title text default '',
  category text default '',
  url text not null,
  url2 text,
  public_id text,
  public_id2 text,
  resource_type text default 'image',
  sort int default 0,
  visible boolean default true,
  created_at timestamptz default now()
);
create table if not exists feedback (
  id uuid primary key default gen_random_uuid(),
  name text,
  rating int,
  comment text,
  created_at timestamptz default now()
);
-- Row Level Security ON with no public policies: only the server (secret key) can read/write.
alter table media enable row level security;
alter table feedback enable row level security;
