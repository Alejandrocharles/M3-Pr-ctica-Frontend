import React, { createContext, useContext, useState, useEffect } from 'react';
import { ApiService } from '../services/ApiService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const savedUser = localStorage.getItem('currentUser');
            const authToken = localStorage.getItem('authToken');
            
            if (savedUser && authToken) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (error) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('authToken');
                }
            }
            setLoading(false);
        };
        
        checkAuthStatus();
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 