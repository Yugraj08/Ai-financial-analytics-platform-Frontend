import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield } from 'lucide-react';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { updateUserRole } from '../services/userService';
import { ROLES } from '../constants';
import { pageTransition } from '../animations/variants';

const AdminPage = () => {
  const { isAdmin } = useAuth();
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('VIEWER');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  if (!isAdmin) {
    return (
      <div className="page-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <Shield className="w-12 h-12 text-error mx-auto" />
          <h2 className="text-heading-3 text-text-primary">Access Denied</h2>
          <p className="text-body-sm text-text-secondary">Only administrators can access this page.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!userId) { setError('User ID is required'); return; }
    setLoading(true);
    try {
      const res = await updateUserRole(userId, selectedRole);
      setResult(`Role updated successfully to ${selectedRole}`);
      setUserId('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update role');
    } finally { setLoading(false); }
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="page-container space-y-8 max-w-2xl">
      <div>
        <h1 className="text-heading-2 text-text-primary font-bold">User Management</h1>
        <p className="text-body-sm text-text-secondary mt-1">Manage user roles and permissions</p>
      </div>

      <div className="glass-card p-6">
        <h3 className="text-heading-4 text-text-primary font-semibold mb-6 flex items-center gap-2">
          <Users className="w-5 h-5 text-accent" />Update User Role
        </h3>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-4 px-4 py-3 rounded-xl bg-error/10 border border-error/20 text-error text-body-sm">
            {error}
          </motion.div>
        )}
        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-4 px-4 py-3 rounded-xl bg-success/10 border border-success/20 text-success text-body-sm">
            {result}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField label="User ID" type="text" placeholder="Enter user ID" value={userId}
            onChange={(e) => setUserId(e.target.value)} icon={Users} />

          <div className="space-y-1.5">
            <label className="block text-body-sm font-medium text-text-secondary">New Role</label>
            <div className="grid grid-cols-3 gap-3">
              {ROLES.map(r => (
                <button key={r.value} type="button" onClick={() => setSelectedRole(r.value)}
                  className={`px-4 py-3 rounded-xl text-body-sm font-medium transition-all duration-200 border ${
                    selectedRole === r.value
                      ? 'bg-accent/10 border-accent/30 text-accent'
                      : 'bg-background/50 border-border text-text-secondary hover:border-text-muted'
                  }`}>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" isLoading={loading} className="w-full">Update Role</Button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminPage;
