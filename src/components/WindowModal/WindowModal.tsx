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

  // Calculate center position for the modal
  const getCenterPosition = () => {
    if (typeof window === 'undefined') return { x: 0, y: 0 };
    return {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
  };

  // Calculate origin position
  const getOriginPosition = () => {
    if (!originRect) return { x: 0, y: 0 };
    return {
      x: originRect.left + originRect.width / 2,
      y: originRect.top + originRect.height / 2,
    };
  };

  const centerPos = getCenterPosition();
  const originPos = getOriginPosition();

  // Use transform origin for animation
  const initialTransform = originRect
    ? {
        scale: 0.3,
        opacity: 0,
      }
    : {
        scale: 0.8,
        opacity: 0,
      };

  const centerTransform = {
    scale: 1,
    opacity: 1,
  };

  const exitTransform = originRect
    ? {
        scale: 0.3,
        opacity: 0,
      }
    : {
        scale: 0.8,
        opacity: 0,
      };

  // Calculate transform origin for smooth animation
  const transformOrigin = originRect
    ? `${originPos.x}px ${originPos.y}px`
    : `${centerPos.x}px ${centerPos.y}px`;

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
            className={`fixed z-50 w-full max-w-4xl max-h-[80vh] ${className}`}
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              transformOrigin: transformOrigin,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
              {/* Window Title Bar */}
              <div className="bg-[var(--bg)] border-b border-[var(--border)] px-4 py-3 flex items-center justify-between select-none">
                <div className="flex items-center gap-3">
                  {/* Traffic Light Buttons */}
                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Close"
                    >
                      <X className="w-2 h-2 text-transparent group-hover:text-white transition-colors" />
                    </motion.button>
                    <motion.button
                      className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Minimize"
                    >
                      <Minus className="w-2 h-2 text-transparent group-hover:text-[var(--text)] transition-colors" />
                    </motion.button>
                    <motion.button
                      className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer flex items-center justify-center group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Maximize"
                    >
                      <Maximize2 className="w-2 h-2 text-transparent group-hover:text-white transition-colors" />
                    </motion.button>
                  </div>

                  {/* Window Title */}
                  <div className="flex items-center gap-2 ml-2">
                    {icon && <div className="text-[var(--primary)]">{icon}</div>}
                    <span className="text-sm font-medium text-[var(--text)] truncate max-w-[300px]">
                      {title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Window Content */}
              <div className="overflow-y-auto flex-1 scrollbar-custom p-6">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

