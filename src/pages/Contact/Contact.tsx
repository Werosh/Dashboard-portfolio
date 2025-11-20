import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Linkedin, Github, Twitter } from 'lucide-react';
import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { PageTransition } from '../../components/PageTransition';
import { staggerContainer, staggerItem } from '../../utils/motionPresets';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com', color: 'text-[var(--text)]' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com', color: 'text-blue-500' },
    { icon: Twitter, label: 'Twitter', url: 'https://twitter.com', color: 'text-blue-400' },
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

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          title="Get In Touch"
          subtitle="Let's connect and discuss your next project"
          icon={<Mail className="w-6 h-6 text-[var(--primary)]" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {socialLinks.map((social, index) => (
            <motion.div
              key={index}
              variants={staggerItem}
              initial="hidden"
              animate="visible"
            >
              <Card>
                <motion.a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-3 hover-grow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className={`w-8 h-8 ${social.color}`} />
                  <span className="font-medium text-[var(--text)]">{social.label}</span>
                </motion.a>
              </Card>
            </motion.div>
          ))}
        </div>

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
      </div>
    </PageTransition>
  );
};

