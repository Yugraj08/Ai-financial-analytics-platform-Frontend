import API from '../api/axios';
import { decodeToken } from '../utils/formatters';

/**
 * Register a new user
 */
export const register = async (data) => {
  const response = await API.post('/auth/register', {
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || 'VIEWER',
  });
  return response.data;
};

/**
 * Login user and store token
 * Backend returns: { token: "...", role: "ADMIN" }
 */
export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  const { token, role } = response.data;

  if (token) {
    localStorage.setItem('token', token);

    // Decode token to get user id
    const decoded = decodeToken(token);
    if (decoded) {
      const user = {
        id: decoded.sub,
        role: role || decoded.role, // Use role from response (more reliable)
        email: email,
      };
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  return response.data;
};

/**
 * Logout — clear stored data
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Get the stored token
 */
export const getToken = () => localStorage.getItem('token');

/**
 * Get the stored user
 */
export const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  // Check token expiry
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;
  return Date.now() < decoded.exp * 1000;
};
