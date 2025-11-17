# INDEX.HTML Integration Guide

## Changes Required to Connect Frontend to Backend

### Step 1: Add API Client Script

In INDEX.HTML, add this line in the `<head>` section (around line 7, after the Font Awesome link):

```html
<script src="api-client.js"></script>
```

### Step 2: Replace Database Initialization

Find the section where `DatabaseManager` is initialized (around line 2600-2650) and replace it with:

```javascript
// Initialize API Client instead of DatabaseManager
const apiClient = new APIClient();

// Modified app object
const app = {
    user: null,
    admin: null,
    currentOrder: null,
    api: apiClient,
    
    // Check if user is logged in
    async checkAuth() {
        const token = localStorage.getItem('authToken');
        const userDataStr = localStorage.getItem('userData');
        
        if (token && userDataStr) {
            try {
                this.user = JSON.parse(userDataStr);
                return true;
            } catch (e) {
                return false;
            }
        }
        return false;
    },
    
    // Logout
    logout() {
        this.user = null;
        this.admin = null;
        apiClient.logout();
        localStorage.removeItem('userData');
        localStorage.removeItem('adminData');
    }
};
```

### Step 3: Update User Registration Function

Find the `registerUser` function (around line 2800) and replace with:

```javascript
async function registerUser(event) {
    event.preventDefault();
    
    try {
        const userData = {
            name: elements.registerName.value,
            email: elements.registerEmail.value,
            password: elements.registerPassword.value,
            phone: elements.registerPhone.value
        };
        
        // Validate password confirmation
        if (userData.password !== elements.registerConfirmPassword.value) {
            showNotification('Registration Error', 'Passwords do not match', 'error');
            return;
        }
        
        // Call API
        const response = await app.api.registerUser(userData);
        
        // Save user data
        app.user = response.user;
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        // Update UI
        updateUserUI();
        navigateToPage('home');
        showNotification('Registration Successful', 'Welcome to V-Wash Laundry!', 'success');
        
        // Reset form
        elements.registerForm.reset();
    } catch (error) {
        console.error('Registration error:', error);
        showNotification('Registration Error', error.message || 'Failed to register', 'error');
    }
}
```

### Step 4: Update User Login Function

Find the `loginUser` function and replace with:

```javascript
async function loginUser(event) {
    event.preventDefault();
    
    try {
        const credentials = {
            email: elements.loginEmail.value,
            password: elements.loginPassword.value
        };
        
        // Call API
        const response = await app.api.loginUser(credentials);
        
        // Save user data
        app.user = response.user;
        localStorage.setItem('userData', JSON.stringify(response.user));
        
        // Update UI
        updateUserUI();
        navigateToPage('home');
        showNotification('Login Successful', `Welcome back, ${response.user.name}!`, 'success');
        
        // Reset form
        elements.loginForm.reset();
    } catch (error) {
        console.error('Login error:', error);
        showNotification('Login Error', error.message || 'Invalid email or password', 'error');
    }
}
```

### Step 5: Update Order Submission Function

Find the `submitBooking` function (around line 5098) and replace with:

```javascript
async function submitBooking() {
    try {
        // Check if user is logged in
        if (!app.user) {
            showNotification('Authentication Required', 'Please login to book a service', 'error');
            navigateToPage('auth');
            return;
        }
        
        // Get the selected service details
        const serviceType = elements.serviceType.value;
        const serviceText = elements.serviceType.options[elements.serviceType.selectedIndex].text;
        
        // Get service price (you may need to fetch from services)
        const price = calculatePrice({ price: 200 }); // Adjust based on your pricing
        
        // Create order object
        const order = {
            id: 'ORD' + Date.now().toString().slice(-8),
            serviceType: serviceType,
            serviceText: serviceText,
            itemCount: elements.itemCount.value,
            specialInstructions: elements.specialInstructions.value || 'None',
            pickupDate: elements.pickupDate.value,
            pickupTime: elements.pickupTime.value,
            pickupAddress: elements.pickupAddress.value,
            pickupContact: elements.pickupContact.value,
            pickupPhone: elements.pickupPhone.value,
            deliveryDate: elements.deliveryDate.value,
            deliveryTime: elements.deliveryTime.value,
            deliveryAddress: elements.deliveryAddress.value,
            deliveryContact: elements.deliveryContact.value,
            deliveryPhone: elements.deliveryPhone.value,
            status: 'order_placed',
            statusText: 'Order Placed',
            price: price
        };
        
        // Save order via API
        const response = await app.api.createOrder(order);
        
        // Set current order
        app.currentOrder = response.order;
        
        // Update confirmation page
        elements.confirmationOrderId.textContent = order.id;
        elements.confirmationServiceType.textContent = order.serviceText;
        elements.confirmationItemCount.textContent = order.itemCount + ' items';
        elements.confirmationPickupTime.textContent = `${order.pickupDate} ${order.pickupTime}`;
        elements.confirmationDeliveryTime.textContent = `${order.deliveryDate} ${order.deliveryTime}`;
        elements.confirmationTotalPrice.textContent = `KSH ${order.price}`;
        
        // Reset booking form
        resetBookingForm();
        
        // Navigate to confirmation page
        navigateToPage('confirmation');
        
        // Show notification
        showNotification('Order Submitted Successfully', `Your order ${order.id} has been successfully submitted`, 'success');
    } catch (error) {
        console.error('Error submitting booking:', error);
        showNotification('Booking Error', error.message || 'Failed to submit your order', 'error');
    }
}
```

### Step 6: Update Load User Orders Function

Find the `loadOrders` function (around line 5247) and replace with:

```javascript
async function loadOrders() {
    try {
        if (!app.user) {
            elements.ordersList.innerHTML = '<p>Please login to view your orders</p>';
            return;
        }
        
        // Get orders from API
        const response = await app.api.getUserOrders();
        const orders = response.orders;
        
        // Clear orders list
        elements.ordersList.innerHTML = '';
        
        if (orders.length === 0) {
            elements.ordersList.innerHTML = '<p>No orders found. Book a service to get started!</p>';
            return;
        }
        
        // Sort orders by date (newest first)
        const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Display orders
        sortedOrders.forEach(order => {
            const orderCard = createOrderCard(order);
            elements.ordersList.appendChild(orderCard);
        });
    } catch (error) {
        console.error('Error loading orders:', error);
        showNotification('Error', 'Failed to load orders', 'error');
    }
}
```

### Step 7: Update Admin Login Function

Find the admin login function and replace with:

```javascript
async function loginAdmin(event) {
    event.preventDefault();
    
    try {
        const credentials = {
            email: elements.adminLoginEmail.value,
            password: elements.adminLoginPassword.value
        };
        
        // Call API
        const response = await app.api.loginAdmin(credentials);
        
        // Save admin data
        app.admin = response.admin;
        localStorage.setItem('adminData', JSON.stringify(response.admin));
        
        // Hide login, show admin panel
        document.getElementById('adminLoginPage').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        
        // Load admin dashboard
        loadAdminDashboard();
        
        showNotification('Login Successful', `Welcome, ${response.admin.name}!`, 'success');
        
        // Reset form
        elements.adminLoginForm.reset();
    } catch (error) {
        console.error('Admin login error:', error);
        showNotification('Login Error', error.message || 'Invalid email or password', 'error');
    }
}
```

### Step 8: Update Admin Dashboard Loading

Find the `loadAdminDashboard` function (around line 3600) and replace with:

```javascript
async function loadAdminDashboard() {
    try {
        // Load stats from API
        const stats = await app.api.getAdminStats();
        
        // Update stat cards
        document.getElementById('totalUsersCount').textContent = stats.totalUsers;
        document.getElementById('totalOrdersCount').textContent = stats.totalOrders;
        document.getElementById('totalRevenueCount').textContent = `KSH ${stats.totalRevenue.toLocaleString()}`;
        document.getElementById('pendingOrdersCount').textContent = stats.pendingOrders;
        
        // Load recent orders
        await loadOrdersTable();
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showNotification('Error', 'Failed to load dashboard data', 'error');
    }
}
```

### Step 9: Update Admin Orders Table Loading

Find the `loadOrdersTable` function (around line 3692) and replace with:

```javascript
async function loadOrdersTable() {
    try {
        // Get all orders from API
        const response = await app.api.getAllOrders();
        const orders = response.orders;
        
        // Get all users from API
        const usersResponse = await app.api.getAllUsers();
        const users = usersResponse.users;
        
        // Clear table
        elements.ordersTable.innerHTML = '';
        
        if (orders.length === 0) {
            elements.ordersTable.innerHTML = '<tr><td colspan="8" style="text-align: center;">No orders found</td></tr>';
            return;
        }
        
        // Sort orders by date (newest first)
        const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        // Add orders to table
        sortedOrders.forEach(order => {
            const user = users.find(u => u._id === order.userId) || { name: order.userName || 'Unknown User' };
            
            let statusClass = '';
            switch(order.status) {
                case 'order_placed':
                case 'pickup_scheduled':
                    statusClass = 'status-pending';
                    break;
                case 'picked_up':
                case 'processing':
                    statusClass = 'status-processing';
                    break;
                case 'completed':
                case 'delivery_scheduled':
                case 'delivered':
                    statusClass = 'status-completed';
                    break;
                case 'cancelled':
                    statusClass = 'status-cancelled';
                    break;
            }
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${order.orderId}</td>
                <td>${user.name}</td>
                <td>${order.serviceText || order.serviceType}</td>
                <td>${order.pickupDate} ${order.pickupTime}</td>
                <td>${order.deliveryDate} ${order.deliveryTime}</td>
                <td><span class="order-status ${statusClass}">${order.statusText || order.status}</span></td>
                <td>KSH ${order.price || 0}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn view-order-details-btn" data-order-id="${order.orderId}">View</button>
                        <button class="btn update-order-status-btn" data-order-id="${order.orderId}">Update</button>
                        <button class="btn btn-danger delete-order-btn" data-order-id="${order.orderId}">Delete</button>
                    </div>
                </td>
            `;
            
            elements.ordersTable.appendChild(row);
        });
        
        // Attach event listeners
        attachOrderTableEventListeners();
    } catch (error) {
        console.error('Error loading orders table:', error);
        showNotification('Error', 'Failed to load orders', 'error');
    }
}
```

### Step 10: Update Order Status Update Function

Add this function for updating order status:

```javascript
async function updateOrderStatus(orderId, status, statusText) {
    try {
        await app.api.updateOrderStatus(orderId, status, statusText);
        showNotification('Success', 'Order status updated successfully', 'success');
        
        // Reload orders table
        await loadOrdersTable();
    } catch (error) {
        console.error('Error updating order status:', error);
        showNotification('Error', 'Failed to update order status', 'error');
    }
}
```

### Step 11: Update Order Delete Function

Add this function for deleting orders:

```javascript
async function deleteOrder(orderId) {
    if (!confirm('Are you sure you want to delete this order?')) {
        return;
    }
    
    try {
        await app.api.deleteOrder(orderId);
        showNotification('Success', 'Order deleted successfully', 'success');
        
        // Reload orders table
        await loadOrdersTable();
    } catch (error) {
        console.error('Error deleting order:', error);
        showNotification('Error', 'Failed to delete order', 'error');
    }
}
```

### Step 12: Initialize App on Page Load

Find the initialization code at the bottom of the script and replace with:

```javascript
// Initialize app when page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Check authentication
        await app.checkAuth();
        
        // Update UI based on auth status
        if (app.user) {
            updateUserUI();
        }
        
        // Load services (if needed)
        // await loadServices();
        
        // Initialize event listeners
        initializeEventListeners();
        
        console.log('App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
    }
});
```

## Summary of Changes

1. ✅ Added API client script
2. ✅ Replaced DatabaseManager with APIClient
3. ✅ Updated user registration to use API
4. ✅ Updated user login to use API
5. ✅ Updated order submission to use API
6. ✅ Updated order loading to use API
7. ✅ Updated admin login to use API
8. ✅ Updated admin dashboard to use API
9. ✅ Updated admin orders table to use API
10. ✅ Added order status update via API
11. ✅ Added order delete via API
12. ✅ Updated app initialization

## Testing Checklist

After making these changes:

- [ ] User can register
- [ ] User can login
- [ ] User can book a service
- [ ] User can view their orders
- [ ] Admin can login
- [ ] Admin can see all orders
- [ ] Admin can update order status
- [ ] Admin can delete orders
- [ ] Orders persist after page refresh
- [ ] Multiple users can see each other's orders in admin panel

## Important Notes

1. Make sure the backend server is running before testing
2. Check browser console for any errors
3. Use browser DevTools Network tab to monitor API calls
4. Clear browser cache if you encounter issues
5. Make sure CORS is properly configured in server.js
