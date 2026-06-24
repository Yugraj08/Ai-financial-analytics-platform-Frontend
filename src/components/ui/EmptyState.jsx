import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import Button from './Button';
import { fadeIn } from '../../animations/variants';

const EmptyState = ({
  title = 'No data found',
  description = 'Get started by adding your first entry.',
  icon: Icon = Inbox,
  actionLabel,
  onAction,
}) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="p-4 rounded-2xl bg-card-hover/50 mb-5">
        <Icon className="w-10 h-10 text-text-muted" />
      </div>
      <h3 className="text-heading-4 text-text-primary mb-2">{title}</h3>
      <p className="text-body-sm text-text-secondary text-center max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default EmptyState;
