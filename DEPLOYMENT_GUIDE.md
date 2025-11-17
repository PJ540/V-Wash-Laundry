# V-Wash Laundry - Deployment Guide

## Problem Fixed
Your booking system was using IndexedDB (browser storage), which means each user's browser had its own separate database. When customers booked services, the data was only stored in their browser, not visible to the admin panel.

**Solution:** Added a Node.js backend with MongoDB database that centralizes all data.

## What Was Added

### Backend Files
1. **server.js** - Express server with API endpoints
2. **package.json** - Node.js dependencies
3. **api-client.js** - Frontend API client to connect to backend
4. **.env.example** - Environment configuration template

### Features
- User registration and authentication with JWT tokens
- Centralized order management
- Admin dashboard with real-time data
- Secure password hashing
- RESTful API endpoints

## Local Development Setup

### Prerequisites
- Node.js (v14 or higher) - Download from https://nodejs.org/
- MongoDB - Install locally OR use MongoDB Atlas (cloud)

### Step 1: Install MongoDB

**Option A: Local MongoDB**
- Windows: Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service

**Option B: MongoDB Atlas (Recommended for deployment)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string (looks like: mongodb+srv://username:password@cluster.mongodb.net/)

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` file:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/vwash_laundry
   JWT_SECRET=change-this-to-random-string
   ```

   If using MongoDB Atlas, use your connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/vwash_laundry
   ```

### Step 4: Update INDEX.HTML

Add this line in the `<head>` section of INDEX.HTML (after line 7):
```html
<script src="api-client.js"></script>
```

Then modify the JavaScript code to use the API instead of IndexedDB. I'll provide the specific changes needed.

### Step 5: Start the Server
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will run on http://localhost:3000

### Step 6: Test the Application
1. Open http://localhost:3000 in your browser
2. Register a new user account
3. Book a service
4. Login to admin panel (admin@vwashlaundry.co.ke / admin123)
5. Verify the order appears in admin dashboard

## Production Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI**
   - Download from https://devcenter.heroku.com/articles/heroku-cli

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create vwash-laundry
   ```

4. **Add MongoDB Atlas**
   - Use MongoDB Atlas connection string in Heroku config

5. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
   heroku config:set JWT_SECRET="your-random-secret-key"
   ```

6. **Deploy**
   ```bash
   git add .
   git commit -m "Add backend server"
   git push heroku main
   ```

7. **Open App**
   ```bash
   heroku open
   ```

### Option 2: Deploy to Railway

1. Go to https://railway.app/
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in Railway dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
6. Railway will automatically deploy

### Option 3: Deploy to Render

1. Go to https://render.com/
2. Sign up and create new "Web Service"
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Add environment variables
7. Deploy

### Option 4: VPS (DigitalOcean, AWS, etc.)

1. **Setup Server**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install MongoDB
   # Follow: https://docs.mongodb.com/manual/installation/
   ```

2. **Clone Repository**
   ```bash
   git clone your-repo-url
   cd vwash-laundry
   npm install
   ```

3. **Setup PM2 (Process Manager)**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js
   pm2 startup
   pm2 save
   ```

4. **Setup Nginx (Reverse Proxy)**
   ```bash
   sudo apt install nginx
   ```

   Create nginx config:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Setup SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

## Database Migration

If you have existing data in IndexedDB that you want to migrate:

1. Open browser console on the old site
2. Run this script to export data:
   ```javascript
   // Export orders
   const db = await new Promise((resolve) => {
       const request = indexedDB.open('freshlaundry_db');
       request.onsuccess = () => resolve(request.result);
   });
   
   const transaction = db.transaction(['orders'], 'readonly');
   const store = transaction.objectStore('orders');
   const orders = await new Promise((resolve) => {
       const request = store.getAll();
       request.onsuccess = () => resolve(request.result);
   });
   
   console.log(JSON.stringify(orders));
   ```

3. Copy the JSON output
4. Import to MongoDB using the API or MongoDB Compass

## Troubleshooting

### Server won't start
- Check if MongoDB is running
- Verify `.env` file exists and has correct values
- Check if port 3000 is already in use

### Orders not appearing
- Check browser console for errors
- Verify API client is loaded (check Network tab)
- Ensure user is logged in (check for auth token)

### Admin can't login
- Default admin credentials: admin@vwashlaundry.co.ke / admin123
- Check server logs for errors
- Verify MongoDB connection

### CORS errors
- Make sure CORS is enabled in server.js (already configured)
- Check if frontend and backend URLs match

## Security Notes

1. **Change default admin password** after first login
2. **Use strong JWT_SECRET** in production (random 32+ character string)
3. **Use HTTPS** in production (SSL certificate)
4. **Enable MongoDB authentication** in production
5. **Set up rate limiting** to prevent abuse
6. **Regular backups** of MongoDB database

## Support

For issues or questions:
- Email: info@vwashlaundry.co.ke
- Phone: +254 769831994

## Next Steps

After deployment:
1. Test all features thoroughly
2. Change default admin password
3. Add more admin users if needed
4. Set up automated backups
5. Monitor server logs
6. Set up error tracking (e.g., Sentry)
