import { motion, useScroll, useTransform } from "framer-motion";
import { Menu } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { useSidebar } from "../../hooks/useSidebar";

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const { isMobile, toggle } = useSidebar();
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 50], [0, 10]);

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    } else {
      toggle();
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)]"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
    >
      <div className="max-w-full mx-auto px-4 lg:px-6 h-16 flex items-center justify-between bg-[var(--panel)]/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          {isMobile && (
            <motion.button
              onClick={handleMenuClick}
              className="p-2 rounded-lg hover:bg-[var(--panel)] transition-colors hover-grow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5 text-[var(--text)]" />
            </motion.button>
          )}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">DP</span>
            </div>
            <span className="font-semibold text-lg text-[var(--text)] hidden sm:block">
              Dashboard Portfolio
            </span>
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};
