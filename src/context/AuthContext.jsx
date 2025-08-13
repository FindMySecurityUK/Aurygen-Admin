import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
  const [user, setUser] = useLocalStorage('user', null);
  const [loading, setLoading] = useState(false);
  
  // Debug: Log authentication state changes
  useEffect(() => {
    console.log('Auth state changed:', { isAuthenticated, user: user?.username });
  }, [isAuthenticated, user]);

  const login = async (username, password) => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
      
      if (username === adminUsername && password === adminPassword) {
        const userData = {
          id: '1',
          username: adminUsername,
          role: 'admin',
          loginTime: new Date().toISOString()
        };
        
        // Set user first, then authentication
        setUser(userData);
        setIsAuthenticated(true);
        
        // Force a small delay to ensure state is set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};