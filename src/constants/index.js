import {
  LayoutDashboard,
  ArrowLeftRight,
  BarChart3,
  Bot,
  Settings,
  Users,
} from 'lucide-react';

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', path: '/transactions', icon: ArrowLeftRight },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'AI Assistant', path: '/assistant', icon: Bot },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export const ADMIN_NAV_ITEMS = [
  { label: 'User Management', path: '/admin/users', icon: Users },
];

export const CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Food',
  'Rent',
  'Entertainment',
  'Shopping',
  'Transport',
  'Health',
  'Education',
  'Utilities',
  'Travel',
  'Other',
];

export const TRANSACTION_TYPES = [
  { value: 'INCOME', label: 'Income' },
  { value: 'EXPENSE', label: 'Expense' },
];

export const ROLES = [
  { value: 'VIEWER', label: 'Viewer' },
  { value: 'ANALYST', label: 'Analyst' },
  { value: 'ADMIN', label: 'Admin' },
];

export const CHART_COLORS = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#14B8A6', // Teal
  '#6366F1', // Indigo
  '#84CC16', // Lime
  '#A855F7', // Violet
  '#E11D48', // Rose
];

export const CATEGORY_ICONS = {
  Salary: '💰',
  Freelance: '💻',
  Investment: '📈',
  Food: '🍕',
  Rent: '🏠',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Transport: '🚗',
  Health: '🏥',
  Education: '📚',
  Utilities: '⚡',
  Travel: '✈️',
  Other: '📦',
};

export const PAGE_SIZE = 10;
