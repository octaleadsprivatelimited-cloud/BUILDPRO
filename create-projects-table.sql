-- Create projects table if it doesn't exist
-- Run this in your Supabase SQL Editor

-- First, check if table exists, if not create it
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

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can read projects" ON projects;
DROP POLICY IF EXISTS "Authenticated users can manage projects" ON projects;

-- Create policies
-- Anyone can read projects (public website)
CREATE POLICY "Anyone can read projects" ON projects 
  FOR SELECT USING (true);

-- Authenticated users can manage projects (admin panel)
CREATE POLICY "Authenticated users can manage projects" ON projects 
  FOR ALL USING (auth.role() = 'authenticated');

-- Verify table was created
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'projects' 
ORDER BY ordinal_position;

