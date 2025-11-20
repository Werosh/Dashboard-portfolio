import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cardHover } from '../../utils/motionPresets';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <motion.div
      className={`bg-[var(--panel)] border border-[var(--border)] rounded-lg p-6 shadow-sm hover:shadow-lg transition-shadow hover-grow ${className}`}
      whileHover={cardHover}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {children}
    </motion.div>
  );
};

