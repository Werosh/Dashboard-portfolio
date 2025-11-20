import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Home,
  FolderKanban,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebar } from "../../hooks/useSidebar";

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { path: "/", label: "Home", icon: Home },
  { path: "/projects", label: "Projects", icon: FolderKanban },
  { path: "/about", label: "About", icon: User },
  { path: "/contact", label: "Contact", icon: Mail },
];

export const Sidebar: React.FC = () => {
  const { isOpen, isMobile, toggle, close } = useSidebar();

  const sidebarVariants = {
    open: {
      width: isMobile ? "280px" : "260px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      width: isMobile ? 0 : "80px",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const contentVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  if (isMobile) {
    return (
      <>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
              />
              <motion.aside
                className="fixed left-0 top-0 bottom-0 z-[60] bg-[var(--panel)] border-r border-[var(--border)] w-[280px] pointer-events-auto"
                initial={{ x: -280 }}
                animate={{ x: 0 }}
                exit={{ x: -280 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="h-full flex flex-col pt-20">
                  <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={close}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover-grow cursor-pointer ${
                            isActive
                              ? "bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]"
                              : "text-[var(--text)] hover:bg-[var(--panel)] hover:text-[var(--primary)]"
                          }`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </NavLink>
                    ))}
                  </nav>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.aside
      className="fixed left-0 top-16 bottom-0 bg-[var(--panel)] border-r border-[var(--border)] z-40 overflow-hidden"
      variants={sidebarVariants}
      animate={isOpen ? "open" : "closed"}
      initial={false}
    >
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex justify-end p-4 flex-shrink-0">
          <motion.button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-[var(--panel)] transition-colors hover-grow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-[var(--text)]" />
            ) : (
              <ChevronRight className="w-5 h-5 text-[var(--text)]" />
            )}
          </motion.button>
        </div>

        <nav className="flex-1 px-4 pb-6 space-y-2 overflow-y-auto scrollbar-hide min-h-0">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover-grow relative ${
                  isActive
                    ? "bg-[var(--primary)]/20 text-[var(--primary)] border border-[var(--primary)]"
                    : "text-[var(--text)] hover:bg-[var(--panel)] hover:text-[var(--primary)]"
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.span
                    className="font-medium whitespace-nowrap"
                    variants={contentVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {!isOpen && (
                <motion.div
                  className="absolute left-full ml-2 px-3 py-2 bg-[var(--panel)] border border-[var(--border)] rounded-lg shadow-lg opacity-0 pointer-events-none whitespace-nowrap"
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};
