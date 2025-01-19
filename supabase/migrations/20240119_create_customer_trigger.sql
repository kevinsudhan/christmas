-- Drop existing objects if they exist
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists handle_new_user_signup();
drop function if exists generate_customer_id();
drop sequence if exists customer_id_seq;

-- Create sequence
create sequence if not exists customer_id_seq start 1;

-- Create or replace customers table
drop table if exists public.customers;
create table public.customers (
    id uuid references auth.users on delete cascade not null primary key,
    customer_id text unique,
    full_name text,
    email text,
    phone text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.customers enable row level security;

-- Create policies
create policy "Users can view own customer profile"
    on customers for select
    using ( auth.uid() = id );

create policy "Users can update own customer profile"
    on customers for update
    using ( auth.uid() = id );

create policy "Users can insert own customer profile"
    on customers for insert
    with check ( auth.uid() = id );

-- Function to generate customer ID
create or replace function public.generate_customer_id()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
    _date text;
    _sequence int;
    _customer_id text;
begin
    -- Get current date in YYMMDD format
    _date := to_char(current_timestamp, 'YYMMDD');
    
    -- Get next sequence number
    _sequence := nextval('customer_id_seq'::regclass);
    
    -- Format customer ID as EBS-YYMMDD-XXXX where XXXX is the sequence padded with zeros
    _customer_id := 'EBS-' || _date || '-' || lpad(_sequence::text, 4, '0');
    
    return _customer_id;
end;
$$;
