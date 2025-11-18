# Complete Testing Checklist - Admin & Customer Side

## 🔐 ADMIN PANEL TESTING

### Login & Authentication
- [ ] Admin login page loads
- [ ] Can login with credentials (admin@vwashlaundry.co.ke / admin123)
- [ ] Invalid credentials show error
- [ ] After login, redirects to admin dashboard
- [ ] Logout button works

### 📊 Dashboard Page
- [ ] Dashboard loads without errors
- [ ] Total Users count displays
- [ ] Total Orders count displays
- [ ] Total Revenue displays
- [ ] Pending Orders count displays
- [ ] Recent orders table shows data
- [ ] Order status badges display correctly
- [ ] "View Details" button on orders works
- [ ] Database status section shows stats

### 👥 Users Management
- [ ] Users page loads
- [ ] Users table displays all users
- [ ] Search users functionality works
- [ ] "View Details" button opens user details modal
- [ ] User details modal shows:
  - [ ] User information
  - [ ] Total orders
  - [ ] Total spent
- [ ] "Edit" button opens edit user modal
- [ ] Edit user form pre-fills with user data
- [ ] Can update user name
- [ ] Can update user email
- [ ] Can update user phone
- [ ] "Save" button updates user successfully
- [ ] "Cancel" button closes modal
- [ ] "Delete" button shows confirmation
- [ ] Confirming delete removes user
- [ ] Table refreshes after edit/delete

### 📦 Orders Management
- [ ] Orders page loads
- [ ] Orders table displays all orders
- [ ] Filter by status works (All, Pending, Processing, etc.)
- [ ] Search orders functionality works
- [ ] Order status badges display correctly
- [ ] "View Details" button opens order details modal
- [ ] Order details modal shows:
  - [ ] Order ID
  - [ ] Customer info
  - [ ] Service type
  - [ ] Pickup/delivery dates
  - [ ] Address
  - [ ] Price
  - [ ] Status
  - [ ] Notes
- [ ] "Update Status" button opens status update modal
- [ ] Can change order status
- [ ] Can add notes to order
- [ ] "Save" button updates order status
- [ ] Status change reflects in table
- [ ] "Delete" button shows confirmation
- [ ] Confirming delete removes order
- [ ] Table refreshes after update/delete

### 🧺 Services Management
- [ ] Services page loads
- [ ] Services table displays all services
- [ ] "Add Service" button opens add service modal
- [ ] Add service form works:
  - [ ] Service name field
  - [ ] Description field
  - [ ] Price field
  - [ ] Image URL field (optional)
- [ ] "Save" button creates new service
- [ ] New service appears in table
- [ ] "Edit" button opens edit service modal
- [ ] Edit form pre-fills with service data
- [ ] Can update service name
- [ ] Can update service description
- [ ] Can update service price
- [ ] Can update service image
- [ ] "Save" button updates service
- [ ] Changes reflect in table
- [ ] "Delete" button shows confirmation
- [ ] Confirming delete removes service
- [ ] Table refreshes after add/edit/delete

### 👨‍💼 Admins Management
- [ ] Admins page loads
- [ ] Admins table displays all admins
- [ ] "Add Admin" button opens add admin modal
- [ ] Add admin form works:
  - [ ] Name field
  - [ ] Email field
  - [ ] Phone field
  - [ ] Password field
  - [ ] Role dropdown (Super Admin, Admin, Manager, Staff)
  - [ ] Permissions checkboxes
  - [ ] Status (Active/Inactive)
- [ ] "Save" button creates new admin
- [ ] New admin appears in table
- [ ] "Edit" button opens edit admin modal
- [ ] Edit form pre-fills with admin data
- [ ] Can update admin name
- [ ] Can update admin email
- [ ] Can update admin phone
- [ ] Can update admin role
- [ ] Can update admin status
- [ ] Can update permissions
- [ ] Password field (optional for update)
- [ ] "Save" button updates admin
- [ ] Changes reflect in table
- [ ] "Delete" button shows confirmation
- [ ] Confirming delete removes admin
- [ ] Table refreshes after add/edit/delete

### ⚙️ Settings Page
- [ ] Settings page loads
- [ ] Company settings section displays
- [ ] Can update company name
- [ ] Can update company email
- [ ] Can update company phone
- [ ] "Save Settings" button works
- [ ] Success notification shows

### 💾 Database Management
- [ ] Database page loads
- [ ] Database size displays
- [ ] Database stats show counts
- [ ] "Export Database" button shows disabled message
- [ ] "Import Database" button (if enabled)
- [ ] "Clear Database" button (if enabled)
- [ ] "Create Backup" button (if enabled)

---

## 👤 CUSTOMER SIDE TESTING

### Home Page
- [ ] Home page loads correctly
- [ ] Hero section displays
- [ ] "Book Now" button works
- [ ] "Our Services" section displays
- [ ] Service cards show correctly
- [ ] "Why Choose Us" section displays
- [ ] "How It Works" section displays
- [ ] Footer displays with contact info

### Navigation
- [ ] "Home" link works
- [ ] "Services" link works
- [ ] "Book Now" link works
- [ ] "Dashboard" link (when logged in) works
- [ ] "Login" button shows when not logged in
- [ ] "Logout" button shows when logged in
- [ ] User avatar/name displays when logged in

### Services Page
- [ ] Services page loads
- [ ] All services display as cards
- [ ] Service images show
- [ ] Service names display
- [ ] Service descriptions display
- [ ] Service prices display
- [ ] "Book Now" button on each service works
- [ ] Clicking "Book Now" redirects to booking page

### Authentication
- [ ] "Login" button opens auth modal
- [ ] Login form displays
- [ ] Can enter email
- [ ] Can enter password
- [ ] "Login" button submits form
- [ ] Valid credentials log user in
- [ ] Invalid credentials show error
- [ ] "Switch to Register" link works
- [ ] Register form displays
- [ ] Can enter name
- [ ] Can enter email
- [ ] Can enter phone
- [ ] Can enter password
- [ ] "Register" button creates account
- [ ] After registration, user is logged in
- [ ] "Switch to Login" link works
- [ ] Close button (X) closes modal
- [ ] Click outside modal closes it

### Booking Page (Requires Login)
- [ ] Booking page loads
- [ ] If not logged in, shows login prompt
- [ ] After login, booking form displays
- [ ] Step 1: Select Service
  - [ ] All services display as options
  - [ ] Can select a service
  - [ ] Selected service highlights
  - [ ] "Next" button enabled after selection
  - [ ] "Next" button goes to step 2
- [ ] Step 2: Schedule
  - [ ] Pickup date field displays
  - [ ] Delivery date field displays
  - [ ] Can select pickup date (tomorrow or later)
  - [ ] Can select delivery date (after pickup)
  - [ ] Past dates are disabled
  - [ ] "Back" button returns to step 1
  - [ ] "Next" button enabled after dates selected
  - [ ] "Next" button goes to step 3
- [ ] Step 3: Address
  - [ ] Address form displays
  - [ ] Can enter street address
  - [ ] Can enter city
  - [ ] Can enter postal code
  - [ ] Can enter additional notes
  - [ ] "Set as default address" checkbox works
  - [ ] "Back" button returns to step 2
  - [ ] "Next" button enabled after address entered
  - [ ] "Next" button goes to step 4
- [ ] Step 4: Review & Confirm
  - [ ] Order summary displays
  - [ ] Selected service shows
  - [ ] Pickup date shows
  - [ ] Delivery date shows
  - [ ] Address shows
  - [ ] Price displays
  - [ ] "Back" button returns to step 3
  - [ ] "Confirm Order" button works
  - [ ] After confirmation, redirects to confirmation page

### Confirmation Page
- [ ] Confirmation page loads
- [ ] Success message displays
- [ ] Order ID displays
- [ ] Order details show
- [ ] "View My Orders" button works
- [ ] "Book Another Service" button works

### Dashboard Page (Customer)
- [ ] Dashboard loads when logged in
- [ ] If not logged in, redirects to login
- [ ] Welcome message with user name displays
- [ ] "My Orders" section shows
- [ ] Orders table displays user's orders
- [ ] Order status badges display correctly
- [ ] "View Details" button opens order details
- [ ] Order details modal shows complete info
- [ ] "My Addresses" section shows
- [ ] Saved addresses display
- [ ] "Edit" button on address works
- [ ] Edit address modal opens
- [ ] Can update address fields
- [ ] "Save" button updates address
- [ ] "Delete" button removes address
- [ ] "Add New Address" button works
- [ ] "My Profile" section shows
- [ ] Profile information displays
- [ ] "Edit Profile" button works
- [ ] Edit profile modal opens
- [ ] Can update name
- [ ] Can update email
- [ ] Can update phone
- [ ] "Save" button updates profile
- [ ] "Change Password" section works
- [ ] Can enter current password
- [ ] Can enter new password
- [ ] Can confirm new password
- [ ] "Update Password" button works
- [ ] Success notification shows

### Notifications
- [ ] Success notifications display (green)
- [ ] Error notifications display (red)
- [ ] Info notifications display (blue)
- [ ] Notifications auto-dismiss after 3 seconds
- [ ] Can manually close notifications

### Responsive Design
- [ ] Site works on desktop
- [ ] Site works on tablet
- [ ] Site works on mobile
- [ ] Navigation menu adapts to screen size
- [ ] Forms are usable on mobile
- [ ] Tables scroll horizontally on mobile
- [ ] Modals display correctly on all devices

---

## 🐛 ERROR CHECKING

### Browser Console
- [ ] No "Cannot read properties of null" errors
- [ ] No IndexedDB errors
- [ ] No 404 errors for API calls
- [ ] No JavaScript errors
- [ ] API calls return proper responses

### Network Tab
- [ ] All API calls succeed (200 status)
- [ ] Authentication tokens are sent
- [ ] Responses contain expected data
- [ ] No CORS errors

### Data Persistence
- [ ] After creating data, refresh page - data still there
- [ ] After updating data, refresh page - changes persist
- [ ] After deleting data, refresh page - data is gone
- [ ] Login session persists after refresh
- [ ] Logout clears session

---

## ✅ FINAL VERIFICATION

- [ ] Admin can see ALL customer orders (not just their own browser's)
- [ ] Multiple admins can see the same data
- [ ] Customer orders appear immediately in admin panel
- [ ] No data is stored in browser (IndexedDB)
- [ ] All data comes from MongoDB backend
- [ ] Site works across different browsers
- [ ] Site works on different devices
- [ ] No console errors anywhere

---

## 📝 NOTES

**If any test fails:**
1. Note which button/feature failed
2. Check browser console for errors
3. Check Network tab for failed API calls
4. Report the specific error message

**Priority Issues:**
- Any "Cannot read properties of null" errors = CRITICAL
- Admin not seeing customer data = CRITICAL
- Login/authentication issues = HIGH
- CRUD operations not working = HIGH
- UI display issues = MEDIUM
- Minor styling issues = LOW
