# Quick Start Guide - V-Wash Laundry Backend

## The Problem You Had

Your booking system was storing data in **IndexedDB** (browser storage). This means:
- Customer books service → Data saved in **their browser only**
- Admin opens panel → Sees data from **admin's browser only**
- **Result:** Admin cannot see customer bookings! ❌

## The Solution

Added a **Node.js backend server** with **MongoDB database** that:
- Stores all data in one central database
- All users connect to the same database
- Admin can see ALL customer bookings ✅

## Installation (5 Minutes)

### 1. Install Node.js
Download and install from: https://nodejs.org/ (Choose LTS version)

### 2. Install MongoDB

**Easy Option - MongoDB Atlas (Cloud - FREE):**
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free cluster (M0 Sandbox)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (looks like: `mongodb+srv://username:password@cluster...`)

**OR Local MongoDB:**
- Download from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

### 3. Setup Project

Open Command Prompt in your project folder and run:

```cmd
npm install
```

### 4. Configure Database

Create a file named `.env` (copy from `.env.example`):

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vwash_laundry
JWT_SECRET=my-super-secret-key-12345
```

**If using MongoDB Atlas**, replace MONGODB_URI with your connection string:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vwash_laundry
```

### 5. Update INDEX.HTML

Add this line in the `<head>` section (after line 7):
```html
<script src="api-client.js"></script>
```

**Important:** Follow the detailed instructions in `HTML_INTEGRATION_GUIDE.md` to update the JavaScript code.

### 6. Start Server

```cmd
npm start
```

You should see:
```
Server running on http://localhost:3000
Connected to MongoDB
Default admin account created
```

### 7. Test It!

1. Open browser: http://localhost:3000
2. Register a new user
3. Book a service
4. Login to admin panel:
   - Email: `admin@vwashlaundry.co.ke`
   - Password: `admin123`
5. **You should see the booking!** ✅

## What Changed?

### Before (IndexedDB):
```
Customer Browser          Admin Browser
[IndexedDB]              [IndexedDB]
- Order 1                - (empty)
- Order 2                - (empty)
```
❌ Admin can't see customer orders

### After (Backend + MongoDB):
```
Customer Browser  →  Backend Server  ←  Admin Browser
                     [MongoDB]
                     - Order 1
                     - Order 2
```
✅ Admin sees ALL orders from ALL customers

## Deployment Options

### Option 1: Heroku (Easiest)
1. Create account: https://heroku.com
2. Install Heroku CLI
3. Run:
   ```cmd
   heroku create vwash-laundry
   heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
   heroku config:set JWT_SECRET="random-secret-key"
   git push heroku main
   ```

### Option 2: Railway (Fastest)
1. Go to https://railway.app
2. Connect GitHub repo
3. Add environment variables
4. Deploy automatically

### Option 3: Render (Free)
1. Go to https://render.com
2. Create Web Service
3. Connect repo
4. Add environment variables
5. Deploy

## Troubleshooting

### "Cannot find module 'express'"
Run: `npm install`

### "MongoServerError: Authentication failed"
Check your MongoDB connection string in `.env` file

### "Port 3000 is already in use"
Change PORT in `.env` to 3001 or kill the process using port 3000

### Orders not showing in admin panel
1. Check if server is running
2. Open browser console (F12) and check for errors
3. Verify you updated INDEX.HTML with API client
4. Make sure you're logged in

### CORS errors
Already configured in server.js, but if you see errors:
- Make sure you're accessing via http://localhost:3000
- Don't open INDEX.HTML directly (file://)

## Default Admin Account

- **Email:** admin@vwashlaundry.co.ke
- **Password:** admin123

⚠️ **IMPORTANT:** Change this password after first login!

## Need Help?

1. Check `DEPLOYMENT_GUIDE.md` for detailed deployment instructions
2. Check `HTML_INTEGRATION_GUIDE.md` for code integration details
3. Contact: info@vwashlaundry.co.ke

## Next Steps

1. ✅ Test locally
2. ✅ Update INDEX.HTML with API integration
3. ✅ Deploy to production
4. ✅ Change admin password
5. ✅ Add SSL certificate (HTTPS)
6. ✅ Set up automated backups

## File Structure

```
vwash-laundry/
├── INDEX.HTML              (Your frontend - needs updates)
├── server.js               (Backend server - NEW)
├── api-client.js           (API connector - NEW)
├── package.json            (Dependencies - NEW)
├── .env                    (Configuration - CREATE THIS)
├── .env.example            (Template - NEW)
├── DEPLOYMENT_GUIDE.md     (Detailed guide - NEW)
├── HTML_INTEGRATION_GUIDE.md (Code changes - NEW)
├── QUICK_START.md          (This file - NEW)
└── images/                 (Your existing images)
```

## Success Indicators

✅ Server starts without errors
✅ Can register new users
✅ Can login
✅ Can book services
✅ Orders appear in user dashboard
✅ Admin can login
✅ Admin sees ALL orders from ALL users
✅ Admin can update order status
✅ Changes persist after page refresh

That's it! You now have a fully functional booking system with centralized data storage. 🎉
