# 🚀 Deploying TazaKaber to Vercel

This guide will walk you through deploying your TazaKaber news app to Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- NewsAPI key from [newsapi.org](https://newsapi.org)
- (Optional) Gmail account for email functionality

## Step 1: Get Your NewsAPI Key

1. Go to [newsapi.org](https://newsapi.org)
2. Click "Get API Key"
3. Sign up for a free account
4. Copy your API key

## Step 2: Set Up Email (Optional)

If you want email functionality:

1. **For Gmail:**
   - Go to Google Account → Security
   - Enable 2-Step Verification
   - Go to "App Passwords"
   - Generate a new app password for "Mail"
   - Copy the 16-character password

## Step 3: Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: TazaKaber news app"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/tazakaber.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub

2. **Import Repository**
   - Click "Import Project"
   - Select your `tazakaber` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `.next` (auto-filled)

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   **Required:**
   ```
   NEWSAPI_KEY = your_newsapi_key_here
   ```
   
   **Optional (for email):**
   ```
   EMAIL_HOST = smtp.gmail.com
   EMAIL_PORT = 587
   EMAIL_USER = your_email@gmail.com
   EMAIL_PASS = your_gmail_app_password
   NEXT_PUBLIC_APP_URL = https://your-app.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at `https://your-app.vercel.app`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? tazakaber
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEWSAPI_KEY
# Paste your NewsAPI key when prompted

# Add more env vars if needed
vercel env add EMAIL_HOST
vercel env add EMAIL_PORT
vercel env add EMAIL_USER
vercel env add EMAIL_PASS

# Deploy to production
vercel --prod
```

## Step 5: Verify Deployment

1. **Visit Your App**
   - Open the Vercel deployment URL
   - You should see the TazaKaber homepage

2. **Test News Feed**
   - Click on different categories
   - Verify news articles load

3. **Test Email (if configured)**
   - Enter your email in subscription form
   - Check your inbox for news digest

## Step 6: Update Environment Variables (if needed)

### Via Vercel Dashboard:
1. Go to your project on Vercel
2. Settings → Environment Variables
3. Add/Edit variables
4. Redeploy from Deployments tab

### Via CLI:
```bash
vercel env add VARIABLE_NAME
vercel --prod
```

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Verify `NEWSAPI_KEY` is valid
- Check build logs in Vercel dashboard

### News Not Loading
- Verify `NEWSAPI_KEY` is correct
- Check you haven't exceeded API limits (100/day on free tier)
- Check browser console for errors

### Email Not Working
- Verify Gmail App Password is correct (not regular password)
- Check 2FA is enabled on Gmail
- Verify all email env vars are set
- Check Vercel function logs

### API Routes 404
- Ensure you're using Next.js 14 App Router
- Verify files are in `app/api/` directory
- Check deployment logs

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Wait for DNS propagation (up to 48 hours)

## Monitoring

- **Analytics**: Enable Vercel Analytics in project settings
- **Logs**: View function logs in Vercel dashboard
- **Performance**: Check Web Vitals in Analytics tab

## Cost Considerations

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function executions included

**NewsAPI Free Tier:**
- 100 requests/day
- Upgrade to Developer plan for more

**Email:**
- Gmail is free for personal use
- Consider SendGrid/Mailgun for production

## Next Steps

1. **Add Custom Domain**: Make your app accessible via your own domain
2. **Enable Analytics**: Track user engagement
3. **Set Up Monitoring**: Get alerts for errors
4. **Upgrade APIs**: Consider paid tiers for production use
5. **Add Database**: Store user subscriptions persistently

---

🎉 **Congratulations!** Your TazaKaber news app is now live on Vercel!

For support, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [NewsAPI Documentation](https://newsapi.org/docs)
