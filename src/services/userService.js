import API from '../api/axios';

/**
 * Update user role (ADMIN only)
 */
export const updateUserRole = async (userId, role) => {
  const response = await API.put(`/users/${userId}/role`, { role });
  return response.data;
};
