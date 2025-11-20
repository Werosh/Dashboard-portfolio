import { motion } from 'framer-motion';
import { User, Code, Lightbulb, Rocket, Target, Eye, Minus, Maximize2, X } from 'lucide-react';
import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { PageTransition } from '../../components/PageTransition';
import { WindowModal } from '../../components/WindowModal';
import { useWindow } from '../../context/WindowContext';
import { staggerContainer, staggerItem } from '../../utils/motionPresets';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const { openWindow, closeWindow, isWindowOpen, getWindowOrigin } = useWindow();
  const profileRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const internshipRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

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
            <User className="w-4 h-4 text-[var(--primary)]" />
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

  const highlights = [
    {
      text: '4+ YEARS',
      subtitle: 'Building Production Experiences',
      accent: true,
    },
    {
      text: 'FULL-STACK',
      subtitle: 'From Product Strategy to Deployment',
      accent: false,
    },
    {
      text: 'CREATIVE',
      subtitle: 'Design-Led Engineering Mindset',
      accent: true,
    },
    {
      text: 'IMPACT FOCUSED',
      subtitle: 'Shipping Outcomes, Not Just Features',
      accent: false,
    },
  ];

  const skillBadges = [
    {
      icon: Code,
      text: 'FULL-STACK\nDEVELOPER',
    },
    {
      icon: Lightbulb,
      text: 'CREATIVE\nTHINKER',
    },
    {
      icon: Rocket,
      text: 'FAST\nLEARNER',
    },
    {
      icon: Target,
      text: 'GOAL\nORIENTED',
    },
  ];

  const internship = {
    company: 'Ranga Technologies',
    role: 'Software Engineer Intern',
    focus: 'Frontend focus',
    duration: 'Sep 2025 – Present · Frontend',
    description:
      'Building production-ready frontend systems with GenAI-assisted workflows while collaborating with cross-functional squads to elevate accessibility and performance standards.',
  };

  const techStack = [
    'REACT',
    'TYPESCRIPT',
    'NODE.JS',
    'PYTHON',
    'AWS',
    'MONGODB',
    'POSTGRESQL',
    'DOCKER',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentHighlight((prev) => (prev + 1) % highlights.length);
        setIsFlipping(false);
      }, 400);
    }, 4500);
    return () => clearInterval(interval);
  }, [highlights.length]);

  const handleCardClick = (windowId: string, ref: React.RefObject<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect() || null;
    openWindow(windowId, rect);
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Window Container */}
        <Window title="About - Profile Manager">
          {/* Header Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <User className="w-6 h-6 text-[var(--primary)]" />
              <div>
                <h1 className="text-2xl font-bold text-[var(--text)]">About</h1>
                <p className="text-sm text-[var(--text)]/70">Building the Future</p>
              </div>
            </div>
          </motion.div>

          {/* Main Grid Layout - OS Style */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile & Highlights */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1 space-y-6"
          >
            {/* Profile Card */}
            <motion.div variants={staggerItem}>
              <div 
                ref={profileRef}
                onClick={() => handleCardClick('profile-modal', profileRef)}
                className="cursor-pointer"
              >
                <Card className="hover:border-[var(--primary)]/50 transition-all">
                  <div className="text-center space-y-4">
                    <div className="relative group mx-auto w-48 h-48">
                      <div className="w-full h-full rounded-2xl overflow-hidden bg-[var(--border)] border-2 border-[var(--border)]">
                        <img
                          src="/images/dp.jpg"
                          alt="Werosh Kriyanjala"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--primary)] rounded-full border-4 border-[var(--panel)] flex items-center justify-center">
                        <Rocket size={14} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[var(--text)] mb-1">
                        Werosh Kriyanjala
                      </h3>
                      <p className="text-sm text-[var(--text)]/70 mb-2">
                        Software Engineer
                      </p>
                      <div className="inline-block bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] px-3 py-1 rounded-md text-xs font-semibold">
                        UNIVERSITY OF MORATUWA
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Dynamic Highlight Card */}
            <motion.div variants={staggerItem}>
              <Card className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/20">
                <div className="relative h-32 flex items-center justify-center">
                  <div
                    className={`transform transition-all duration-500 text-center ${
                      isFlipping
                        ? 'opacity-0 scale-95'
                        : 'opacity-100 scale-100'
                    }`}
                  >
                    <div
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        highlights[currentHighlight].accent
                          ? 'text-[var(--primary)]'
                          : 'text-[var(--text)]'
                      }`}
                    >
                      {highlights[currentHighlight].text}
                    </div>
                    <p className="text-sm text-[var(--text)]/70 font-medium">
                      {highlights[currentHighlight].subtitle}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Skill Badges */}
            <motion.div variants={staggerItem}>
              <Card>
                <h4 className="text-sm font-semibold text-[var(--text)] mb-4 uppercase tracking-wider">
                  Core Strengths
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {skillBadges.map((badge, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center p-3 bg-[var(--bg)] border border-[var(--border)] rounded-lg hover:border-[var(--primary)] transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <badge.icon
                        size={20}
                        className="mb-2 text-[var(--primary)]"
                      />
                      <span className="text-[10px] font-bold leading-tight whitespace-pre-line text-center text-[var(--text)]">
                        {badge.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* Middle Column - Main Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {/* Professional Summary */}
            <motion.div variants={staggerItem}>
              <div 
                ref={summaryRef}
                onClick={() => handleCardClick('summary-modal', summaryRef)}
                className="cursor-pointer"
              >
                <Card className="hover:border-[var(--primary)]/50 transition-all">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center">
                      <User size={20} className="text-[var(--primary)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)]">
                        Professional Summary
                      </h3>
                      <p className="text-xs text-[var(--text)]/60">About Me</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-[var(--text)]/80 leading-relaxed line-clamp-3">
                      I'm Werosh Kriyanjala, a builder obsessed with pairing ambitious
                      ideas with thoughtful execution. Whether it's orchestrating
                      full-stack platforms or refining the micro-interactions that
                      users feel, I anchor every project on clarity, craft, and
                      measurable results.
                    </p>
                    <p className="text-[var(--text)]/80 leading-relaxed line-clamp-2">
                      From leading web experiences at NextGen Websites
                      to architecting internal tooling, I collaborate with founders,
                      designers, and engineers to ship products that feel seamless and
                      perform under pressure.
                    </p>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Current Role - Internship */}
            <motion.div variants={staggerItem}>
              <div 
                ref={internshipRef}
                onClick={() => handleCardClick('internship-modal', internshipRef)}
                className="cursor-pointer"
              >
                <Card className="bg-[var(--primary)]/5 border-[var(--primary)]/30 hover:border-[var(--primary)]/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[var(--primary)] flex items-center justify-center flex-shrink-0">
                      <Rocket size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-[var(--primary)] text-white text-xs font-bold uppercase rounded">
                          Current
                        </span>
                        <span className="text-xs text-[var(--text)]/60">
                          {internship.duration}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[var(--text)] mb-1">
                        {internship.role}
                      </h3>
                      <p className="text-sm text-[var(--primary)] font-medium mb-2">
                        {internship.company}
                      </p>
                      <p className="text-sm text-[var(--text)]/70 leading-relaxed line-clamp-3">
                        {internship.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={staggerItem}>
              <div 
                ref={techRef}
                onClick={() => handleCardClick('tech-modal', techRef)}
                className="cursor-pointer"
              >
                <Card className="hover:border-[var(--primary)]/50 transition-all">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center">
                      <Code size={20} className="text-[var(--primary)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)]">
                        Technology Stack
                      </h3>
                      <p className="text-xs text-[var(--text)]/60">Core Technologies</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {techStack.slice(0, 6).map((item, index) => (
                      <motion.span
                        key={item}
                        className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] rounded-md hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                    {techStack.length > 6 && (
                      <span className="px-3 py-1.5 text-xs font-semibold text-[var(--text)]/70">
                        +{techStack.length - 6} more
                      </span>
                    )}
                  </div>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>
        </Window>

        {/* Modals */}
        <WindowModal
          isOpen={isWindowOpen('profile-modal')}
          onClose={() => closeWindow('profile-modal')}
          title="Werosh Kriyanjala - Profile"
          icon={<User className="w-4 h-4" />}
          windowId="profile-modal"
          originRect={getWindowOrigin('profile-modal')}
        >
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative mx-auto w-48 h-48 mb-6">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-[var(--border)] border-2 border-[var(--border)]">
                  <img
                    src="/images/dp.jpg"
                    alt="Werosh Kriyanjala"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[var(--primary)] rounded-full border-4 border-[var(--panel)] flex items-center justify-center">
                  <Rocket size={14} className="text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-2">Werosh Kriyanjala</h2>
              <p className="text-lg text-[var(--text)]/70 mb-3">Software Engineer</p>
              <div className="inline-block bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] px-4 py-2 rounded-md text-sm font-semibold">
                UNIVERSITY OF MORATUWA
              </div>
            </div>
            <div className="pt-4 border-t border-[var(--border)]">
              <p className="text-[var(--text)]/80 leading-relaxed">
                A passionate software engineer with a drive to build exceptional digital experiences. 
                Currently pursuing Software Engineering at the University of Moratuwa, specializing in 
                full-stack development and modern web technologies.
              </p>
            </div>
          </div>
        </WindowModal>

        <WindowModal
          isOpen={isWindowOpen('summary-modal')}
          onClose={() => closeWindow('summary-modal')}
          title="Professional Summary"
          icon={<User className="w-4 h-4" />}
          windowId="summary-modal"
          originRect={getWindowOrigin('summary-modal')}
        >
          <div className="space-y-4">
            <p className="text-[var(--text)]/80 leading-relaxed">
              I'm Werosh Kriyanjala, a builder obsessed with pairing ambitious
              ideas with thoughtful execution. Whether it's orchestrating
              full-stack platforms or refining the micro-interactions that
              users feel, I anchor every project on clarity, craft, and
              measurable results.
            </p>
            <p className="text-[var(--text)]/80 leading-relaxed">
              From leading web experiences at{' '}
              <a
                href="https://www.nextgenwebsites.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] underline decoration-dotted underline-offset-4 hover:bg-[var(--primary)]/10 px-1 transition-colors"
              >
                NextGen Websites
              </a>{' '}
              to architecting internal tooling, I collaborate with founders,
              designers, and engineers to ship products that feel seamless and
              perform under pressure.
            </p>
            <div className="pt-4 border-t border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text)] mb-2">Key Focus Areas</h3>
              <ul className="space-y-2 text-[var(--text)]/80">
                <li>• Full-stack web development</li>
                <li>• User experience design and implementation</li>
                <li>• Performance optimization and scalability</li>
                <li>• Modern development practices and workflows</li>
              </ul>
            </div>
          </div>
        </WindowModal>

        <WindowModal
          isOpen={isWindowOpen('internship-modal')}
          onClose={() => closeWindow('internship-modal')}
          title={`${internship.role} - ${internship.company}`}
          icon={<Rocket className="w-4 h-4" />}
          windowId="internship-modal"
          originRect={getWindowOrigin('internship-modal')}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-bold uppercase rounded">
                Current
              </span>
              <span className="text-sm text-[var(--text)]/60">
                {internship.duration}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-2">
                {internship.role}
              </h3>
              <p className="text-lg text-[var(--primary)] font-medium mb-4">
                {internship.company}
              </p>
              <p className="text-[var(--text)]/80 leading-relaxed mb-4">
                {internship.description}
              </p>
              <div className="pt-4 border-t border-[var(--border)]">
                <h4 className="font-semibold text-[var(--text)] mb-2">Focus Areas</h4>
                <p className="text-[var(--text)]/70">{internship.focus}</p>
              </div>
            </div>
          </div>
        </WindowModal>

        <WindowModal
          isOpen={isWindowOpen('tech-modal')}
          onClose={() => closeWindow('tech-modal')}
          title="Technology Stack"
          icon={<Code className="w-4 h-4" />}
          windowId="tech-modal"
          originRect={getWindowOrigin('tech-modal')}
        >
          <div className="space-y-4">
            <p className="text-[var(--text)]/80 mb-4">
              Core technologies and tools I work with to build modern, scalable applications.
            </p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((item, index) => (
                <motion.span
                  key={item}
                  className="px-4 py-2 text-sm font-semibold uppercase tracking-wider border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] rounded-lg hover:border-[var(--primary)] hover:text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </WindowModal>
      </div>
    </PageTransition>
  );
};

