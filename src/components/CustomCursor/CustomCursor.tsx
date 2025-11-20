import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface CustomCursorProps {
  disabled?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ disabled = false }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isButtonHovering, setIsButtonHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (disabled || window.innerWidth <= 768) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsButtonHovering(true);
        setIsHovering(true);
      } else if (target.closest('.hover-grow')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
        setIsButtonHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setIsButtonHovering(false);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, disabled]);

  if (disabled || window.innerWidth <= 768 || !isVisible) return null;

  return (
    <>
      <motion.div
        className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full border-2 border-[var(--primary)]"
          style={{
            scale: isHovering ? (isButtonHovering ? 2 : 1.5) : 1,
            backgroundColor: isButtonHovering ? 'var(--primary)' : 'transparent',
          }}
          animate={{
            boxShadow: isButtonHovering
              ? '0 0 20px var(--primary), 0 0 40px var(--primary)'
              : 'none',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      {isButtonHovering && (
        <motion.div
          className="custom-cursor fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 0.3 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <div className="w-20 h-20 rounded-full bg-[var(--primary)] blur-xl" />
        </motion.div>
      )}
    </>
  );
};

