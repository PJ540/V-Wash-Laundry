V-Wash Laundry - Online Booking System

⚠️ **IMPORTANT UPDATE:** This system has been upgraded with a backend server to fix the database synchronization issue.

## 🔧 Problem Fixed

**Previous Issue:** The system used IndexedDB (browser storage), so customer bookings were only visible in their own browser. The admin panel couldn't see customer orders because each browser had its own separate database.

**Solution:** Added a Node.js backend with MongoDB database. Now all data is stored centrally, and the admin panel can see ALL customer bookings in real-time.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```cmd
   npm install
   ```

2. **Setup Database:**
   - Create `.env` file (copy from `.env.example`)
   - Add your MongoDB connection string

3. **Start Server:**
   ```cmd
   npm start
   ```

4. **Test API:**
   - Open `test-api.html` in browser to verify backend is working

5. **Update Frontend:**
   - Follow instructions in `HTML_INTEGRATION_GUIDE.md`

📖 **Full Documentation:**
- `QUICK_START.md` - Fast setup guide
- `DEPLOYMENT_GUIDE.md` - Production deployment
- `HTML_INTEGRATION_GUIDE.md` - Frontend code changes

---

A comprehensive web-based laundry service booking system that allows customers to book laundry services online and track their orders. The system includes both a customer-facing interface and an admin panel for managing orders, users, and services.

Features Customer Features User registration and authentication Browse and select from various laundry services Multi-step booking process with pickup and delivery scheduling Order tracking with real-time status updates User dashboard with order history Profile management Address book for multiple delivery locations Admin Features Admin dashboard with statistics User management Order management and status updates Service management Admin role management with permissions Database management (export/import/clear) Backup and restore functionality Technical Features Responsive design for mobile and desktop Client-side data storage using IndexedDB No server dependencies - runs entirely in the browser Clean, modern UI with smooth transitions Form validation and error handling Installation Clone this repository to your local machine Open the index.html file in a modern web browser (Chrome, Firefox, Safari, Edge) The application will initialize with sample data for demonstration No additional installation steps are required as this is a client-side application that runs entirely in the browser.

Usage For Customers Click on "Login/Register" to create an account or log in Browse available services on the Home or Services page Click "Book Now" on any service to start the booking process Follow the 4-step booking process: Select service and quantity Provide pickup information Provide delivery information Confirm and submit your order Track your order status in the "My Orders" section Manage your profile and addresses in the dashboard For Administrators Log in with admin credentials: Email: admin@vwashlaundry.co.ke Password: admin123 Navigate through the admin panel using the sidebar menu View dashboard statistics and recent orders Manage users, orders, and services Export/import data for backup or migration Technical Details Technology Stack Frontend: HTML5, CSS3, JavaScript (ES6+) Database: IndexedDB (browser-based) UI Framework: Custom CSS with responsive design Icons: Font Awesome Data Storage The application uses IndexedDB for client-side data storage, which persists across browser sessions. The database includes the following object stores:

users orders addresses services settings admins Security Password-based authentication Role-based access control for admin functions Input validation and sanitization No external API dependencies File Structure

Line Wrapping

Collapse Copy 1 2 3 4 5 6 7 8 9 10 11 12 13 vwash-laundry/ ├── index.html # Main application file ├── logo.png # Company logo ├── duvet.jpeg # Service image ├── beddings.jpeg # Service image ├── carpet.jpeg # Service image ├── shoes.jpeg # Service image ├── clothes.jpeg # Service image ├── jackets.jpeg # Service image ├── teddybear.jpeg # Service image ├── ironing.jpeg # Service image ├── suit.jpeg # Service image └── README.md # This file Browser Compatibility This application is compatible with all modern browsers that support:

ES6 JavaScript features IndexedDB CSS Grid and Flexbox HTML5 form elements Contributing Fork this repository Create a feature branch (git checkout -b feature/AmazingFeature) Commit your changes (git commit -m 'Add some AmazingFeature') Push to the branch (git push origin feature/AmazingFeature) Open a Pull Request License This project is licensed under the MIT License - see the LICENSE file for details.

Contact For any questions or support, please contact:

Email: info@vwashlaundry.co.ke Phone: +254 769831994 Address: Mazeras Developer Developed by Peter J

© 2025 V-Wash Laundry. All rights reserved.
