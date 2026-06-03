import React from 'react';

const Button = ({ 
  children, onClick, variant = 'primary', className = '', disabled = false, ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-accent text-primary hover:bg-secondary-accent hover:text-primary-text focus:ring-primary-accent font-bold",

    secondary: "bg-secondary text-primary-text border border-secondary-hover hover:bg-secondary-hover focus:ring-secondary-text",

    danger: "bg-transparent text-red-400 border border-red-500/30 hover:bg-red-500/10 focus:ring-red-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;