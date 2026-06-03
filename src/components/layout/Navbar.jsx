import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../api/authService';
import Button from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';

const Navbar = () => {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-secondary border-b border-secondary-hover font-inter transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/dashboard')}
        >
          <h1 className="text-2xl font-bold text-primary-accent tracking-wide">
            Formify
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme} 
            className="text-secondary-text hover:text-primary-accent transition-colors"
            title="Toggle Theme"
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>

          <Button onClick={handleLogout} variant="secondary" className="text-sm py-1.5">
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;