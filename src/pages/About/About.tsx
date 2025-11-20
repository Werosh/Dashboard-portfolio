import { motion } from "framer-motion";
import { User, Code, Lightbulb, Rocket, Target, Eye } from "lucide-react";
import { Card } from "../../components/Card";
import { SectionHeader } from "../../components/SectionHeader";
import { PageTransition } from "../../components/PageTransition";
import { staggerContainer, staggerItem } from "../../utils/motionPresets";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const About: React.FC = () => {
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const highlights = [
    {
      text: "4+ YEARS",
      subtitle: "Building Production Experiences",
      accent: true,
    },
    {
      text: "FULL-STACK",
      subtitle: "From Product Strategy to Deployment",
      accent: false,
    },
    {
      text: "CREATIVE",
      subtitle: "Design-Led Engineering Mindset",
      accent: true,
    },
    {
      text: "IMPACT FOCUSED",
      subtitle: "Shipping Outcomes, Not Just Features",
      accent: false,
    },
  ];

  const skillBadges = [
    {
      icon: Code,
      text: "FULL-STACK\nDEVELOPER",
    },
    {
      icon: Lightbulb,
      text: "CREATIVE\nTHINKER",
    },
    {
      icon: Rocket,
      text: "FAST\nLEARNER",
    },
    {
      icon: Target,
      text: "GOAL\nORIENTED",
    },
  ];

  const internship = {
    company: "Ranga Technologies",
    role: "Software Engineer Intern",
    focus: "Frontend focus",
    duration: "Sep 2025 – Present · Frontend",
    description:
      "Building production-ready frontend systems with GenAI-assisted workflows while collaborating with cross-functional squads to elevate accessibility and performance standards.",
  };

  const techStack = [
    "REACT",
    "TYPESCRIPT",
    "NODE.JS",
    "PYTHON",
    "AWS",
    "MONGODB",
    "POSTGRESQL",
    "DOCKER",
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

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <SectionHeader
            title="About"
            subtitle="Building the Future"
            icon={<User className="w-6 h-6 text-[var(--primary)]" />}
          />
        </motion.div>

        {/* Main Grid Layout */}
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
              <Card>
                <div className="text-center space-y-4">
                  <div className="relative group mx-auto w-48 h-48">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-[var(--border)] border-2 border-[var(--border)]">
                      <img
                        src="/images/dp.jpg"
                        alt="Werosh Kriyanjala"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
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
            </motion.div>

            {/* Dynamic Highlight Card */}
            <motion.div variants={staggerItem}>
              <Card className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/20">
                <div className="relative h-32 flex items-center justify-center">
                  <div
                    className={`transform transition-all duration-500 text-center ${
                      isFlipping
                        ? "opacity-0 scale-95"
                        : "opacity-100 scale-100"
                    }`}
                  >
                    <div
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        highlights[currentHighlight].accent
                          ? "text-[var(--primary)]"
                          : "text-[var(--text)]"
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
              <Card>
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
                  <p className="text-[var(--text)]/80 leading-relaxed">
                    I'm Werosh Kriyanjala, a builder obsessed with pairing
                    ambitious ideas with thoughtful execution. Whether it's
                    orchestrating full-stack platforms or refining the
                    micro-interactions that users feel, I anchor every project
                    on clarity, craft, and measurable results.
                  </p>
                  <p className="text-[var(--text)]/80 leading-relaxed">
                    From leading web experiences at{" "}
                    <a
                      href="https://www.nextgenwebsites.info/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--primary)] underline decoration-dotted underline-offset-4 hover:bg-[var(--primary)]/10 px-1 transition-colors"
                    >
                      NextGen Websites
                    </a>{" "}
                    to architecting internal tooling, I collaborate with
                    founders, designers, and engineers to ship products that
                    feel seamless and perform under pressure.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Current Role - Internship */}
            <motion.div variants={staggerItem}>
              <Card className="bg-[var(--primary)]/5 border-[var(--primary)]/30">
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
                    <p className="text-sm text-[var(--text)]/70 leading-relaxed">
                      {internship.description}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={staggerItem}>
              <Card>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[var(--border)]">
                  <div className="w-10 h-10 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center">
                    <Code size={20} className="text-[var(--primary)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      Technology Stack
                    </h3>
                    <p className="text-xs text-[var(--text)]/60">
                      Core Technologies
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((item, index) => (
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
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom CTA - Action Bar */}
        <motion.div
          variants={staggerItem}
          className="pt-6 border-t-2 border-[var(--border)]"
        >
          <Card className="bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/5 to-[var(--primary)]/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--text)] mb-2">
                  Ready to build something{" "}
                  <span className="text-[var(--primary)]">remarkable?</span>
                </h3>
                <p className="text-[var(--text)]/70">
                  Let's collaborate and craft experiences that delight users
                  from first glance to final interaction.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/projects">
                  <motion.button
                    className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[var(--primary)] rounded-lg transition-all duration-300 hover:bg-[var(--hover)] shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye size={16} />
                    View Projects
                  </motion.button>
                </Link>
                <Link to="/contact">
                  <motion.button
                    className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--primary)] bg-transparent border-2 border-[var(--primary)] rounded-lg transition-all duration-300 hover:bg-[var(--primary)]/10"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Rocket size={16} />
                    Get In Touch
                  </motion.button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};
