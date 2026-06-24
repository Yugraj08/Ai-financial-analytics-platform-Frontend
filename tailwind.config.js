/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        'background-light': '#F8FAFC',
        card: '#111827',
        'card-light': '#FFFFFF',
        'card-hover': '#1E293B',
        accent: '#3B82F6',
        'accent-hover': '#2563EB',
        success: '#10B981',
        'success-light': '#D1FAE5',
        error: '#EF4444',
        'error-light': '#FEE2E2',
        warning: '#F59E0B',
        'warning-light': '#FEF3C7',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-muted': '#64748B',
        border: '#1E293B',
        'border-light': '#E2E8F0',
        'sidebar': '#0B1120',
        'glass': 'rgba(17, 24, 39, 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'heading-1': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading-2': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['1.5rem', { lineHeight: '1.4', fontWeight: '600' }],
        'heading-4': ['1.25rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500' }],
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 10px 40px -10px rgba(59, 130, 246, 0.15)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        'accent-gradient': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
        'success-gradient': 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
        'error-gradient': 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
