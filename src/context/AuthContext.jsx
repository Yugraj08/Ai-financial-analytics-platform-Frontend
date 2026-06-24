import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser = authService.getUser();

    if (storedToken && authService.isAuthenticated()) {
      setToken(storedToken);
      setUser(storedUser);
    } else {
      // Token expired or missing — clean up
      authService.logout();
    }
    setLoading(false);
  }, []);

  const loginUser = useCallback(async (email, password) => {
    // Backend returns { token, role }
    const data = await authService.login(email, password);
    const storedUser = authService.getUser();
    setToken(data.token);
    setUser({
      ...storedUser,
      role: data.role || storedUser?.role,
      name: storedUser?.email, // Backend doesn't return name on login
    });
    navigate('/dashboard');
    return data;
  }, [navigate]);

  const registerUser = useCallback(async (formData) => {
    const data = await authService.register(formData);
    return data;
  }, []);

  const logoutUser = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    navigate('/login');
  }, [navigate]);

  const isAdmin = user?.role === 'ADMIN';
  const isAnalyst = user?.role === 'ANALYST';
  const isViewer = user?.role === 'VIEWER';
  const canAccessDashboard = isAdmin || isAnalyst;
  const canManageRecords = isAdmin;

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && authService.isAuthenticated(),
    isAdmin,
    isAnalyst,
    isViewer,
    canAccessDashboard,
    canManageRecords,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
