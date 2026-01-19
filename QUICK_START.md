# Quick Start Guide

Get your Construction Company Demo website up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier works)

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy your Project URL and anon key

### 3. Configure Environment

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database

1. Open Supabase SQL Editor
2. Copy and paste the SQL from `SUPABASE_SETUP.md` (Step 4)
3. Run the queries to create tables
4. Set up RLS policies (Step 5 in SUPABASE_SETUP.md)

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

### 6. Create Admin Account

1. Navigate to `http://localhost:5173/admin/login`
2. Click "Sign Up"
3. Enter email and password
4. Check email for verification (or disable email confirmation in Supabase settings for dev)
5. Log in and start managing content!

### 7. Add Sample Data (Optional)

Run the SQL from `seed-data.sql` in Supabase SQL Editor to add sample projects and services.

## Project Structure

```
demo/
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── WhatsAppButton.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── config/         # Configuration files
│   │   └── supabase.js
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── .env                # Environment variables (create this)
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Customization

### Update Contact Information

1. **Footer**: Edit `src/components/Footer.jsx`
2. **Contact Page**: Edit `src/components/Contact.jsx`
3. **WhatsApp Button**: Edit phone number in `src/components/WhatsAppButton.jsx`

### Change Brand Colors

Edit `tailwind.config.js` to customize the gold accent color.

### Add Your Logo

Replace the text logo in `src/components/Header.jsx` with an image:

```jsx
<img src="/logo.png" alt="BuildPro" className="h-10" />
```

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

The `vercel.json` file is already configured for optimal deployment.

## Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env` file exists in root directory
- Check that variable names start with `VITE_`
- Restart dev server after creating `.env`

### Can't access admin panel
- Make sure you're logged in
- Check Supabase Auth settings
- Verify RLS policies are set up correctly

### Images not loading
- Check image URLs are valid
- For Supabase Storage, ensure bucket is public
- Verify storage policies allow public read

## Next Steps

- Add your own project images
- Customize content and branding
- Set up email notifications for new leads
- Configure WhatsApp number
- Add more features as needed!

## Support

For detailed setup instructions, see `SUPABASE_SETUP.md`
For general information, see `README.md`

