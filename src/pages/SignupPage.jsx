import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../constants';

const SignupPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'VIEWER',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name?.trim()) newErrors.name = 'Name is required';
    if (!form.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;

    setIsLoading(true);
    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
        setApiError('Cannot reach the server. It may be starting up — please wait 30 seconds and try again.');
      } else if (err.code === 'ECONNABORTED') {
        setApiError('Request timed out. The server may be waking up — please try again.');
      } else {
        setApiError(
          err.response?.data?.message ||
          err.response?.data?.error ||
          'Registration failed. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 py-12"
      >
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-heading-3 text-text-primary font-bold">Account Created!</h3>
        <p className="text-body text-text-secondary">Redirecting to login...</p>
      </motion.div>
    );
  }

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
        <h2 className="text-heading-1 text-text-primary font-bold">Create account</h2>
        <p className="text-body text-text-secondary">
          Start managing your finances today
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
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={User}
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
        />

        <InputField
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          error={errors.confirmPassword}
        />

        {/* Role */}
        <div className="space-y-1.5">
          <label className="block text-body-sm font-medium text-text-secondary">Role</label>
          <div className="grid grid-cols-3 gap-2">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => handleChange('role', r.value)}
                className={`px-3 py-2.5 rounded-xl text-caption font-medium transition-all duration-200 border ${
                  form.role === r.value
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'bg-background/50 border-border text-text-secondary hover:border-text-muted'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isLoading}
          className="w-full"
        >
          Create Account
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Footer */}
      <p className="text-center text-body-sm text-text-secondary">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-accent hover:text-accent-hover font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
