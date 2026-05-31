-- Webmaister — Supabase Database Schema
-- Run this in your Supabase SQL editor to set up the database.

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS
-- Extended profile table (Supabase auth.users handles auth)
-- ============================================================
create table public.users (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  name text not null,
  plan text not null default 'free' check (plan in ('free', 'starter', 'pro', 'agency')),
  credits integer not null default 10,
  avatar_url text,
  is_admin boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;

create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = id);

-- Auto-create user profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  plan text not null check (plan in ('free', 'starter', 'pro', 'agency')),
  status text not null default 'active' check (status in ('active', 'canceled', 'past_due')),
  current_period_end timestamptz,
  stripe_subscription_id text,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Users can view their own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- ============================================================
-- PROJECTS
-- ============================================================
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  name text not null,
  status text not null default 'draft' check (status in ('draft', 'generating', 'ready', 'published')),

  -- Intake data stored as JSONB for flexibility
  business_name text,
  industry text,
  target_audience text,
  main_service text,
  location text,
  desired_pages text[] default '{}',
  brand_tone text,
  brand_colors text[] default '{}',
  website_goal text,

  thumbnail_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Users can view their own projects"
  on public.projects for select
  using (auth.uid() = user_id);

create policy "Users can create their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);

-- Admins can view all projects
create policy "Admins can view all projects"
  on public.projects for select
  using (exists (select 1 from public.users where id = auth.uid() and is_admin = true));

-- ============================================================
-- WEBSITE PAGES
-- ============================================================
create table public.website_pages (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  slug text not null,
  title text not null,
  "order" integer not null default 0,

  -- Content fields
  headline text,
  subheadline text,
  body text,
  cta_text text,
  cta_url text,
  seo_title text,
  seo_description text,
  sections jsonb default '[]',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (project_id, slug)
);

alter table public.website_pages enable row level security;

create policy "Users can manage pages of their own projects"
  on public.website_pages for all
  using (
    exists (
      select 1 from public.projects
      where id = project_id and user_id = auth.uid()
    )
  );

-- ============================================================
-- AI GENERATIONS
-- Tracks every AI call for auditing and credit usage
-- ============================================================
create table public.ai_generations (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  type text not null check (type in ('sitemap', 'page_copy', 'seo', 'structure')),
  prompt text,
  result text,
  model text default 'gpt-4o',
  credits_used integer not null default 1,
  created_at timestamptz not null default now()
);

alter table public.ai_generations enable row level security;

create policy "Users can view their own AI generations"
  on public.ai_generations for select
  using (auth.uid() = user_id);

-- ============================================================
-- DONE FOR YOU REQUESTS
-- ============================================================
create table public.done_for_you_requests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users(id) on delete set null,
  name text not null,
  email text not null,
  business_name text not null,
  description text not null,
  budget text not null,
  timeline text not null,
  status text not null default 'pending'
    check (status in ('pending', 'in_review', 'accepted', 'in_progress', 'delivered')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.done_for_you_requests enable row level security;

create policy "Users can view their own DFY requests"
  on public.done_for_you_requests for select
  using (auth.uid() = user_id);

create policy "Anyone can submit a DFY request"
  on public.done_for_you_requests for insert
  with check (true);

create policy "Admins can manage all DFY requests"
  on public.done_for_you_requests for all
  using (exists (select 1 from public.users where id = auth.uid() and is_admin = true));

-- ============================================================
-- HELPER: update updated_at on row change
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at before update on public.users
  for each row execute procedure update_updated_at();

create trigger update_projects_updated_at before update on public.projects
  for each row execute procedure update_updated_at();

create trigger update_pages_updated_at before update on public.website_pages
  for each row execute procedure update_updated_at();

create trigger update_dfy_updated_at before update on public.done_for_you_requests
  for each row execute procedure update_updated_at();
