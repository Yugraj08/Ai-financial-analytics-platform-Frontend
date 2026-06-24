import { cn } from '../../utils/formatters';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantStyles = {
    default: 'bg-accent/10 text-accent border-accent/20',
    income: 'bg-success/10 text-success border-success/20',
    expense: 'bg-error/10 text-error border-error/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    admin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    analyst: 'bg-accent/10 text-accent border-accent/20',
    viewer: 'bg-text-muted/10 text-text-secondary border-text-muted/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-caption font-medium border',
        variantStyles[variant] || variantStyles.default,
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
