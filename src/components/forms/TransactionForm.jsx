import { useState, useEffect } from 'react';
import { Calendar, DollarSign, Tag, FileText } from 'lucide-react';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
import { CATEGORIES, TRANSACTION_TYPES } from '../../constants';
import { formatDateForInput } from '../../utils/formatters';

const TransactionForm = ({ initialData = null, onSubmit, onCancel, isLoading = false }) => {
  const [form, setForm] = useState({
    type: 'EXPENSE',
    amount: '',
    category: '',
    note: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        type: initialData.type || 'EXPENSE',
        amount: initialData.amount?.toString() || '',
        category: initialData.category || '',
        note: initialData.note || initialData.description || '',
        date: formatDateForInput(initialData.date) || new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.type) newErrors.type = 'Type is required';
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Valid amount is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (!form.note?.trim()) newErrors.note = 'Description is required';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...form,
        amount: parseFloat(form.amount),
      });
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Type Toggle */}
      <div className="space-y-1.5">
        <label className="block text-body-sm font-medium text-text-secondary">Type</label>
        <div className="grid grid-cols-2 gap-3">
          {TRANSACTION_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => handleChange('type', t.value)}
              className={`px-4 py-3 rounded-xl text-body-sm font-medium transition-all duration-200 border ${
                form.type === t.value
                  ? t.value === 'INCOME'
                    ? 'bg-success/10 border-success/30 text-success'
                    : 'bg-error/10 border-error/30 text-error'
                  : 'bg-background/50 border-border text-text-secondary hover:border-text-muted'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {errors.type && <p className="text-caption text-error">{errors.type}</p>}
      </div>

      {/* Amount */}
      <InputField
        label="Amount"
        type="number"
        placeholder="0.00"
        icon={DollarSign}
        value={form.amount}
        onChange={(e) => handleChange('amount', e.target.value)}
        error={errors.amount}
        min="0"
        step="0.01"
      />

      {/* Category */}
      <div className="space-y-1.5">
        <label className="block text-body-sm font-medium text-text-secondary">Category</label>
        <div className="relative">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full pl-10 pr-4 py-3 bg-background/50 border rounded-xl text-text-primary 
                       focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent
                       transition-all duration-200 appearance-none cursor-pointer
                       ${errors.category ? 'border-error' : 'border-border'}`}
          >
            <option value="" className="bg-card text-text-muted">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat} className="bg-card text-text-primary">
                {cat}
              </option>
            ))}
          </select>
        </div>
        {errors.category && <p className="text-caption text-error">{errors.category}</p>}
      </div>

      {/* Description (maps to backend's "note" field) */}
      <InputField
        label="Description"
        type="text"
        placeholder="e.g., Monthly salary"
        icon={FileText}
        value={form.note}
        onChange={(e) => handleChange('note', e.target.value)}
        error={errors.note}
      />

      {/* Date */}
      <InputField
        label="Date"
        type="date"
        icon={Calendar}
        value={form.date}
        onChange={(e) => handleChange('date', e.target.value)}
        error={errors.date}
      />

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={isLoading}
          className="flex-1"
        >
          {initialData ? 'Update Transaction' : 'Add Transaction'}
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
