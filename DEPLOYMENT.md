# Eburutu Mart - Hostinger Deployment Guide

## Deploy to Hostinger Business Web Hosting (Node.js)

### Step 1: Connect GitHub to Hostinger

1. Log in to **Hostinger hPanel**
2. Go to **Websites** → Select your domain
3. Click **Node.js** under "Website" section
4. Click **Create a Node.js Web App**
5. Connect your GitHub account
6. Select repository: `Eburutu-Diaspora/eburutu-mart`
7. Select branch: `main`

### Step 2: Configure Node.js Settings

| Setting | Value |
|---------|-------|
| Node.js Version | 18.x or 20.x |
| Entry Point | `node_modules/.bin/next` |
| Start Command | `yarn build && yarn start` |
| Port | 3000 |

### Step 3: Add Environment Variables

In Hostinger hPanel → Node.js → **Environment Variables**, add:

```
DATABASE_URL=postgresql://postgres.dcptymrvshjzlnwelcyh:ObongEburutu2026@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
NEXTAUTH_SECRET=your-32-character-secret
NEXTAUTH_URL=https://eburutumart.com
NODE_ENV=production
```

**Generate NEXTAUTH_SECRET:** Use any random 32+ character string

### Step 4: Deploy

1. Click **Deploy** in Hostinger
2. Wait for build to complete (5-10 minutes)
3. Your site will be live at your domain!

### Step 5: Connect Domain

1. Go to **Domains** → Select `eburutumart.com`
2. Point DNS to Hostinger nameservers
3. Enable **SSL Certificate** (free)

---

## Updating Your Site

When you push changes to GitHub:
1. Go to Hostinger hPanel → Node.js
2. Click **Redeploy** or enable **Auto-deploy**

---

## Troubleshooting

**Build fails?**
- Check Node.js version is 18.x or 20.x
- Verify environment variables are set

**Database errors?**
- Ensure Supabase project is active (not paused)
- Use Session Pooler URL (not Direct connection)

**Site not loading?**
- Check deployment logs in Hostinger
- Verify NEXTAUTH_URL matches your domain

---

## Your Credentials

**GitHub:** https://github.com/Eburutu-Diaspora/eburutu-mart

**Supabase (Session Pooler):**
```
postgresql://postgres.dcptymrvshjzlnwelcyh:ObongEburutu2026@aws-1-eu-west-1.pooler.supabase.com:5432/postgres
```

---

## Need Help?

- Hostinger Support: hPanel → Help
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
