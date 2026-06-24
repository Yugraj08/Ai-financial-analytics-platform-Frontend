import API from '../api/axios';

/**
 * Get records with pagination
 * Backend returns: List<RecordResponseDTO> (flat array, NOT paginated wrapper)
 * Fields: { id, amount, type, category, date, note, userId }
 */
export const getRecords = async (page = 0, size = 10) => {
  const response = await API.get('/records', {
    params: { page, size },
  });
  return response.data;
};

/**
 * Get all records (for analytics — fetches a large page)
 */
export const getAllRecords = async () => {
  const response = await API.get('/records', {
    params: { page: 0, size: 1000 },
  });
  return response.data;
};

/**
 * Create a new record
 * Backend expects: { type, amount, category, date, note }
 * Note: Backend uses "note" not "description"
 */
export const createRecord = async (data) => {
  const response = await API.post('/records', {
    type: data.type,
    amount: parseFloat(data.amount),
    category: data.category,
    note: data.note || data.description || '',
    date: data.date,
  });
  return response.data;
};

/**
 * Update a record
 * Backend expects: { type, amount, category, date, note }
 */
export const updateRecord = async (id, data) => {
  const response = await API.put(`/records/${id}`, {
    type: data.type,
    amount: parseFloat(data.amount),
    category: data.category,
    note: data.note || data.description || '',
    date: data.date,
  });
  return response.data;
};

/**
 * Delete a record
 * Backend returns: "Record deleted successfully" (plain string)
 */
export const deleteRecord = async (id) => {
  const response = await API.delete(`/records/${id}`);
  return response.data;
};

/**
 * Get dashboard summary
 * Backend returns: { totalIncome, totalExpense, balance }
 * Note: backend uses "balance", frontend expects "totalBalance"
 */
export const getDashboard = async () => {
  const response = await API.get('/records/dashboard');
  const data = response.data;
  // Map backend field names to frontend expectations
  return {
    totalIncome: data.totalIncome ?? 0,
    totalExpense: data.totalExpense ?? 0,
    totalBalance: data.balance ?? (data.totalIncome ?? 0) - (data.totalExpense ?? 0),
  };
};
