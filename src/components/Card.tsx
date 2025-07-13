import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true, glow = false }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={clsx(
        'glassmorphism rounded-xl shadow-xl card-hover',
        glow && 'glow-on-hover',
        'border border-honey-purple/20 bg-card-bg/80 backdrop-blur-xl',
        'shadow-glow hover:shadow-glow-lg hover:border-honey-purple/40',
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default Card;