import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, LogOut, Moon, Sun } from 'lucide-react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/formatters';
import { pageTransition } from '../animations/variants';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const roleBadgeVariant = {
    ADMIN: 'admin',
    ANALYST: 'analyst',
    VIEWER: 'viewer',
  };

  return (
    <motion.div variants={pageTransition} initial="hidden" animate="visible" className="page-container space-y-8 max-w-3xl">
      <div>
        <h1 className="text-heading-2 text-text-primary font-bold">Settings</h1>
        <p className="text-body-sm text-text-secondary mt-1">Manage your account preferences</p>
      </div>

      {/* Profile Card */}
      <div className="glass-card p-6">
        <h3 className="text-heading-4 text-text-primary font-semibold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-accent" />Profile
        </h3>
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-heading-3 font-bold text-accent">
            {getInitials(user?.name || user?.email)}
          </div>
          <div className="space-y-2">
            <h4 className="text-heading-4 text-text-primary font-semibold">
              {user?.name || user?.email || 'User'}
            </h4>
            <p className="text-body-sm text-text-secondary">{user?.email || 'No email'}</p>
            <Badge variant={roleBadgeVariant[user?.role] || 'default'}>
              {user?.role || 'VIEWER'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="glass-card p-6">
        <h3 className="text-heading-4 text-text-primary font-semibold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />Security
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border/30">
            <div>
              <p className="text-body-sm text-text-primary font-medium">Authentication</p>
              <p className="text-caption text-text-secondary">JWT-based secure authentication</p>
            </div>
            <Badge variant="income">Active</Badge>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-border/30">
            <div>
              <p className="text-body-sm text-text-primary font-medium">Role-Based Access</p>
              <p className="text-caption text-text-secondary">Permissions managed by admin</p>
            </div>
            <Badge variant={roleBadgeVariant[user?.role] || 'default'}>{user?.role}</Badge>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 border-error/20">
        <h3 className="text-heading-4 text-error font-semibold mb-4 flex items-center gap-2">
          <LogOut className="w-5 h-5" />Danger Zone
        </h3>
        <p className="text-body-sm text-text-secondary mb-4">
          Sign out of your account. You will need to log in again.
        </p>
        <Button variant="danger" icon={LogOut} onClick={() => setShowLogoutConfirm(true)}>
          Sign Out
        </Button>
      </div>

      {/* Logout Confirm */}
      <Modal isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} title="Sign Out" size="sm">
        <div className="space-y-4">
          <p className="text-body text-text-secondary">Are you sure you want to sign out?</p>
          <div className="flex items-center gap-3">
            <Button variant="danger" onClick={logout} className="flex-1">Sign Out</Button>
            <Button variant="secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

export default SettingsPage;
