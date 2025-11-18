// API Client for V-Wash Laundry Backend
class APIClient {
    constructor() {
        // Automatically use the correct API URL based on environment
        this.baseURL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:3001/api'
            : '/api'; // Use relative path - works with custom domain
        
        this.token = localStorage.getItem('authToken');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }

    // Get authentication headers
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    // Generic request method
    async request(endpoint, options = {}) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                ...options,
                headers: this.getHeaders()
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ============ USER METHODS ============

    async registerUser(userData) {
        const response = await this.request('/users/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        if (response.token) {
            this.setToken(response.token);
        }
        
        return response;
    }

    async loginUser(credentials) {
        const response = await this.request('/users/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        if (response.token) {
            this.setToken(response.token);
        }
        
        return response;
    }

    // ============ ORDER METHODS ============

    async createOrder(orderData) {
        return await this.request('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    }

    async getUserOrders() {
        return await this.request('/orders/user');
    }

    async getAllOrders() {
        return await this.request('/orders');
    }

    async updateOrderStatus(orderId, status, statusText) {
        return await this.request(`/orders/${orderId}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, statusText })
        });
    }

    async deleteOrder(orderId) {
        return await this.request(`/orders/${orderId}`, {
            method: 'DELETE'
        });
    }

    // ============ ADMIN METHODS ============

    async loginAdmin(credentials) {
        const response = await this.request('/admin/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        if (response.token) {
            this.setToken(response.token);
        }
        
        return response;
    }

    async getAdminStats() {
        return await this.request('/admin/stats');
    }

    async getAllUsers() {
        return await this.request('/admin/users');
    }

    async updateUser(userId, userData) {
        return await this.request(`/admin/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    async deleteUser(userId) {
        return await this.request(`/admin/users/${userId}`, {
            method: 'DELETE'
        });
    }

    // ============ SERVICE METHODS ============

    async getServices() {
        return await this.request('/services');
    }

    async saveService(serviceData) {
        return await this.request('/services', {
            method: 'POST',
            body: JSON.stringify(serviceData)
        });
    }

    // ============ USER PROFILE METHODS ============

    async changePassword(currentPassword, newPassword) {
        return await this.request('/users/change-password', {
            method: 'POST',
            body: JSON.stringify({ currentPassword, newPassword })
        });
    }

    async updateProfile(profileData) {
        return await this.request('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    }

    // ============ UTILITY METHODS ============

    logout() {
        this.setToken(null);
    }

    isAuthenticated() {
        return !!this.token;
    }
}

// Export for use in HTML file
window.APIClient = APIClient;
