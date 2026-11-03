-- Appointment requests coming from the public website form.
-- Run once in the Supabase SQL Editor. Safe to re-run.

create table if not exists public.appointment_requests (
  id               uuid primary key default gen_random_uuid(),
  full_name        text not null,
  phone            text not null,
  email            text not null,
  age              integer check (age between 0 and 120),
  issue            text,
  appointment_date date not null,
  appointment_time text not null check (appointment_time ~ '^([01][0-9]|2[0-3]):[0-5][0-9]$'),
  status           text not null default 'new' check (status in ('new', 'converted', 'rejected')),
  created_at       timestamptz not null default now()
);

-- One active booking per slot; a rejected request frees its slot.
create unique index if not exists appointment_requests_slot_unique
  on public.appointment_requests (appointment_date, appointment_time)
  where status <> 'rejected';

-- No policies are defined, so browsers (publishable key) cannot read or write;
-- only the backend, using the secret key, can access this table.
alter table public.appointment_requests enable row level security;
