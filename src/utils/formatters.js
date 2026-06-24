/**
 * Format a number as Indian Rupee currency
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
};

/**
 * Format date for input fields (YYYY-MM-DD)
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

/**
 * Get initials from a name
 */
export const getInitials = (name) => {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

/**
 * Get a greeting based on time of day
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/**
 * Calculate percentage change
 */
export const calculatePercentage = (current, previous) => {
  if (!previous || previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 30) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Decode JWT token payload
 */
export const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

/**
 * Check if JWT token is expired
 */
export const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return true;
  return Date.now() >= decoded.exp * 1000;
};

/**
 * Group records by month
 */
export const groupByMonth = (records) => {
  const grouped = {};
  records.forEach((record) => {
    const date = new Date(record.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(date);
    if (!grouped[key]) {
      grouped[key] = { key, label, income: 0, expense: 0, records: [] };
    }
    if (record.type === 'INCOME') {
      grouped[key].income += record.amount;
    } else {
      grouped[key].expense += record.amount;
    }
    grouped[key].records.push(record);
  });
  return Object.values(grouped).sort((a, b) => a.key.localeCompare(b.key));
};

/**
 * Group records by category with totals
 */
export const groupByCategory = (records) => {
  const grouped = {};
  records.forEach((record) => {
    const cat = record.category || 'Other';
    if (!grouped[cat]) {
      grouped[cat] = { category: cat, total: 0, count: 0 };
    }
    grouped[cat].total += record.amount;
    grouped[cat].count += 1;
  });
  return Object.values(grouped).sort((a, b) => b.total - a.total);
};

/**
 * Classnames utility (simple version)
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
