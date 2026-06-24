import { motion } from 'framer-motion';
import { slideUp } from '../../animations/variants';

const ChartCard = ({ title, subtitle, children, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`glass-card p-6 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-heading-4 text-text-primary font-semibold">{title}</h3>
        {subtitle && (
          <p className="text-body-sm text-text-secondary mt-1">{subtitle}</p>
        )}
      </div>
      <div className="w-full">{children}</div>
    </motion.div>
  );
};

export default ChartCard;
