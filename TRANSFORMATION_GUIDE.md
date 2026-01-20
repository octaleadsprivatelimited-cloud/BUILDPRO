# Website Transformation Guide: Construction Site → News/Blog Site

## Overview
This guide explains the complete transformation from a construction company website to a news/blog platform similar to The New York Times.

## Database Setup (CRITICAL - DO THIS FIRST)

### Step 1: Run Database Setup Script
1. Go to Supabase Dashboard → SQL Editor
2. Open `news-site-database-setup.sql`
3. Copy and paste the entire script
4. Click **Run**

This creates:
- `articles` table - Stores all news articles/blog posts
- `categories` table - News sections (U.S., World, Business, etc.)
- `authors` table - Article authors
- All necessary RLS policies

### Step 2: Verify Tables
- Go to Supabase → Table Editor
- You should see: `articles`, `categories`, `authors`

## What Changed

### Pages
- ✅ **Home** - Now displays featured and latest articles
- ✅ **Article Detail** - Full article view (`/article/:slug`)
- ✅ **Section Pages** - Category pages (`/section/:category`)
- ❌ Removed: About, Services, Projects, Contact pages

### Components
- ✅ **Header** - News site navigation with sections
- ✅ **Footer** - News site footer
- ❌ Removed: WhatsApp button

### Admin Panel
- ⚠️ **Needs Update** - Currently still shows projects/services
- Will be updated to manage articles

### Styling
- ✅ Updated to news site aesthetic
- ✅ Removed construction/gold colors
- ✅ Clean, minimal design
- ✅ Serif fonts for headlines

## Next Steps

1. **Run the database setup SQL** (most important!)
2. **Update Admin Panel** - To manage articles instead of projects
3. **Add sample articles** - For testing
4. **Customize categories** - Add/remove as needed

## Admin Panel Update Needed

The admin panel still references projects/services. It needs to be updated to:
- Manage articles (create, edit, delete)
- Set featured articles
- Manage categories
- Set publish status

## Features

### Article Management
- Title, slug (auto-generated), excerpt, content
- Author, category, section
- Featured image
- Publish/unpublish
- Featured article flag
- Published date

### Categories
- U.S., World, Business, Arts, Lifestyle, Opinion, Tech, Sports
- Can be customized in database

### Display
- Featured articles on homepage
- Latest articles grid
- Category sections
- Article detail pages
- Related articles

## Testing

After setup:
1. Create articles in admin panel (once updated)
2. Or insert directly in Supabase
3. Visit homepage to see articles
4. Click articles to view full content
5. Navigate sections

