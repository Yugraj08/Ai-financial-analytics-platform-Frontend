import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import TransactionForm from '../components/forms/TransactionForm';
import useRecords from '../hooks/useRecords';
import { formatCurrency, formatDate } from '../utils/formatters';
import { CATEGORIES, CATEGORY_ICONS } from '../constants';
import { pageTransition } from '../animations/variants';
import { useAuth } from '../context/AuthContext';

const TransactionsPage = () => {
  const { records, loading, page, totalPages, totalElements, addRecord, editRecord, removeRecord, goToPage } = useRecords();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [actionError, setActionError] = useState(null);
  const { isAdmin } = useAuth();

  const filtered = useMemo(() => {
    let result = records;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r => (r.note || r.description || '')?.toLowerCase().includes(q) || r.category?.toLowerCase().includes(q));
    }
    if (categoryFilter) {
      result = result.filter(r => r.category === categoryFilter);
    }
    return result;
  }, [records, search, categoryFilter]);

  const handleAdd = async (data) => {
    setFormLoading(true);
    setActionError(null);
    try {
      await addRecord(data);
      setShowAddModal(false);
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || err.response?.data?.error;
      
      if (status === 403) {
        setActionError('Access denied. Only Admin users can create records.');
      } else if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setActionError('Cannot reach the server. It may be starting up — please wait 30 seconds and try again.');
      } else if (err.code === 'ECONNABORTED') {
        setActionError('Request timed out. The server may be waking up — please try again.');
      } else {
        setActionError(message || 'Failed to create transaction. Please try again.');
      }
      setShowAddModal(false);
    }
    finally { setFormLoading(false); }
  };

  const handleEdit = async (data) => {
    setFormLoading(true);
    setActionError(null);
    try {
      await editRecord(editingRecord.id, data);
      setEditingRecord(null);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to update transaction.';
      setActionError(message);
      setEditingRecord(null);
    }
    finally { setFormLoading(false); }
  };

  const handleDelete = async () => {
    setActionError(null);
    try {
      await removeRecord(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Failed to delete transaction.';
      setActionError(message);
      setDeleteTarget(null);
    }
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="page-container space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-heading-2 text-text-primary font-bold">Transactions</h1>
          <p className="text-body-sm text-text-secondary mt-1">{totalElements} total records</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Transaction</Button>
      </div>

      {/* Role-based error message */}
      {actionError && (
        <div className="glass-card p-4 border border-error/30 bg-error/5">
          <p className="text-body-sm text-error">{actionError}</p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input type="text" placeholder="Search transactions..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10" />
        </div>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-field max-w-[200px] appearance-none cursor-pointer">
          <option value="">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? <Skeleton.Table rows={8} /> : filtered.length === 0 ? (
        <EmptyState title="No transactions found" description={search || categoryFilter ? 'Try adjusting your filters.' : 'Add your first transaction to get started.'}
          actionLabel={!search && !categoryFilter ? 'Add Transaction' : undefined}
          onAction={!search && !categoryFilter ? () => setShowAddModal(true) : undefined} />
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30 bg-card-hover/30">
                  <th className="table-cell table-header text-left">Description</th>
                  <th className="table-cell table-header text-left hidden sm:table-cell">Category</th>
                  <th className="table-cell table-header text-right">Amount</th>
                  <th className="table-cell table-header text-left hidden md:table-cell">Type</th>
                  <th className="table-cell table-header text-left hidden lg:table-cell">Date</th>
                  <th className="table-cell table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((record, i) => (
                  <motion.tr key={record.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }} className="table-row group">
                    <td className="table-cell text-text-primary font-medium">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{CATEGORY_ICONS[record.category] || '📦'}</span>
                        <span className="truncate max-w-[200px]">{record.note || record.description}</span>
                      </div>
                    </td>
                    <td className="table-cell text-text-secondary hidden sm:table-cell">{record.category}</td>
                    <td className={`table-cell text-right font-semibold ${record.type === 'INCOME' ? 'text-success' : 'text-error'}`}>
                      {record.type === 'INCOME' ? '+' : '-'}{formatCurrency(record.amount)}
                    </td>
                    <td className="table-cell hidden md:table-cell">
                      <Badge variant={record.type === 'INCOME' ? 'income' : 'expense'}>{record.type}</Badge>
                    </td>
                    <td className="table-cell text-text-secondary hidden lg:table-cell">{formatDate(record.date)}</td>
                    <td className="table-cell text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingRecord(record)}
                          className="p-2 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(record)}
                          className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border/30">
              <p className="text-caption text-text-secondary">Page {page + 1} of {totalPages}</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled={page === 0} onClick={() => goToPage(page - 1)} icon={ChevronLeft}>Prev</Button>
                <Button variant="ghost" size="sm" disabled={page >= totalPages - 1} onClick={() => goToPage(page + 1)}>Next<ChevronRight className="w-4 h-4" /></Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Transaction">
        <TransactionForm onSubmit={handleAdd} onCancel={() => setShowAddModal(false)} isLoading={formLoading} />
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={!!editingRecord} onClose={() => setEditingRecord(null)} title="Edit Transaction">
        <TransactionForm initialData={editingRecord} onSubmit={handleEdit} onCancel={() => setEditingRecord(null)} isLoading={formLoading} />
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Transaction" size="sm">
        <div className="space-y-4">
          <p className="text-body text-text-secondary">Are you sure you want to delete "<span className="text-text-primary font-medium">{deleteTarget?.note || deleteTarget?.description}</span>"? This action cannot be undone.</p>
          <div className="flex items-center gap-3">
            <Button variant="danger" onClick={handleDelete} className="flex-1">Delete</Button>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default TransactionsPage;
