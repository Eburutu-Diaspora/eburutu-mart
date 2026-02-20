# Eburutu Mart - Hostinger VPS Deployment Guide

This guide walks you through deploying Eburutu Mart on a Hostinger VPS with your Supabase database.

## Prerequisites

- Hostinger VPS (Business plan or higher)
- Domain name (e.g., eburutumart.com)
- Supabase account with database set up
- GitHub repository: https://github.com/Eburutu-Diaspora/eburutu-mart

## Step 1: Access Your Hostinger VPS

1. Log in to Hostinger hPanel
2. Go to **VPS** → Select your VPS
3. Click **SSH Access** to get your credentials
4. Connect via SSH:
   ```bash
   ssh root@your-vps-ip
   ```

## Step 2: Install Required Software

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version

# Install Yarn
npm install -g yarn

# Install PM2 (Process Manager)
npm install -g pm2

# Install Nginx
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

## Step 3: Clone and Setup the Project

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/Eburutu-Diaspora/eburutu-mart.git
cd eburutu-mart

# Install dependencies
yarn install

# Generate Prisma client
yarn prisma generate
```

## Step 4: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add the following (replace with your actual values):

```env
# Database (Supabase Session Pooler)
DATABASE_URL="postgresql://postgres.dcptymrvshjzlnwelcyh:ObongEburutu2026@aws-1-eu-west-1.pooler.supabase.com:5432/postgres"

# NextAuth
NEXTAUTH_SECRET="generate-a-32-char-random-string"
NEXTAUTH_URL="https://eburutumart.com"
```

Save and exit (Ctrl+X, Y, Enter)

### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 5: Build the Application

```bash
# Build the Next.js app
yarn build
```

## Step 6: Configure PM2 (Process Manager)

```bash
# Create PM2 ecosystem file
nano ecosystem.config.js
```

Add:
```javascript
module.exports = {
  apps: [{
    name: 'eburutu-mart',
    script: 'yarn',
    args: 'start',
    cwd: '/var/www/eburutu-mart',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
```

Save and exit.

```bash
# Start the app with PM2
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## Step 7: Configure Nginx (Reverse Proxy)

```bash
# Create Nginx config
sudo nano /etc/nginx/sites-available/eburutu-mart
```

Add:
```nginx
server {
    listen 80;
    server_name eburutumart.com www.eburutumart.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save and exit.

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/eburutu-mart /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

## Step 8: Setup SSL (HTTPS) with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d eburutumart.com -d www.eburutumart.com

# Follow the prompts to complete SSL setup
```

## Step 9: Configure Domain DNS (in Hostinger hPanel)

1. Go to **Domains** → Select your domain
2. Click **DNS / Nameservers**
3. Add/Update these records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | Your VPS IP | 3600 |
| A | www | Your VPS IP | 3600 |

## Step 10: Configure Firewall

```bash
# Allow SSH, HTTP, HTTPS
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Useful Commands

### PM2 Commands:
```bash
pm2 status              # Check app status
pm2 logs eburutu-mart   # View logs
pm2 restart eburutu-mart # Restart app
pm2 stop eburutu-mart    # Stop app
```

### Update Deployment:
```bash
cd /var/www/eburutu-mart
git pull origin main
yarn install
yarn prisma generate
yarn build
pm2 restart eburutu-mart
```

### Database Commands:
```bash
yarn prisma db push      # Push schema changes
yarn prisma db seed      # Re-seed database
yarn prisma studio       # Open database GUI
```

## Troubleshooting

### App not starting:
```bash
pm2 logs eburutu-mart --lines 50
```

### Nginx errors:
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Database connection issues:
- Verify DATABASE_URL in .env
- Check Supabase project is active (not paused)
- Use Session Pooler URL (not Direct connection)

## Architecture Summary

```
[Browser] → [Nginx:443] → [Next.js:3000] → [Supabase PostgreSQL]
                ↓
         [SSL/HTTPS]
```

## Support

- GitHub: https://github.com/Eburutu-Diaspora/eburutu-mart
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
