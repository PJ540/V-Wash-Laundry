# Testing Guide - V-Wash Laundry System

## Issues Fixed:

1. ✅ Services now display (hardcoded in frontend)
2. ✅ Images display correctly
3. ✅ My Orders loads from API
4. ✅ Dashboard buttons work
5. ✅ API client properly initialized

## How to Test:

### 1. Start the Server
```cmd
npm start
```
Should show:
- Server running on http://localhost:3001
- Connected to MongoDB

### 2. Open the Website
```
http://localhost:3001
```

### 3. Test Services Display
- **Expected:** You should see 8 service cards with images on the home page
- Services: Duvet, Beddings, Mat, Shoes, Clothes, Jacket, Teddy bear, Ironing
- Each card should have an image, description, price, and "Book Now" button

### 4. Test User Registration
- Click "Login/Register"
- Click "Register" tab
- Fill in:
  - Name: Test User
  - Email: test@example.com
  - Phone: +254712345678
  - Password: password123
  - Confirm Password: password123
- Click "Register"
- **Expected:** Should automatically log you in and show your name in header

### 5. Test Booking a Service
- Click "Book Now" on any service (or click "Book" in navigation)
- Fill out Step 1 (Service Details):
  - Select service type
  - Enter number of items
  - Add special instructions (optional)
  - Click "Next"
- Fill out Step 2 (Pickup Details):
  - Select pickup date (tomorrow or later)
  - Select pickup time
  - Enter pickup address
  - Enter contact name and phone
  - Click "Next"
- Fill out Step 3 (Delivery Details):
  - Select delivery date
  - Select delivery time
  - Enter delivery address (or check "Same as pickup")
  - Enter contact name and phone
  - Click "Next"
- Step 4 (Confirm):
  - Review all details
  - Click "Submit Booking"
- **Expected:** Should show confirmation page with order number

### 6. Test "My Orders"
- Click "My Orders" in navigation
- **Expected:** Should see your order listed
- **Expected:** Should see:
  - Order number
  - Service type
  - Number of items
  - Pickup and delivery times
  - Price
  - Status badge
  - "View Details" button
  - "Cancel Order" button (if status is "Order Placed")

### 7. Test Order Buttons
- Click "View Details" button
- **Expected:** Should show modal with full order details
- Close the modal
- Click "Cancel Order" button (if available)
- Confirm cancellation
- **Expected:** Order status should change to "Cancelled"

### 8. Test Dashboard Tabs
- In "My Orders" page, try clicking the sidebar menu items:
  - "My Orders" - Should show orders list
  - "Profile" - Should show profile form with your details
  - "Addresses" - Should show saved addresses (empty for new users)
  - "Settings" - Should show notification settings

### 9. Test Admin Panel
- Logout from user account
- Click "Login/Register"
- Login with admin credentials:
  - Email: admin@vwashlaundry.co.ke
  - Password: admin123
- **Expected:** Should redirect to admin panel

### 10. Test Admin Dashboard
- **Expected:** Should see statistics:
  - Total Users (should show 1 or more)
  - Total Orders (should show your test order)
  - Total Revenue (sum of all orders)
  - Pending Orders (orders not completed)

### 11. Test Admin Orders View
- Click "Orders" in admin sidebar
- **Expected:** Should see ALL orders from ALL users
- **Expected:** Should see your test order with:
  - Order ID
  - Customer name
  - Service type
  - Pickup/delivery times
  - Status
  - Price
  - Action buttons (View, Update, Delete)

### 12. Test Order Management
- Click "View" on an order
- **Expected:** Should show full order details
- Close the modal
- Click "Update" on an order
- **Expected:** Should show status update modal
- Change status to "Processing"
- Click "Update Status"
- **Expected:** Status should update in the table

### 13. Test Users Management
- Click "Users" in admin sidebar
- **Expected:** Should see list of all registered users
- **Expected:** Should see your test user

## Common Issues & Solutions:

### Services Not Displaying
- **Check:** Browser console for errors (F12)
- **Check:** Images are in the same folder as INDEX.HTML
- **Solution:** Services are now hardcoded, should always display

### Orders Not Showing
- **Check:** User is logged in (name should show in header)
- **Check:** Browser console for API errors
- **Check:** Server is running
- **Solution:** Make sure you're logged in with the same account that created the order

### Buttons Not Working
- **Check:** Browser console for JavaScript errors
- **Check:** Click events are being registered
- **Solution:** Refresh the page (Ctrl+F5)

### Images Not Loading
- **Check:** Image files exist in project folder
- **Check:** File names match exactly (case-sensitive)
- **Check:** Server is serving static files
- **Solution:** Make sure server is running on http://localhost:3001

### API Errors
- **Check:** Server console for error messages
- **Check:** MongoDB is connected
- **Check:** JWT token is valid (check localStorage)
- **Solution:** Logout and login again to get fresh token

## Success Criteria:

✅ Services display with images
✅ User can register and login
✅ User can book a service
✅ Orders appear in "My Orders"
✅ "View Details" button works
✅ "Cancel Order" button works
✅ Dashboard tabs switch correctly
✅ Admin can login
✅ Admin sees all orders
✅ Admin can update order status
✅ Admin can view user details

## Browser Console Commands (for debugging):

Check if API client exists:
```javascript
console.log(app.api);
```

Check if user is logged in:
```javascript
console.log(app.user);
```

Check auth token:
```javascript
console.log(localStorage.getItem('authToken'));
```

Check user data:
```javascript
console.log(localStorage.getItem('laundryUser'));
```

Test API call:
```javascript
app.api.getUserOrders().then(console.log).catch(console.error);
```

## Next Steps After Testing:

1. If everything works locally, push to GitHub
2. Deploy to production (Railway, Render, or Heroku)
3. Update .env with production MongoDB URI
4. Test on production URL
5. Share with users!

---

**Remember:** The main fix was connecting the frontend to the backend API so that all data is stored centrally in MongoDB instead of separate browser storage. This allows the admin to see all customer bookings!
