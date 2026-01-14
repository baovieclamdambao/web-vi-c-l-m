import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg";
  
  const variants = {
    // Primary is now Red Gradient to match the logo text
    primary: "bg-gradient-to-r from-brand-600 to-red-500 text-white hover:from-brand-500 hover:to-red-400 focus:ring-brand-500 shadow-lg shadow-brand-500/30",
    // Secondary is Dark for contrast
    secondary: "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-500 shadow-md",
    // Outline uses Brand Red colors
    outline: "border-2 border-brand-500 text-brand-600 bg-white hover:bg-brand-50 hover:border-brand-600 focus:ring-brand-500",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};