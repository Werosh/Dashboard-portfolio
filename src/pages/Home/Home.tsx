import { motion } from "framer-motion";
import {
  Code,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Card } from "../../components/Card";
import { PageTransition } from "../../components/PageTransition";
import {
  staggerContainer,
  staggerItem,
  slideInLeft,
  slideInRight,
  fadeIn,
} from "../../utils/motionPresets";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const titles = [
    { text: "WEROSH KRIYANJALA", accent: true },
    { text: "SOFTWARE ENGINEER", accent: false },
    { text: "FULL-STACK DEVELOPER", accent: true },
    { text: "CONTENT CREATOR", accent: false },
  ];

  const stats = [
    {
      label: "Years",
      value: "4+",
      icon: TrendingUp,
      color: "text-[var(--primary)]",
    },
    {
      label: "Projects",
      value: "20+",
      icon: Code,
      color: "text-[var(--primary)]",
    },
    {
      label: "Clients",
      value: "30+",
      icon: Users,
      color: "text-[var(--primary)]",
    },
    {
      label: "Quality",
      value: "100%",
      icon: Award,
      color: "text-[var(--primary)]",
    },
  ];

  const techStack = ["REACT", "TYPESCRIPT", "NEXT.JS", "TAILWIND", "NODE.JS"];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/Werosh" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: Mail, label: "Email", href: "mailto:contact@example.com" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % titles.length);
        setIsAnimating(false);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <PageTransition>
      <div className="min-h-screen w-full">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Content */}
              <motion.div
                className="space-y-6 lg:space-y-8 order-2 lg:order-1"
                variants={slideInLeft}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  <motion.p
                    variants={staggerItem}
                    className="text-[var(--primary)] font-semibold text-sm md:text-base uppercase tracking-wider"
                  >
                    Portfolio
                  </motion.p>
                  <motion.h1
                    variants={staggerItem}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--text)] leading-tight"
                  >
                    <span className="block">HI, I'M</span>
                    <div className="relative inline-block w-full mt-2">
                      <span
                        className={`block transform transition-all duration-500 ${
                          isAnimating
                            ? "opacity-0 translate-y-8 scale-95"
                            : "opacity-100 translate-y-0 scale-100"
                        }`}
                      >
                        <span
                          className={`font-bold tracking-tight ${
                            titles[currentIndex].accent
                              ? "text-[var(--primary)]"
                              : "text-[var(--text)]"
                          }`}
                        >
                          {titles[currentIndex].text}
                        </span>
                      </span>
                    </div>
                  </motion.h1>
                  <motion.p
                    variants={staggerItem}
                    className="text-base sm:text-lg md:text-xl text-[var(--text)]/70 leading-relaxed max-w-xl"
                  >
                    I'm currently crafting sleek, modern web experiences as an
                    independent{" "}
                    <span className="text-[var(--primary)] font-semibold">
                      FULL-STACK DEVELOPER
                    </span>{" "}
                    — blending creativity and code from Sri Lanka to the world.
                  </motion.p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  variants={staggerItem}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Link to="/projects">
                    <motion.button
                      className="group flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--hover)] transition-colors w-full sm:w-auto justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View My Work
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                  <Link to="/contact">
                    <motion.button
                      className="flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-[var(--primary)]/10 transition-colors w-full sm:w-auto justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get In Touch
                    </motion.button>
                  </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  variants={staggerItem}
                  className="flex items-center gap-4 pt-4"
                >
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-colors"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Side - Developer GIF */}
              <motion.div
                className="order-1 lg:order-2 flex justify-center lg:justify-end"
                variants={slideInRight}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="relative w-full max-w-md lg:max-w-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/5 p-4 border border-[var(--primary)]/20">
                    <img
                      src="/images/Developer.gif"
                      alt="Developer"
                      className="w-full h-auto rounded-lg object-contain"
                    />
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div key={index} variants={staggerItem}>
                  <Card className="text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <stat.icon
                        className={`w-8 h-8 md:w-10 md:h-10 ${stat.color}`}
                      />
                      <div>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text)]">
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-[var(--text)]/70 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="pt-8 border-t-2 border-[var(--border)]">
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 text-xs md:text-sm font-semibold text-[var(--text)] bg-[var(--panel)] border-2 border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
