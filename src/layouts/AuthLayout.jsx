import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left — Branding Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-purple-900/20" />
        <div className="absolute inset-0 dot-pattern opacity-30" />

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        {/* Content */}
        <div className="relative flex flex-col justify-center px-12 xl:px-20 z-10">
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-xl shadow-accent/30">
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="text-heading-2 font-bold text-text-primary tracking-tight">
                Finance<span className="text-accent">IQ</span>
              </span>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2 className="text-display text-text-primary leading-tight">
                Smart Money,<br />
                <span className="gradient-text">Smarter Decisions</span>
              </h2>
              <p className="text-body-lg text-text-secondary max-w-lg leading-relaxed">
                Take control of your finances with real-time analytics, intelligent categorization, and actionable insights to grow your wealth.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-4 pt-4">
              {[
                { emoji: '📊', text: 'Real-time financial dashboards' },
                { emoji: '🔒', text: 'Bank-grade security with JWT' },
                { emoji: '📈', text: 'Visual spending analytics' },
                { emoji: '⚡', text: 'Lightning-fast performance' },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xl">{feature.emoji}</span>
                  <span className="text-body text-text-secondary">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right — Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
