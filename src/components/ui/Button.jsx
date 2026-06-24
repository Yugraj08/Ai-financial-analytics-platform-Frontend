import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/formatters';

const variants = {
  primary: 'bg-accent text-white hover:bg-accent-hover focus:ring-accent shadow-lg shadow-accent/20 hover:shadow-accent/30',
  secondary: 'bg-card border border-border text-text-primary hover:bg-card-hover focus:ring-border',
  danger: 'bg-error/10 text-error border border-error/20 hover:bg-error/20 focus:ring-error',
  ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-card focus:ring-border',
  success: 'bg-success/10 text-success border border-success/20 hover:bg-success/20 focus:ring-success',
};

const sizes = {
  sm: 'px-3 py-1.5 text-caption rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-body-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-body rounded-xl gap-2.5',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : Icon ? (
        <Icon className={cn(size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4')} />
      ) : null}
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
