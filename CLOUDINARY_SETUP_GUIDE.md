# Cloudinary Setup Guide for Image Uploads

## What is Cloudinary?
Cloudinary is a free cloud service for storing and managing images. It's perfect for your laundry service images!

## Step 1: Create Free Cloudinary Account

1. Go to: https://cloudinary.com/users/register/free
2. Sign up with your email
3. Verify your email
4. Login to Cloudinary dashboard

## Step 2: Get Your Credentials

After logging in:

1. Go to **Dashboard** (should open automatically)
2. You'll see a section called **"Account Details"** or **"Product Environment Credentials"**
3. Note these three values:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

## Step 3: Add to Your .env File

1. Open your `.env` file (create one if it doesn't exist)
2. Add these lines (replace with your actual values):

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Example:**
```env
CLOUDINARY_CLOUD_NAME=dxyz123abc
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=abcdefghijklmnopqrstuvwxyz
```

## Step 4: Add to Render Environment Variables

Since you're deploying on Render:

1. Go to https://dashboard.render.com
2. Click on your service
3. Go to **Environment** tab
4. Click **"Add Environment Variable"**
5. Add these three variables:

```
Key: CLOUDINARY_CLOUD_NAME
Value: your_cloud_name_here

Key: CLOUDINARY_API_KEY
Value: your_api_key_here

Key: CLOUDINARY_API_SECRET
Value: your_api_secret_here
```

6. Click **"Save Changes"**
7. Render will automatically redeploy

## Step 5: Install Dependencies

Run this command in your terminal:

```bash
npm install
```

This will install the new packages (multer and cloudinary).

## Step 6: Test Image Upload

1. Start your server locally:
   ```bash
   npm start
   ```

2. Login to admin panel
3. Go to Services page
4. Click "Add Service"
5. Fill in the form
6. Click "Choose File" and select an image
7. You should see a preview
8. Click "Save"
9. Image will upload to Cloudinary!

## How It Works

### For Admin:
1. Click "Add Service" or "Edit Service"
2. Click "Choose File" button
3. Select image from computer
4. See preview immediately
5. Click "Save"
6. Image uploads to Cloudinary automatically
7. Service is saved with Cloudinary image URL

### What Happens Behind the Scenes:
1. Image is uploaded to Cloudinary
2. Cloudinary returns a secure URL
3. URL is saved in MongoDB with service data
4. Image is served from Cloudinary's CDN (fast!)

## Cloudinary Free Tier Limits

✅ **25 GB storage**
✅ **25 GB bandwidth/month**
✅ **Unlimited transformations**
✅ **More than enough for your laundry business!**

## Troubleshooting

### Error: "Failed to upload image"

**Check:**
1. Are Cloudinary credentials correct in .env?
2. Did you restart server after adding credentials?
3. Is image file less than 5MB?
4. Is file actually an image (jpg, png, etc.)?

### Error: "Only image files are allowed"

**Solution:**
- Make sure you're uploading an image file (.jpg, .png, .gif, .webp)
- Not a PDF, document, or other file type

### Images not showing after upload

**Check:**
1. Look in browser console for errors
2. Check if Cloudinary URL is saved in database
3. Verify Cloudinary credentials are correct

## View Your Uploaded Images

1. Login to Cloudinary dashboard
2. Go to **Media Library**
3. Look in **vwash-services** folder
4. You'll see all uploaded service images!

## Next Steps

After setup:
1. ✅ Add Cloudinary credentials to .env
2. ✅ Add credentials to Render environment variables
3. ✅ Run `npm install`
4. ✅ Commit and push changes
5. ✅ Wait for Render to deploy
6. ✅ Test image upload in admin panel!

---

**Need help?** Let me know which step you're stuck on!
