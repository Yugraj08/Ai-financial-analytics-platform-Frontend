import { useState, useEffect, useCallback } from 'react';
import * as recordService from '../services/recordService';

const useDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // getDashboard() already maps backend's "balance" → "totalBalance"
      const data = await recordService.getDashboard();
      setDashboard(data);
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) {
        setError('Access denied. Dashboard is available for Admin and Analyst roles only.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    dashboard,
    loading,
    error,
    refresh: fetchDashboard,
  };
};

export default useDashboard;
