-- News/Blog Site Database Setup
-- Run this in Supabase SQL Editor to transform the site into a news platform

-- ============================================
-- 1. CREATE ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL, -- 'us', 'world', 'business', 'arts', 'lifestyle', 'opinion', 'tech', 'sports'
  section TEXT, -- More specific section like 'politics', 'health', 'movies', etc.
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published, published_at);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- ============================================
-- 2. CREATE CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default categories
INSERT INTO categories (name, slug, description, order_index) VALUES
  ('U.S.', 'us', 'United States news and politics', 1),
  ('World', 'world', 'International news and global affairs', 2),
  ('Business', 'business', 'Business, finance, and economy', 3),
  ('Arts', 'arts', 'Culture, entertainment, and the arts', 4),
  ('Lifestyle', 'lifestyle', 'Health, travel, style, and living', 5),
  ('Opinion', 'opinion', 'Editorials and opinion pieces', 6),
  ('Tech', 'tech', 'Technology and innovation', 7),
  ('Sports', 'sports', 'Sports news and analysis', 8)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. CREATE AUTHORS TABLE (Optional)
-- ============================================
CREATE TABLE IF NOT EXISTS authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ============================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 5. CREATE POLICIES FOR ARTICLES
-- ============================================
DROP POLICY IF EXISTS "Anyone can read published articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can read all articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can manage articles" ON articles;

CREATE POLICY "Anyone can read published articles" ON articles 
  FOR SELECT USING (published = true);

CREATE POLICY "Authenticated users can read all articles" ON articles 
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage articles" ON articles 
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 6. CREATE POLICIES FOR CATEGORIES
-- ============================================
DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;

CREATE POLICY "Anyone can read categories" ON categories 
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage categories" ON categories 
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 7. CREATE POLICIES FOR AUTHORS
-- ============================================
DROP POLICY IF EXISTS "Anyone can read authors" ON authors;
DROP POLICY IF EXISTS "Authenticated users can manage authors" ON authors;

CREATE POLICY "Anyone can read authors" ON authors 
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage authors" ON authors 
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================
-- 8. CREATE FUNCTION TO GENERATE SLUG
-- ============================================
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'),
    '\s+', '-', 'g'
  ));
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. CREATE TRIGGER TO UPDATE UPDATED_AT
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 10. SAMPLE ARTICLES (Optional - for testing)
-- ============================================
-- Uncomment to add sample articles
/*
INSERT INTO articles (title, slug, excerpt, content, author, category, section, published, featured, published_at) VALUES
  ('Breaking: Major Policy Shift Announced', generate_slug('Breaking: Major Policy Shift Announced'), 'A significant change in policy that will affect millions.', 'Full article content here...', 'John Doe', 'us', 'politics', true, true, NOW()),
  ('Global Economic Trends in 2024', generate_slug('Global Economic Trends in 2024'), 'An analysis of worldwide economic patterns.', 'Full article content here...', 'Jane Smith', 'business', 'economy', true, false, NOW() - INTERVAL '1 day');
*/

-- ============================================
-- VERIFY TABLES
-- ============================================
SELECT 
  'Tables created successfully!' as status,
  table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('articles', 'categories', 'authors')
ORDER BY table_name;

