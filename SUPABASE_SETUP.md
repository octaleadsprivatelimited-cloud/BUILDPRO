# Supabase Setup Guide

This guide will help you set up your Supabase backend for the Construction Company Demo website.

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Name: `construction-demo` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to you
5. Wait for project to be created (takes ~2 minutes)

## Step 2: Get API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## Step 3: Create Environment File

1. In your project root, create a `.env` file
2. Add your credentials:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Create Database Tables

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the following SQL:

```sql
-- Create leads table
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  completion_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create services table
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

4. Click "Run" to execute

## Step 5: Set Up Row Level Security (RLS)

Run this SQL in the SQL Editor:

```sql
-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies for leads
-- Anyone can insert (submit contact form)
CREATE POLICY "Anyone can insert leads" ON leads 
  FOR INSERT WITH CHECK (true);

-- Authenticated users can read leads
CREATE POLICY "Authenticated users can read leads" ON leads 
  FOR SELECT USING (auth.role() = 'authenticated');

-- Authenticated users can update leads
CREATE POLICY "Authenticated users can update leads" ON leads 
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Policies for projects
-- Anyone can read projects (public website)
CREATE POLICY "Anyone can read projects" ON projects 
  FOR SELECT USING (true);

-- Authenticated users can manage projects
CREATE POLICY "Authenticated users can manage projects" ON projects 
  FOR ALL USING (auth.role() = 'authenticated');

-- Policies for services
-- Anyone can read services (public website)
CREATE POLICY "Anyone can read services" ON services 
  FOR SELECT USING (true);

-- Authenticated users can manage services
CREATE POLICY "Authenticated users can manage services" ON services 
  FOR ALL USING (auth.role() = 'authenticated');
```

## Step 6: Set Up Storage (Optional - for project images)

1. Go to **Storage** in Supabase dashboard
2. Click "Create a new bucket"
3. Name: `project-images`
4. Set to **Public bucket** (toggle ON)
5. Click "Create bucket"
6. Go to **Policies** tab for the bucket
7. Add policy:

```sql
-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');
```

## Step 7: Create Admin Account

1. Start your development server: `npm run dev`
2. Navigate to `/admin/login`
3. Click "Don't have an account? Sign Up"
4. Enter your email and password (min 6 characters)
5. Check your email for verification link (if email confirmation is enabled)
6. After verification, log in with your credentials

## Step 8: Add Sample Data (Optional)

You can add sample data through the admin panel or run this SQL:

```sql
-- Sample Projects
INSERT INTO projects (title, location, type, description, completion_year, image_url) VALUES
('Modern Family Home', 'Los Angeles, CA', 'Residential', 'A beautiful 3-bedroom modern home with open floor plan', 2023, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'),
('Office Complex', 'New York, NY', 'Commercial', '5-story commercial building with modern amenities', 2022, 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800'),
('Kitchen Renovation', 'Chicago, IL', 'Renovation', 'Complete kitchen remodel with premium finishes', 2023, 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800');

-- Sample Services
INSERT INTO services (title, description, icon) VALUES
('Residential Construction', 'We build custom homes tailored to your vision. From initial design to final walkthrough, we ensure every detail meets your expectations.', '🏠'),
('Commercial Construction', 'Expert commercial construction services for offices, retail spaces, and industrial facilities. Delivered on time and within budget.', '🏢'),
('Interior & Renovation', 'Transform your existing space with our renovation services. We handle everything from design to execution with precision.', '🔨'),
('Turnkey Projects', 'Complete project management from concept to completion. We handle all aspects so you don''t have to.', '📋');
```

## Troubleshooting

### Authentication Issues
- Make sure email confirmation is disabled in Supabase Auth settings (for development)
- Or check your email spam folder for verification link

### RLS Policy Errors
- Make sure you're logged in as an authenticated user when accessing admin panel
- Check that policies are created correctly in SQL Editor

### Image Upload Issues
- Make sure storage bucket is set to public
- Check that storage policies allow public read access
- For production, consider implementing proper image upload with Supabase Storage API

## Next Steps

1. Customize the website content
2. Add your own project images
3. Configure WhatsApp number in `src/components/WhatsAppButton.jsx`
4. Update contact information in Footer and Contact page
5. Deploy to Vercel!

