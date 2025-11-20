import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Linkedin, Github, Twitter, Minus, Maximize2, X } from 'lucide-react';
import { Card } from '../../components/Card';
import { PageTransition } from '../../components/PageTransition';
import { WindowModal } from '../../components/WindowModal';
import { useWindow } from '../../context/WindowContext';
import { staggerContainer, staggerItem } from '../../utils/motionPresets';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { openWindow, closeWindow, isWindowOpen, getWindowOrigin } = useWindow();
  const socialRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const socialLinks = [
    { id: 'github', icon: Github, label: 'GitHub', url: 'https://github.com', color: 'text-[var(--text)]' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'text-blue-500' },
    { id: 'twitter', icon: Twitter, label: 'Twitter', url: 'https://twitter.com', color: 'text-blue-400' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialClick = (socialId: string) => {
    const ref = socialRefs.current[socialId];
    const rect = ref?.getBoundingClientRect() || null;
    openWindow(socialId, rect);
  };

  const Window: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ 
    title, 
    children, 
    className = '' 
  }) => (
    <motion.div
      className={`bg-[var(--panel)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Window Title Bar */}
      <div className="bg-[var(--bg)] border-b border-[var(--border)] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer flex items-center justify-center">
              <X className="w-2 h-2 text-transparent hover:text-white" />
            </div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer flex items-center justify-center">
              <Minus className="w-2 h-2 text-transparent hover:text-[var(--text)]" />
            </div>
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer flex items-center justify-center">
              <Maximize2 className="w-2 h-2 text-transparent hover:text-white" />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Mail className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-medium text-[var(--text)]">{title}</span>
          </div>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="p-6">
        {children}
      </div>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Window Container */}
        <Window title="Contact Manager">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <Mail className="w-6 h-6 text-[var(--primary)]" />
              <div>
                <h1 className="text-2xl font-bold text-[var(--text)]">Get In Touch</h1>
                <p className="text-sm text-[var(--text)]/70">Let's connect and discuss your next project</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.id}
                ref={(el) => (socialRefs.current[social.id] = el)}
                variants={staggerItem}
                initial="hidden"
                animate="visible"
              >
                <div 
                  onClick={() => handleSocialClick(social.id)}
                  className="cursor-pointer"
                >
                  <Card className="hover:border-[var(--primary)]/50 transition-all">
                    <div className="flex flex-col items-center gap-3">
                      <social.icon className={`w-8 h-8 ${social.color}`} />
                      <span className="font-medium text-[var(--text)]">{social.label}</span>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <Card>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-6">
                  Send a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[var(--text)] mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[var(--text)] mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-[var(--text)] mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] focus:outline-none focus:border-[var(--primary)] transition-colors resize-none"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--hover)] transition-colors hover-grow"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </Card>
            </motion.div>
          </motion.div>
        </Window>

        {/* Social Link Modals */}
        {socialLinks.map((social) => (
          <WindowModal
            key={social.id}
            isOpen={isWindowOpen(social.id)}
            onClose={() => closeWindow(social.id)}
            title={social.label}
            icon={<social.icon className="w-4 h-4" />}
            windowId={social.id}
            originRect={getWindowOrigin(social.id)}
          >
            <div className="space-y-6">
              <div className="text-center py-8">
                <social.icon className={`w-16 h-16 ${social.color} mx-auto mb-4`} />
                <h2 className="text-2xl font-bold text-[var(--text)] mb-2">{social.label}</h2>
                <p className="text-[var(--text)]/70 mb-6">Connect with me on {social.label}</p>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--hover)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Visit {social.label}
                </motion.a>
              </div>
            </div>
          </WindowModal>
        ))}
      </div>
    </PageTransition>
  );
};
