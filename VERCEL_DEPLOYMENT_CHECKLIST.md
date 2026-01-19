# Vercel Deployment Checklist

## ✅ Pre-Deployment Fixes Applied

1. **Fixed Supabase Config** - No longer throws error during build if env vars are missing
2. **Updated vercel.json** - Correct format with rewrites and headers
3. **Added Node Version** - Specified Node 18+ in package.json and .nvmrc
4. **Added .vercelignore** - Excludes unnecessary files from deployment
5. **Build Tested** - Local build completes successfully

## 🔧 Required Vercel Configuration

### 1. Environment Variables
Go to **Vercel Dashboard** → **Settings** → **Environment Variables** and add:

```
VITE_SUPABASE_URL=https://rwdcbalumgohgyiegich.supabase.co
VITE_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

**Important**: Add these for all environments (Production, Preview, Development)

### 2. Build Settings
Verify in **Settings** → **Build & Development Settings**:

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `dist` (auto-detected)
- **Install Command**: `npm install` (auto-detected)
- **Node.js Version**: 18.x (or higher)

### 3. Deployment Settings
- **Auto-deploy**: Enabled (recommended)
- **Build Cache**: Enabled (faster builds)

## 🚀 Deployment Steps

1. **Push to GitHub** (already done)
2. **Vercel Auto-Deploys** (if connected to GitHub)
   - Or manually trigger: **Deployments** → **Redeploy**

3. **Verify Deployment**:
   - Check build logs for errors
   - Visit deployed URL
   - Test all pages
   - Check browser console for errors

## 🐛 Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs in Vercel dashboard

### CSS/Assets Not Loading
- Clear Vercel cache and redeploy
- Check vercel.json rewrites configuration
- Verify assets are in dist/assets/ folder

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Add to all environments (Production, Preview, Development)
- Redeploy after adding variables

### Supabase Connection Issues
- Verify environment variables are set correctly
- Check Supabase project is active
- Verify RLS policies are set up

## ✅ Post-Deployment Verification

- [ ] Home page loads correctly
- [ ] All routes work (/, /about, /services, /projects, /contact)
- [ ] Admin login works (/admin/login)
- [ ] CSS styles are applied
- [ ] Images load correctly
- [ ] Forms submit successfully
- [ ] No console errors
- [ ] Mobile responsive

## 📝 Notes

- The build will complete even if Supabase env vars are missing (for build time)
- Runtime errors will occur if Supabase env vars are not set
- Always set environment variables in Vercel dashboard before deployment

