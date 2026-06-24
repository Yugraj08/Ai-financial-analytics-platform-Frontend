import { useState, useEffect, useCallback } from 'react';
import * as recordService from '../services/recordService';
import { PAGE_SIZE } from '../constants';

const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchRecords = useCallback(async (pageNum = 0) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch 1000 items by default since backend pagination doesn't return metadata
      const data = await recordService.getRecords(pageNum, 1000);
      // Handle paginated response (Spring Boot format)
      if (data.content) {
        const sorted = [...data.content].sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecords(sorted);
        setTotalPages(data.totalPages || 0);
        setTotalElements(data.totalElements || 0);
        setPage(data.number || pageNum);
      } else if (Array.isArray(data)) {
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecords(sorted);
        setTotalPages(1);
        setTotalElements(data.length);
      } else {
        setRecords([]);
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 403) {
        setError('Access denied. Record listing is available for Admin users only.');
      } else {
        setError(err.response?.data?.message || 'Failed to fetch records');
      }
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const addRecord = useCallback(async (data) => {
    const newRecord = await recordService.createRecord(data);
    // Refresh list — may 403 for non-ADMIN, that's OK since the record was created
    try { await fetchRecords(page); } catch (_) { /* ignore fetch errors */ }
    return newRecord;
  }, [fetchRecords, page]);

  const editRecord = useCallback(async (id, data) => {
    const updated = await recordService.updateRecord(id, data);
    try { await fetchRecords(page); } catch (_) { /* ignore fetch errors */ }
    return updated;
  }, [fetchRecords, page]);

  const removeRecord = useCallback(async (id) => {
    await recordService.deleteRecord(id);
    await fetchRecords(page);
  }, [fetchRecords, page]);

  const goToPage = useCallback((pageNum) => {
    fetchRecords(pageNum);
  }, [fetchRecords]);

  useEffect(() => {
    fetchRecords(0);
  }, [fetchRecords]);

  return {
    records,
    loading,
    error,
    page,
    totalPages,
    totalElements,
    fetchRecords,
    addRecord,
    editRecord,
    removeRecord,
    goToPage,
    refresh: () => fetchRecords(page),
  };
};

export default useRecords;
