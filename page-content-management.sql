-- Optional: Page Content Management Tables
-- Run this SQL if you want to manage page content dynamically from admin panel
-- This allows you to edit Home, About, and other page content without code changes

-- Home Page Content
CREATE TABLE IF NOT EXISTS home_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE, -- 'hero', 'highlights', 'why_choose_us', etc.
  title TEXT,
  subtitle TEXT,
  content TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- About Page Content
CREATE TABLE IF NOT EXISTS about_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL UNIQUE, -- 'overview', 'mission', 'vision', 'team', etc.
  title TEXT,
  content TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Testimonials Table (if you want to manage them dynamically)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Site Settings (contact info, social media, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE, -- 'company_name', 'email', 'phone', 'address', 'whatsapp', etc.
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE home_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Policies: Public can read, Authenticated can manage
CREATE POLICY "Anyone can read home_content" ON home_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage home_content" ON home_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read about_content" ON about_content FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage about_content" ON about_content FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Insert default site settings
INSERT INTO site_settings (key, value) VALUES
  ('company_name', 'BuildPro Construction'),
  ('email', 'info@buildpro.com'),
  ('phone', '+1 (555) 123-4567'),
  ('address', '123 Construction Ave, City, State 12345'),
  ('whatsapp', '1234567890'),
  ('facebook', ''),
  ('instagram', ''),
  ('linkedin', '')
ON CONFLICT (key) DO NOTHING;

