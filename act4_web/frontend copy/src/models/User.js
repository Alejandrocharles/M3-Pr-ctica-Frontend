import { ApiService } from '../services/ApiService';

export class User {
    constructor(userData) {
        this._id = userData._id || userData.id;
        this.email = userData.email;
        this.username = userData.username;
        this.role = userData.role || 'user';
        this.createdAt = userData.createdAt;
        this.lastLogin = userData.lastLogin;
    }

    getFullName() {
        return this.username || this.email;
    }

    static async authenticate(email, password) {
        try {
            const response = await ApiService.post('/api/auth/login', { email, password });
            
            // Store the auth token for future requests
            localStorage.setItem('authToken', response.token);
            
            // Create a user object from the response
            // Adjust this based on what your API returns
            const userData = {
                _id: response.user._id,
                email: response.user.email,
                username: response.user.username,
                // Add any other fields your API returns
            };
            
            return new User(userData);
        } catch (error) {
            throw new Error('Invalid email or password');
        }
    }

    static async register(username, email, password) {
        try {
            const userData = {
                username,
                email,
                password
            };
            
            const response = await ApiService.post('/api/users', userData);
            return new User(response);
        } catch (error) {
            throw new Error('Registration failed');
        }
    }

    static async getById(id) {
        try {
            const response = await ApiService.get(`/api/users/${id}`);
            return new User(response);
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    }

    static async getAll() {
        try {
            const response = await ApiService.get('/api/users');
            return response.map(userData => new User(userData));
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    static async update(id, userData) {
        try {
            const response = await ApiService.put(`/api/users/${id}`, userData);
            return new User(response);
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    static async delete(id) {
        try {
            await ApiService.delete(`/api/users/${id}`);
            return true;
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }
}