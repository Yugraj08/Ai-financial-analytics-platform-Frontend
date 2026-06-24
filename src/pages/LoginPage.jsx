import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 3) newErrors.password = 'Password is too short';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setApiError('Cannot reach the server. It may be starting up — please wait 30 seconds and try again.');
      } else if (err.code === 'ECONNABORTED') {
        setApiError('Request timed out. The server may be waking up — please try again.');
      } else {
        setApiError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Invalid credentials. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Mobile logo */}
      <div className="lg:hidden flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-accent-gradient flex items-center justify-center shadow-lg shadow-accent/20">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>
        <span className="text-heading-3 font-bold text-text-primary">
          Finance<span className="text-accent">IQ</span>
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-heading-1 text-text-primary font-bold">Welcome back</h2>
        <p className="text-body text-text-secondary">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Alert */}
      {apiError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-4 py-3 rounded-xl bg-error/10 border border-error/20 text-error text-body-sm"
        >
          {apiError}
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Sign in
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-body-sm text-text-secondary">
        Don't have an account?{' '}
        <Link
          to="/signup"
          className="text-accent hover:text-accent-hover font-medium transition-colors"
        >
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
