-- Supabase database schema for AMFS website

create extension if not exists "pgcrypto";

-- Admin users table stores authorized admin accounts by Supabase auth user ID.
create table if not exists admin_users (
  id uuid primary key,
  email text not null unique,
  role text not null default 'admin',
  created_at timestamp with time zone default now()
);

-- Career job listings.
create table if not exists job_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null,
  employment_type text not null,
  description text not null,
  requirements text[] not null default array[]::text[],
  campus_name text not null,
  address text not null,
  image_url text,
  expires_at timestamp with time zone,
  is_active boolean not null default true,
  created_at timestamp with time zone default now()
);

-- Candidate applications for jobs.
create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references job_posts(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  cover_letter text not null,
  resume_url text,
  created_at timestamp with time zone default now()
);

-- Public school content and contact inbox.
create table if not exists news_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  category text not null default 'News',
  excerpt text not null,
  body text not null,
  image_url text,
  event_date timestamp with time zone,
  is_published boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamp with time zone default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  parent_name text not null,
  student_name text not null,
  thoughts text not null,
  display_order integer not null default 0,
  is_published boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable row level security and policies for secure data access.
alter table admin_users enable row level security;
create policy "Allow authenticated admin to read own admin row" on admin_users for select using (auth.uid() = id);
create policy "Allow authenticated admin to insert own admin row" on admin_users for insert with check (auth.uid() = id);
create policy "Allow authenticated admin to update own admin row" on admin_users for update using (auth.uid() = id) with check (auth.uid() = id);

alter table job_posts enable row level security;
create policy "Allow public select of active jobs" on job_posts for select using (is_active = true);
create policy "Allow admin insert job posts" on job_posts for insert with check (exists (select 1 from admin_users where id = auth.uid()));
create policy "Allow admin update job posts" on job_posts for update using (exists (select 1 from admin_users where id = auth.uid())) with check (exists (select 1 from admin_users where id = auth.uid()));
create policy "Allow admin delete job posts" on job_posts for delete using (exists (select 1 from admin_users where id = auth.uid()));

alter table job_applications enable row level security;
create policy "Allow anyone to submit job applications" on job_applications for insert with check (true);
create policy "Allow admins to read submitted applications" on job_applications for select using (exists (select 1 from admin_users where id = auth.uid()));
create policy "Allow admins to delete submissions" on job_applications for delete using (exists (select 1 from admin_users where id = auth.uid()));
