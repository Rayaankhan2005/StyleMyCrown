# Supabase Setup Guide for StyleMyCrown

## Step 1: Get Your Supabase Credentials

1. Go to https://supabase.com/dashboard
2. Select your project (or create a new one)
3. Go to **Settings → API**
4. Copy these two values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (long string starting with `eyJ...`)

## Step 2: Add Credentials to Mobile App

Edit `mobile/.env` and replace with your actual values:

```
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Configure Google OAuth in Supabase

1. In Supabase Dashboard, go to **Authentication → Providers**
2. Enable **Google** provider
3. Add these redirect URLs:
   - `stylemycrown://auth/callback` (for mobile)
   - `http://localhost:3000/auth/callback` (for web)
4. Get Google OAuth credentials from Google Cloud Console
5. Add Client ID and Client Secret to Supabase

## Step 4: Configure Phone Auth in Supabase

1. In Supabase Dashboard, go to **Authentication → Providers**
2. Enable **Phone** provider
3. Configure SMS provider (Twilio recommended)
4. Add Twilio credentials

## Step 5: Create Users Table (Optional)

Run this SQL in Supabase SQL Editor:

```sql
-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  phone text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policy for users to read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Create policy for users to update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, phone, full_name)
  values (new.id, new.email, new.phone, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## Step 6: Test Authentication

Once credentials are added:

1. Restart Expo: `npx expo start --clear`
2. Open app on simulator
3. Try Google login
4. Try phone number login

## Files Created:

- `mobile/lib/supabase.ts` - Supabase client configuration
- `mobile/lib/auth.tsx` - Authentication context and hooks
- `mobile/.env` - Environment variables (add to .gitignore!)

## Next Steps:

- Update Login screen to use real Supabase auth
- Add protected routes
- Store user scans in Supabase database
