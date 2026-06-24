import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, Zap } from 'lucide-react';
import { NAV_ITEMS, ADMIN_NAV_ITEMS } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { getInitials, cn } from '../../utils/formatters';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();

  const navItems = isAdmin ? [...NAV_ITEMS, ...ADMIN_NAV_ITEMS] : NAV_ITEMS;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-accent-gradient flex items-center justify-center shadow-lg shadow-accent/20">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-heading-4 font-bold text-text-primary tracking-tight">
            Finance<span className="text-accent">IQ</span>
          </h1>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-4 border-t border-border/50" />

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-body-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-card-hover border border-transparent'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-accent' : '')} />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-6 rounded-r-full bg-accent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 border-t border-border/50" />

      {/* User section */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-card-hover/50">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center text-caption font-bold text-accent">
            {getInitials(user?.name || user?.email)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-body-sm font-medium text-text-primary truncate">
              {user?.name || user?.email || 'User'}
            </p>
            <p className="text-caption text-text-muted capitalize">{user?.role?.toLowerCase()}</p>
          </div>
          <button
            onClick={logout}
            className="p-2 rounded-lg text-text-muted hover:text-error hover:bg-error/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-border/50 fixed inset-y-0 left-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed inset-y-0 left-0 w-72 bg-sidebar border-r border-border/50 z-50"
            >
              <button
                onClick={onClose}
                className="absolute top-5 right-4 p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-card-hover transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
