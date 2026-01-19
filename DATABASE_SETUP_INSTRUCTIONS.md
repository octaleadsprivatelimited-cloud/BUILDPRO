# Database Setup Instructions - Fix "Table Not Found" Error

## Error Message
```
Failed to create project: Could not find the table 'public.projects' in the schema cache
```

This means the database tables haven't been created in your Supabase project yet.

## Quick Fix (5 minutes)

### Step 1: Open Supabase SQL Editor
1. Go to [supabase.com](https://supabase.com)
2. Log in to your account
3. Select your project: `rwdcbalumgohgyiegich`
4. Click on **SQL Editor** in the left sidebar
5. Click **New Query**

### Step 2: Run the Setup Script
1. Open the file `QUICK_DATABASE_SETUP.sql` from this project
2. Copy the entire contents
3. Paste into the Supabase SQL Editor
4. Click **Run** (or press Ctrl+Enter)

### Step 3: Verify Tables Were Created
After running the script, you should see:
- A success message
- A list showing: `leads`, `projects`, `services`

### Step 4: Test in Admin Panel
1. Go to your website's admin panel
2. Try creating a project again
3. It should work now!

## Alternative: Create Only Projects Table

If you only need to create the projects table:

1. Open `create-projects-table.sql`
2. Copy and paste into Supabase SQL Editor
3. Run it

## Verify Tables Exist

To check if tables exist:

1. In Supabase Dashboard, go to **Table Editor**
2. You should see three tables:
   - `leads`
   - `projects`
   - `services`

## Common Issues

### Issue: "Permission denied"
**Solution**: Make sure you're logged in as the project owner

### Issue: "Table already exists"
**Solution**: That's fine! The script uses `CREATE TABLE IF NOT EXISTS` so it won't break

### Issue: "Policy already exists"
**Solution**: The script drops existing policies first, so this shouldn't happen. If it does, just continue.

### Issue: Still getting errors after creating tables
**Solution**: 
1. Wait 10-30 seconds (Supabase needs to update schema cache)
2. Refresh your admin panel
3. Try again

## What the Script Does

1. **Creates 3 tables**:
   - `leads` - Stores contact form submissions
   - `projects` - Stores project information
   - `services` - Stores service information

2. **Sets up Row Level Security (RLS)**:
   - Public can read projects and services
   - Only authenticated users can create/update/delete
   - Only authenticated users can read leads

3. **Creates proper policies**:
   - Ensures data security
   - Allows public website to display content
   - Restricts admin functions to logged-in users

## After Setup

Once tables are created:
- ✅ You can create projects in admin panel
- ✅ You can create services in admin panel
- ✅ Contact form will save leads
- ✅ Website will display projects and services

## Need Help?

If you still have issues:
1. Check Supabase dashboard → Table Editor → Verify tables exist
2. Check browser console (F12) for detailed errors
3. Verify you're logged into admin panel
4. Make sure RLS policies are enabled (they should be after running the script)

