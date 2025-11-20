import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import { ReactNode, useRef, useEffect } from 'react';

interface WindowModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  originRect?: DOMRect | null;
  windowId: string;
  className?: string;
}

export const WindowModal: React.FC<WindowModalProps> = ({
  isOpen,
  onClose,
  title,
  icon,
  children,
  originRect,
  windowId,
  className = '',
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Always center the modal - ignore originRect for consistent centering
  // This ensures the modal always opens in the middle of the screen
  const initialTransform = {
    scale: 0.8,
    opacity: 0,
  };

  const centerTransform = {
    scale: 1,
    opacity: 1,
  };

  const exitTransform = {
    scale: 0.8,
    opacity: 0,
  };

  // Always use center for transform origin to ensure centered animation
  const transformOrigin = 'center center';

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Window Modal */}
          <motion.div
            ref={windowRef}
            key={windowId}
            initial={initialTransform}
            animate={centerTransform}
            exit={exitTransform}
            transition={{
              type: 'spring',
              damping: 25,
              stiffness: 300,
              duration: 0.4,
            }}
            className={`fixed z-50 w-[95vw] sm:w-[90vw] md:w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] ${className}`}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transformOrigin: transformOrigin,
              margin: 0,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh]">
              {/* Window Title Bar */}
              <div className="bg-[var(--bg)] border-b border-[var(--border)] px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between select-none flex-shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  {/* Traffic Light Buttons */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <motion.button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Close"
                      aria-label="Close"
                    >
                      <X className="w-2 h-2 text-transparent group-hover:text-white transition-colors" />
                    </motion.button>
                    <motion.button
                      className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Minimize"
                      aria-label="Minimize"
                    >
                      <Minus className="w-2 h-2 text-transparent group-hover:text-[var(--text)] transition-colors" />
                    </motion.button>
                    <motion.button
                      className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Maximize"
                      aria-label="Maximize"
                    >
                      <Maximize2 className="w-2 h-2 text-transparent group-hover:text-white transition-colors" />
                    </motion.button>
                  </div>

                  {/* Window Title */}
                  <div className="flex items-center gap-1.5 sm:gap-2 ml-1 sm:ml-2 min-w-0">
                    {icon && <div className="text-[var(--primary)] flex-shrink-0">{icon}</div>}
                    <span className="text-xs sm:text-sm font-medium text-[var(--text)] truncate">
                      {title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Window Content */}
              <div className="overflow-y-auto flex-1 scrollbar-custom p-3 sm:p-4 md:p-6 min-h-0">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

