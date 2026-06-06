import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/authService';
import Button from '../components/ui/Button';
import {useTheme} from '../hooks/useTheme'
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {isDark, toggleTheme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await authService.forgotPassword(email);
      setStatus({ 
        type: 'success', 
        message: 'If an account exists with that email, a reset link has been sent.' 
      });
      setEmail('');
    } catch (err) {
      console.log(err)
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to process request. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col py-5 sm:px-6 lg:px-8 font-inter">
      <div className='flex items-center justify-between w-full mb-30'>
        <div></div>

      <Button 
            onClick={toggleTheme} variant='primary'
            title="Toggle Theme"
            >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </Button>
            </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-primary-text">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-text">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-secondary py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-secondary-hover">
          
          {status.message && (
            <div className={`mb-4 p-3 rounded text-sm ${status.type === 'success' ? 'bg-green-900/20 text-green-400 border border-green-500/30' : 'bg-red-900/20 text-red-400 border border-red-500/30'}`}>
              {status.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-text">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-primary text-primary-text border border-secondary-hover rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Sending link...' : 'Send Reset Link'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm font-medium text-primary-accent hover:text-secondary-accent transition-colors">
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;