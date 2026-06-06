import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../api/authService';
import Button from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); 
  
  const [passwords, setPasswords] = useState({ newPassword: '', confirmPassword: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {isDark, toggleTheme} = useTheme();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      setStatus({ type: 'error', message: 'Invalid or missing reset token.' });
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setStatus({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await authService.resetPassword(token, passwords.newPassword);
      setStatus({ type: 'success', message: 'Password reset successfully! Redirecting to login...' });
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus({ 
        type: 'error', 
        message: err.response?.data?.message || 'Failed to reset password. The link may have expired.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col py-5 sm:px-6 lg:px-8 font-inter">
      <div className='flex items-center justify-between w-full mb-25 pt-2 pr-2'>
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
          Create New Password
        </h2>
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
              <label className="block text-sm font-medium text-primary-text">New Password</label>
              <input
                type="password"
                required
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                className="mt-1 w-full bg-primary text-primary-text border border-secondary-hover rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-text">Confirm Password</label>
              <input
                type="password"
                required
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                className="mt-1 w-full bg-primary text-primary-text border border-secondary-hover rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-accent"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Save New Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;