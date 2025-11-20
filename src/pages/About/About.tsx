import { motion } from 'framer-motion';
import { User, Code, Award, Briefcase } from 'lucide-react';
import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { PageTransition } from '../../components/PageTransition';
import { staggerContainer, staggerItem } from '../../utils/motionPresets';

export const About: React.FC = () => {
  const skills = [
    'TypeScript',
    'React',
    'Node.js',
    'Python',
    'Next.js',
    'Tailwind CSS',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'AWS',
    'GraphQL',
    'Figma',
  ];

  const experience = [
    {
      role: 'Senior Frontend Developer',
      company: 'Tech Corp',
      period: '2022 - Present',
      description: 'Leading frontend development and architecture decisions.',
    },
    {
      role: 'Full Stack Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      description: 'Built scalable web applications from scratch.',
    },
    {
      role: 'Junior Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      description: 'Developed client websites and web applications.',
    },
  ];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="Get to know more about my background and expertise"
          icon={<User className="w-6 h-6 text-[var(--primary)]" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <motion.div variants={staggerItem}>
              <Card>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-4">
                  Professional Summary
                </h3>
                <p className="text-[var(--text)]/80 leading-relaxed mb-4">
                  I'm a passionate full-stack developer with over 5 years of experience
                  building modern web applications. I specialize in creating scalable,
                  performant, and user-friendly solutions using cutting-edge technologies.
                </p>
                <p className="text-[var(--text)]/80 leading-relaxed">
                  My expertise spans from frontend frameworks to backend architecture,
                  with a strong focus on clean code, best practices, and continuous learning.
                </p>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={staggerItem}>
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-[var(--primary)]" />
                <h3 className="text-lg font-semibold text-[var(--text)]">Education</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-[var(--text)]">Computer Science</p>
                  <p className="text-sm text-[var(--text)]/70">University Name</p>
                  <p className="text-xs text-[var(--text)]/60">2015 - 2019</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={staggerItem} className="mb-8">
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-6 h-6 text-[var(--primary)]" />
              <h3 className="text-xl font-semibold text-[var(--text)]">Skills & Technologies</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)] text-[var(--primary)] font-medium hover-grow"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div variants={staggerItem}>
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-[var(--primary)]" />
              <h3 className="text-xl font-semibold text-[var(--text)]">Work Experience</h3>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 pb-6 border-b border-[var(--border)] last:border-0 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)] mt-2 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-[var(--text)] mb-1">{exp.role}</h4>
                    <p className="text-sm text-[var(--primary)] mb-1">{exp.company}</p>
                    <p className="text-xs text-[var(--text)]/60 mb-2">{exp.period}</p>
                    <p className="text-sm text-[var(--text)]/80">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </PageTransition>
  );
};

