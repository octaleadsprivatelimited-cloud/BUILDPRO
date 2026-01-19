# Construction Company Demo Website

A modern, premium construction company website built with React, Vite, Tailwind CSS, and Supabase.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Premium design with black, white, and gold accents
- **Responsive Design**: Mobile-first, fully responsive layout
- **Smooth Animations**: Hover effects and transitions throughout
- **SEO-Friendly**: Proper meta tags and semantic HTML

### Pages
- **Home Page**: Hero section, highlights, why choose us, recent projects, testimonials
- **About Us**: Company story, mission & vision, stats, team section
- **Services**: Dynamic service cards from Supabase
- **Projects**: Filterable project gallery with images
- **Contact**: Lead generation form with WhatsApp integration

### Admin Panel
- **Protected Routes**: Supabase authentication required
- **Dashboard**: Overview stats (leads, projects, services)
- **Lead Management**: View and update lead status
- **Project CRUD**: Add, edit, delete projects with image URLs
- **Service CRUD**: Add, edit, delete services
- **Real-time Updates**: Changes reflect immediately

### Backend
- **Supabase Integration**: Auth, Database, and Storage
- **Row Level Security**: Proper RLS policies for data protection
- **Lead Storage**: All contact form submissions saved to database

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier works)

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your URL and anon key
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Schema

Run these SQL queries in your Supabase SQL Editor:

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

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Policies for leads (public can insert, authenticated can read/update)
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read leads" ON leads FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update leads" ON leads FOR UPDATE USING (auth.role() = 'authenticated');

-- Policies for projects (public can read, authenticated can manage)
CREATE POLICY "Anyone can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated');

-- Policies for services (public can read, authenticated can manage)
CREATE POLICY "Anyone can read services" ON services FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage services" ON services FOR ALL USING (auth.role() = 'authenticated');
```

### 4. Storage Setup

1. Go to Storage in Supabase dashboard
2. Create a bucket named `project-images`
3. Set it to **Public** bucket
4. Add policy: Allow public read access

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Header.jsx      # Navigation header
│   ├── Footer.jsx      # Site footer
│   ├── WhatsAppButton.jsx  # Floating WhatsApp button
│   └── ProtectedRoute.jsx  # Auth guard for admin
├── pages/              # Page components
│   ├── Home.jsx        # Landing page
│   ├── About.jsx       # About us page
│   ├── Services.jsx    # Services listing
│   ├── Projects.jsx    # Projects gallery
│   ├── Contact.jsx     # Contact form
│   ├── AdminLogin.jsx  # Admin authentication
│   └── AdminDashboard.jsx  # Admin panel
├── config/
│   └── supabase.js     # Supabase client configuration
├── App.jsx             # Main app with routing
├── main.jsx            # React entry point
└── index.css           # Global styles with Tailwind
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)**: Get started in 5 minutes
- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)**: Detailed Supabase setup guide
- **[seed-data.sql](./seed-data.sql)**: Sample data for testing

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Click "Sign Up" to create an account
3. Enter email and password (min 6 characters)
4. Verify email (or disable email confirmation in Supabase for dev)
5. Log in and access admin panel at `/admin`

**Note**: Any authenticated user can access the admin panel. For production, consider adding role-based access control.

## 🚢 Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

The `vercel.json` file is pre-configured for optimal deployment.

### Other Platforms

This project can be deployed to any platform that supports Vite:
- Netlify
- Railway
- Render
- AWS Amplify

Just make sure to set the environment variables in your platform's settings.

## 🎨 Customization

### Update Branding
- Edit colors in `tailwind.config.js`
- Update logo in `src/components/Header.jsx`
- Change company name throughout the codebase

### Update Contact Info
- Footer: `src/components/Footer.jsx`
- Contact page: `src/pages/Contact.jsx`
- WhatsApp: `src/components/WhatsAppButton.jsx`

### Add Features
- Image upload: Implement Supabase Storage API in admin panel
- Email notifications: Use Supabase Edge Functions
- Analytics: Add Google Analytics or similar
- Blog: Add a blog section with Supabase

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel-ready

## 📝 License

MIT

## 🙏 Credits

Built with modern web technologies and best practices. Images from Unsplash (update with your own in production).

