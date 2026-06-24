import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, size = 'md' }) => {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  const spinner = (
    <div className="flex items-center justify-center gap-3">
      <div
        className={`${sizeMap[size]} border-accent/20 border-t-accent rounded-full animate-spin`}
      />
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
      >
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-body-sm text-text-secondary animate-pulse">Loading...</p>
        </div>
      </motion.div>
    );
  }

  return spinner;
};

export default Loader;
