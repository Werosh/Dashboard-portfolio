import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { slideInUp } from '../../utils/motionPresets';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  icon,
  className = '',
}) => {
  return (
    <motion.div
      className={`flex items-center gap-4 mb-8 ${className}`}
      variants={slideInUp}
      initial="hidden"
      animate="visible"
    >
      {icon && (
        <motion.div
          className="w-12 h-12 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {icon}
        </motion.div>
      )}
      <div>
        <h2 className="text-2xl font-bold text-[var(--text)] mb-1">{title}</h2>
        {subtitle && (
          <p className="text-sm text-[var(--text)]/70">{subtitle}</p>
        )}
      </div>
    </motion.div>
  );
};

