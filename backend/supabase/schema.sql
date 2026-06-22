-- Stitch Salon - Supabase (PostgreSQL) schema
-- Run this once in the Supabase SQL Editor (Project -> SQL Editor -> New query)

create extension if not exists pgcrypto;

-- ============ PROFILES ============
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ SERVICES ============
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category text not null check (category in ('face','hair','body','accessories','specialty')),
  title_key text not null,
  desc_key text not null,
  title_en text not null,
  title_ar text default '',
  desc_en text not null,
  desc_ar text default '',
  duration integer not null,
  price numeric not null,
  rating numeric default 5,
  reviews_count integer default 0,
  badge_key text default '',
  image_url text not null,
  banner_url text default '',
  process_desc_en text default '',
  process_desc_ar text default '',
  ingredients_en text default '',
  ingredients_ar text default '',
  aftercare_en text default '',
  aftercare_ar text default '',
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ EDITORIAL ============
create table if not exists editorials (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_key text not null,
  title_en text not null,
  title_ar text default '',
  desc_en text not null,
  desc_ar text default '',
  read_time text default '5 Min Read',
  image_url text not null,
  featured boolean default false,
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ============ REVIEWS ============
create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  user_id uuid references profiles(id) on delete set null,
  author_name text not null,
  title text not null,
  text text not null,
  rating integer not null check (rating between 1 and 5),
  created_at timestamptz default now()
);

-- ============ BOOKINGS ============
create sequence if not exists booking_ref_seq start 847291;

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  reference text unique default ('ST-' || lpad(nextval('booking_ref_seq')::text, 6, '0')),
  user_id uuid references profiles(id) on delete set null,
  service_id uuid references services(id) not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text default '',
  date text not null,
  time text not null,
  notes text default '',
  health_notes text default '',
  quantity integer default 1,
  discount_code text default '',
  discount_amount numeric default 0,
  subtotal numeric not null,
  deposit_amount numeric not null,
  total numeric not null,
  payment_method text default 'card' check (payment_method in ('card','applepay','googlepay')),
  status text default 'draft' check (status in ('draft','pending_deposit','confirmed','cancelled')),
  specialist text default 'Stitch Team',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============ CART ============
create table if not exists carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid references carts(id) on delete cascade,
  service_id uuid references services(id) on delete cascade,
  quantity integer default 1 check (quantity >= 1)
);

-- ============ CONTACT ============
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  subject text not null check (subject in ('treatment','booking','press','other')),
  message text not null,
  status text default 'new' check (status in ('new','read','replied')),
  created_at timestamptz default now()
);

-- ============ updated_at triggers ============
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on profiles;
create trigger trg_profiles_updated_at before update on profiles
  for each row execute function set_updated_at();

drop trigger if exists trg_services_updated_at on services;
create trigger trg_services_updated_at before update on services
  for each row execute function set_updated_at();

drop trigger if exists trg_bookings_updated_at on bookings;
create trigger trg_bookings_updated_at before update on bookings
  for each row execute function set_updated_at();

drop trigger if exists trg_carts_updated_at on carts;
create trigger trg_carts_updated_at before update on carts
  for each row execute function set_updated_at();

-- Note: the backend uses the Supabase SERVICE ROLE key, which bypasses
-- Row Level Security, so RLS can stay disabled (default) on these tables.
