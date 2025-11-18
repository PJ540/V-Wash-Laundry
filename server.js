require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3001',
        'https://vwashlaundry.top',
        'https://www.vwashlaundry.top'
    ], // Add your custom domain here
    credentials: true
}));
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vwash_laundry';
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: String,
    createdAt: { type: Date, default: Date.now }
});

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userName: String,
    userEmail: String,
    serviceType: String,
    serviceText: String,
    itemCount: Number,
    specialInstructions: String,
    pickupDate: String,
    pickupTime: String,
    pickupAddress: String,
    pickupContact: String,
    pickupPhone: String,
    deliveryDate: String,
    deliveryTime: String,
    deliveryAddress: String,
    deliveryContact: String,
    deliveryPhone: String,
    status: { type: String, default: 'order_placed' },
    statusText: { type: String, default: 'Order Placed' },
    price: Number,
    createdAt: { type: Date, default: Date.now }
});

const serviceSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: String,
    description: String,
    price: Number,
    image: String
});

const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
    createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);
const Service = mongoose.model('Service', serviceSchema);
const Admin = mongoose.model('Admin', adminSchema);

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

// ============ USER ROUTES ============

// Register User
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await user.save();

        // Generate token
        const token = jwt.sign({ id: user._id, email: user.email, type: 'user' }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Login User
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ id: user._id, email: user.email, type: 'user' }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Change Password
app.post('/api/users/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        // Validate inputs
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }

        // Check password length
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }

        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify current password
        const validPassword = await bcrypt.compare(currentPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
});

// Update Profile
app.put('/api/users/profile', authenticateToken, async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if email is already taken by another user
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already in use' });
            }
        }

        // Update user fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

// ============ ORDER ROUTES ============

// Create Order
app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
        const orderData = req.body;
        
        // Get user info
        const user = await User.findById(req.user.id);
        
        // Remove 'id' field from orderData to avoid conflict with MongoDB _id
        const { id, ...orderDataWithoutId } = orderData;
        
        const order = new Order({
            ...orderDataWithoutId,
            userId: req.user.id,
            userName: user.name,
            userEmail: user.email,
            orderId: id || 'ORD' + Date.now().toString().slice(-8)
        });

        await order.save();

        res.status(201).json({
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Get User Orders
app.get('/api/orders/user', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Get All Orders (Admin)
app.get('/api/orders', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Update Order Status (Admin)
app.patch('/api/orders/:orderId/status', authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status, statusText } = req.body;

        const order = await Order.findOneAndUpdate(
            { orderId },
            { status, statusText },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order updated successfully', order });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// Delete Order (Admin)
app.delete('/api/orders/:orderId', authenticateToken, async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOneAndDelete({ orderId });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

// ============ ADMIN ROUTES ============

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check password
        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id, email: admin.email, type: 'admin' }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Admin login successful',
            token,
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Get Dashboard Stats (Admin)
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const pendingOrders = await Order.countDocuments({ status: { $in: ['order_placed', 'pickup_scheduled'] } });
        
        const orders = await Order.find();
        const totalRevenue = orders.reduce((sum, order) => sum + (order.price || 0), 0);

        res.json({
            totalUsers,
            totalOrders,
            pendingOrders,
            totalRevenue
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Get All Users (Admin)
app.get('/api/admin/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Get Single User (Admin)
app.get('/api/users/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Update User (Admin)
app.put('/api/admin/users/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const { name, email, phone } = req.body;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if email is already taken by another user
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ error: 'Email is already in use' });
            }
        }

        // Update user fields
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;

        await user.save();

        res.json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

// Delete User (Admin)
app.delete('/api/admin/users/:userId', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.params;

        // Delete user's orders first
        await Order.deleteMany({ userId });

        // Delete user
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User and all associated data deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// ============ SERVICE ROUTES ============

// Get All Services
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json({ services });
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: 'Failed to fetch services' });
    }
});

// Get Single Service
app.get('/api/services/:serviceId', async (req, res) => {
    try {
        const { serviceId } = req.params;
        const service = await Service.findOne({ id: serviceId });
        
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        
        res.json({ service });
    } catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({ error: 'Failed to fetch service' });
    }
});

// Create Service (Admin)
app.post('/api/services', authenticateToken, async (req, res) => {
    try {
        const serviceData = req.body;
        
        const service = await Service.findOneAndUpdate(
            { id: serviceData.id },
            serviceData,
            { upsert: true, new: true }
        );

        res.json({ message: 'Service saved successfully', service });
    } catch (error) {
        console.error('Error saving service:', error);
        res.status(500).json({ error: 'Failed to save service' });
    }
});

// Update Service (Admin)
app.put('/api/services/:serviceId', authenticateToken, async (req, res) => {
    try {
        const { serviceId } = req.params;
        const updateData = req.body;
        
        const service = await Service.findOneAndUpdate(
            { id: serviceId },
            updateData,
            { new: true }
        );

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service updated successfully', service });
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ error: 'Failed to update service' });
    }
});

// Delete Service (Admin)
app.delete('/api/services/:serviceId', authenticateToken, async (req, res) => {
    try {
        const { serviceId } = req.params;
        
        const service = await Service.findOneAndDelete({ id: serviceId });

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        res.json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ error: 'Failed to delete service' });
    }
});

// ============ ADMIN MANAGEMENT ROUTES ============

// Get All Admins
app.get('/api/admin/admins', authenticateToken, async (req, res) => {
    try {
        const admins = await Admin.find().select('-password').sort({ createdAt: -1 });
        res.json({ admins });
    } catch (error) {
        console.error('Error fetching admins:', error);
        res.status(500).json({ error: 'Failed to fetch admins' });
    }
});

// Get Single Admin
app.get('/api/admin/admins/:adminId', authenticateToken, async (req, res) => {
    try {
        const { adminId } = req.params;
        const admin = await Admin.findById(adminId).select('-password');
        
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }
        
        res.json({ admin });
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({ error: 'Failed to fetch admin' });
    }
});

// Create Admin
app.post('/api/admin/admins', authenticateToken, async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new admin
        const admin = new Admin({
            name,
            email,
            phone,
            password: hashedPassword,
            role: role || 'admin',
            status: 'active'
        });

        await admin.save();

        res.json({
            message: 'Admin created successfully',
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                role: admin.role,
                status: admin.status
            }
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: 'Failed to create admin' });
    }
});

// Update Admin
app.put('/api/admin/admins/:adminId', authenticateToken, async (req, res) => {
    try {
        const { adminId } = req.params;
        const { name, email, phone, role, status } = req.body;

        const admin = await Admin.findById(adminId);
        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        // Check if email is already taken by another admin
        if (email && email !== admin.email) {
            const existingAdmin = await Admin.findOne({ email });
            if (existingAdmin) {
                return res.status(400).json({ error: 'Email is already in use' });
            }
        }

        // Update admin fields
        if (name) admin.name = name;
        if (email) admin.email = email;
        if (phone) admin.phone = phone;
        if (role) admin.role = role;
        if (status) admin.status = status;

        await admin.save();

        res.json({
            message: 'Admin updated successfully',
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                phone: admin.phone,
                role: admin.role,
                status: admin.status
            }
        });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({ error: 'Failed to update admin' });
    }
});

// Delete Admin
app.delete('/api/admin/admins/:adminId', authenticateToken, async (req, res) => {
    try {
        const { adminId } = req.params;
        
        const admin = await Admin.findByIdAndDelete(adminId);

        if (!admin) {
            return res.status(404).json({ error: 'Admin not found' });
        }

        res.json({ message: 'Admin deleted successfully' });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({ error: 'Failed to delete admin' });
    }
});

// Serve INDEX.HTML for root route
app.get('/', (req, res) => {
    res.sendFile('INDEX.HTML', { root: '.' });
});

// Initialize default admin account
async function initializeDefaultAdmin() {
    try {
        const adminExists = await Admin.findOne({ email: 'admin@vwashlaundry.co.ke' });
        
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            const admin = new Admin({
                name: 'Admin',
                email: 'admin@vwashlaundry.co.ke',
                password: hashedPassword,
                role: 'super_admin'
            });
            await admin.save();
            console.log('Default admin account created');
        }
    } catch (error) {
        console.error('Error initializing admin:', error);
    }
}

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    initializeDefaultAdmin();
});
