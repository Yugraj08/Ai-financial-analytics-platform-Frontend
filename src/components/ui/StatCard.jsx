import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency, cn } from '../../utils/formatters';
import { hoverScale } from '../../animations/variants';

const StatCard = ({ title, value, icon: Icon, type = 'default', isCurrency = true, delay = 0 }) => {
  const typeStyles = {
    default: {
      iconBg: 'bg-accent/10',
      iconColor: 'text-accent',
      borderGlow: 'hover:border-accent/30',
    },
    income: {
      iconBg: 'bg-success/10',
      iconColor: 'text-success',
      borderGlow: 'hover:border-success/30',
    },
    expense: {
      iconBg: 'bg-error/10',
      iconColor: 'text-error',
      borderGlow: 'hover:border-error/30',
    },
    balance: {
      iconBg: 'bg-purple-500/10',
      iconColor: 'text-purple-400',
      borderGlow: 'hover:border-purple-400/30',
    },
  };

  const styles = typeStyles[type] || typeStyles.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hoverScale}
      className={cn(
        'glass-card p-6 cursor-default',
        'transition-all duration-300',
        styles.borderGlow,
        'hover:shadow-card-hover'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-body-sm text-text-secondary font-medium">{title}</p>
          <p className="text-heading-2 text-text-primary font-bold tracking-tight">
            {isCurrency ? formatCurrency(value) : value}
          </p>
        </div>
        <div className={cn('p-3 rounded-xl', styles.iconBg)}>
          <Icon className={cn('w-6 h-6', styles.iconColor)} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
