import { useState, forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/formatters';

const InputField = forwardRef(({
  label,
  type = 'text',
  error,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-body-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          ref={ref}
          type={inputType}
          className={cn(
            'w-full px-4 py-3 bg-background/50 border rounded-xl',
            'text-text-primary placeholder:text-text-muted',
            'focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent',
            'transition-all duration-200',
            Icon && 'pl-10',
            isPassword && 'pr-10',
            error ? 'border-error focus:ring-error/50 focus:border-error' : 'border-border',
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-caption text-error flex items-center gap-1 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;
