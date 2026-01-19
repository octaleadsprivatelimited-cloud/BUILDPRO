-- Quick Database Setup for Construction Company Demo
-- Run this entire script in Supabase SQL Editor
-- Go to: Supabase Dashboard → SQL Editor → New Query → Paste this → Run

-- ============================================
-- 1. CREATE LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can insert leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can read leads" ON leads;
DROP POLICY IF EXISTS "Authenticated users can update leads" ON leads;

-- Create policies for leads
CREATE POLICY "Anyone can insert leads" ON leads 
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read leads" ON leads 
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update leads" ON leads 
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================
-- 2. CREATE PROJECTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  completion_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projects;

-- Create policies for projects
CREATE POLICY "Anyone can read projects" ON projects 
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage projects" ON projects 
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 3. CREATE SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read services" ON services;
DROP POLICY IF EXISTS "Authenticated users can manage services" ON services;

-- Create policies for services
CREATE POLICY "Anyone can read services" ON services 
  FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage services" ON services 
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 4. VERIFY TABLES WERE CREATED
-- ============================================
SELECT 
  'Tables created successfully!' as status,
  table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('leads', 'projects', 'services')
ORDER BY table_name;

