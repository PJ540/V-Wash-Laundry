# Custom Domain Setup Guide for Render

## Overview
Connect your custom domain (e.g., vwashlaundry.co.ke) to your Render deployment.

---

## Step 1: Add Custom Domain in Render

1. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Select your web service (vwash-laundry or similar)

2. **Navigate to Settings**
   - Click on your service
   - Go to "Settings" tab
   - Scroll down to "Custom Domains" section

3. **Add Your Domain**
   - Click "Add Custom Domain"
   - Enter your domain: `vwashlaundry.co.ke`
   - Click "Save"

4. **Add www subdomain (optional but recommended)**
   - Click "Add Custom Domain" again
   - Enter: `www.vwashlaundry.co.ke`
   - Click "Save"

5. **Note the DNS Records**
   - Render will show you DNS records to add
   - Keep this page open - you'll need these values

---

## Step 2: Configure DNS Records

You need to add DNS records at your domain registrar (where you bought vwashlaundry.co.ke).

### Option A: Using A Record (Recommended for Root Domain)

**For root domain (vwashlaundry.co.ke):**
```
Type: A
Name: @ (or leave blank)
Value: [IP address provided by Render]
TTL: 3600 (or Auto)
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: [your-app-name].onrender.com
TTL: 3600 (or Auto)
```

### Option B: Using CNAME (Alternative)

**For root domain:**
```
Type: CNAME
Name: @ (or leave blank)
Value: [your-app-name].onrender.com
TTL: 3600 (or Auto)
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: [your-app-name].onrender.com
TTL: 3600 (or Auto)
```

---

## Step 3: Configure DNS at Your Registrar

### Common Registrars:

#### **Namecheap**
1. Login to Namecheap
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Go to "Advanced DNS" tab
5. Add the records from Step 2
6. Save changes

#### **GoDaddy**
1. Login to GoDaddy
2. Go to "My Products"
3. Click "DNS" next to your domain
4. Add the records from Step 2
5. Save changes

#### **Cloudflare**
1. Login to Cloudflare
2. Select your domain
3. Go to "DNS" tab
4. Add the records from Step 2
5. Make sure "Proxy status" is OFF (gray cloud) for Render
6. Save changes

#### **Other Registrars**
1. Login to your domain registrar
2. Find DNS settings/DNS management
3. Add the A and CNAME records
4. Save changes

---

## Step 4: Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours** to propagate
- Usually takes **15-30 minutes**
- You can check status at: https://dnschecker.org

---

## Step 5: Enable SSL Certificate (Automatic)

1. **Render Auto-SSL**
   - Render automatically provisions SSL certificates
   - Once DNS is verified, SSL will be enabled
   - This happens automatically within 1-2 hours

2. **Check SSL Status**
   - Go to Render Dashboard → Your Service → Settings
   - Under "Custom Domains" you'll see SSL status
   - Wait for "Certificate Status: Active"

---

## Step 6: Update Environment Variables (If Needed)

If your app uses the domain in environment variables:

1. Go to Render Dashboard → Your Service → Environment
2. Update any variables that reference the domain:
   ```
   FRONTEND_URL=https://vwashlaundry.co.ke
   ALLOWED_ORIGINS=https://vwashlaundry.co.ke,https://www.vwashlaundry.co.ke
   ```
3. Save changes (this will trigger a redeploy)

---

## Step 7: Test Your Domain

1. **Wait for DNS propagation** (check at dnschecker.org)

2. **Test HTTP access:**
   ```
   http://vwashlaundry.co.ke
   ```

3. **Test HTTPS access:**
   ```
   https://vwashlaundry.co.ke
   ```

4. **Test www subdomain:**
   ```
   https://www.vwashlaundry.co.ke
   ```

5. **Verify redirect:**
   - HTTP should redirect to HTTPS
   - www should work alongside non-www

---

## Troubleshooting

### Domain Not Working After 24 Hours

**Check DNS Records:**
```bash
# Check A record
nslookup vwashlaundry.co.ke

# Check CNAME record
nslookup www.vwashlaundry.co.ke
```

**Common Issues:**

1. **Wrong DNS Records**
   - Double-check the values from Render
   - Make sure there are no typos
   - Remove any conflicting records

2. **DNS Not Propagated**
   - Wait longer (up to 48 hours)
   - Clear your browser cache
   - Try incognito/private mode
   - Try different device/network

3. **SSL Certificate Pending**
   - Wait for DNS to fully propagate first
   - Render needs to verify domain ownership
   - Can take up to 2 hours after DNS is live

4. **Cloudflare Issues**
   - Turn OFF proxy (gray cloud icon)
   - Or use Cloudflare's "Full (strict)" SSL mode

### SSL Certificate Not Activating

1. **Verify DNS is correct:**
   - Use dnschecker.org
   - All regions should show correct IP/CNAME

2. **Check Render Dashboard:**
   - Go to Settings → Custom Domains
   - Look for any error messages
   - Try removing and re-adding the domain

3. **Contact Render Support:**
   - If SSL doesn't activate after 24 hours
   - Open a support ticket at Render

---

## Quick Reference

### What You Need:
- ✅ Custom domain (vwashlaundry.co.ke)
- ✅ Access to domain registrar DNS settings
- ✅ Render web service deployed

### DNS Records to Add:
```
Type: A
Name: @
Value: [Render IP address]

Type: CNAME  
Name: www
Value: [your-app].onrender.com
```

### Timeline:
- DNS setup: 5 minutes
- DNS propagation: 15 minutes - 48 hours (usually 30 min)
- SSL activation: Automatic after DNS propagates (1-2 hours)

---

## After Setup

### Redirect www to non-www (or vice versa)

This is handled automatically by Render. Both will work:
- https://vwashlaundry.co.ke
- https://www.vwashlaundry.co.ke

### Update Your Links

Update any hardcoded URLs in your code:
- Social media links
- Email templates
- Documentation
- Marketing materials

---

## Need Help?

1. **Render Documentation:**
   https://render.com/docs/custom-domains

2. **DNS Checker:**
   https://dnschecker.org

3. **SSL Checker:**
   https://www.ssllabs.com/ssltest/

4. **Render Support:**
   https://render.com/support

---

## Example: Complete Setup for vwashlaundry.co.ke

### At Render:
1. Add custom domain: `vwashlaundry.co.ke`
2. Add custom domain: `www.vwashlaundry.co.ke`
3. Note the DNS records shown

### At Your DNS Provider:
```
A Record:
Name: @
Value: 216.24.57.1 (example - use actual IP from Render)

CNAME Record:
Name: www
Value: vwash-laundry.onrender.com (use your actual Render URL)
```

### Wait & Verify:
1. Wait 30 minutes
2. Visit https://vwashlaundry.co.ke
3. Check SSL certificate is active
4. Done! 🎉
