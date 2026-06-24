import { motion } from 'framer-motion';

/**
 * Animated three-dot typing indicator.
 * Shown when waiting for the AI to respond.
 * Uses staggered bounce animation consistent with the app's motion design.
 */
const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 max-w-[85%]">
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
        <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>

      {/* Typing bubble */}
      <div className="glass-card px-5 py-4 rounded-2xl rounded-tl-md">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent/60"
              animate={{
                y: [0, -6, 0],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
