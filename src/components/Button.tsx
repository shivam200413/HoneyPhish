import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'neon';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  glow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  disabled,
  glow = false,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-honey-purple to-honey-blue hover:from-neon-purple hover:to-neon-blue text-white focus:ring-honey-purple shadow-lg shadow-honey-purple/25 hover:shadow-glow',
    secondary: 'bg-gray-800/80 hover:bg-gray-700/80 text-white focus:ring-gray-500 border border-gray-600/50 hover:border-honey-purple/50',
    outline: 'cyber-button border border-honey-purple/50 text-honey-purple hover:bg-honey-purple/20 hover:border-honey-purple focus:ring-honey-purple hover:text-neon-purple',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white focus:ring-red-500 shadow-lg shadow-red-500/25',
    neon: 'neon-border bg-transparent text-neon-purple hover:bg-honey-purple/10 hover:text-white hover:shadow-neon',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : undefined}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        disabledClasses,
        glow && 'glow-on-hover',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {variant === 'outline' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-honey-purple/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-500" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default Button;