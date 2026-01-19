# Vercel Deployment Fix Guide

## Common Vercel Deployment Errors & Solutions

### Error 1: Build Fails - Missing Dependencies
**Solution**: All dependencies are in package.json. Vercel will install them automatically.

### Error 2: Build Fails - Environment Variables
**Solution**: 
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add:
   - `VITE_SUPABASE_URL` = `https://rwdcbalumgohgyiegich.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = (your key)
3. Add to ALL environments (Production, Preview, Development)

### Error 3: Build Fails - Node Version
**Solution**: 
- `.nvmrc` file specifies Node 18
- `package.json` has engines field
- Vercel should auto-detect, but you can set it manually in Settings → Build & Development Settings

### Error 4: 404 Errors for Routes
**Solution**: 
- `vercel.json` is configured with rewrites
- All routes redirect to `/index.html` for SPA routing

### Error 5: CSS/Assets Not Loading
**Solution**: 
- Simplified `vercel.json` to minimal configuration
- Vercel auto-detects Vite framework
- Assets should load from `/assets/` directory

## Quick Fix Steps

1. **Delete vercel.json** (optional - Vercel auto-detects Vite)
   - Or keep the minimal version (just rewrites)

2. **Set Environment Variables in Vercel**:
   ```
   VITE_SUPABASE_URL=https://rwdcbalumgohgyiegich.supabase.co
   VITE_SUPABASE_ANON_KEY=your_actual_key
   ```

3. **Clear Build Cache**:
   - Vercel Dashboard → Deployments → Latest → Redeploy
   - Uncheck "Use existing Build Cache"

4. **Check Build Logs**:
   - Look for specific error messages
   - Common: missing env vars, Node version, dependency issues

## Minimal Vercel Configuration

The current `vercel.json` is minimal and should work. If issues persist:

**Option 1**: Delete `vercel.json` entirely (Vercel auto-detects Vite)
**Option 2**: Use this minimal version:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## Build Settings in Vercel

Verify these in **Settings → Build & Development Settings**:
- Framework Preset: **Vite** (auto-detected)
- Build Command: `npm run build` (auto-detected)
- Output Directory: `dist` (auto-detected)
- Install Command: `npm install` (auto-detected)
- Node.js Version: **18.x** (from .nvmrc)

## Testing Locally Before Deploy

```bash
# Clean build
rm -rf dist
npm run build

# Test preview
npm run preview
```

Visit `http://localhost:4173` and verify everything works.

## If Still Failing

1. **Check Vercel Build Logs**:
   - Copy the exact error message
   - Look for line numbers and file names

2. **Common Issues**:
   - Missing environment variables → Add them in Vercel
   - Node version mismatch → Set Node 18 in Vercel settings
   - Import errors → Check all file paths are correct
   - Build timeout → Increase timeout in Vercel settings

3. **Nuclear Option**:
   - Delete `.vercel` folder if exists
   - Disconnect and reconnect GitHub repo in Vercel
   - Fresh deployment

