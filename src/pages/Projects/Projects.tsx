import { motion } from 'framer-motion';
import { FolderKanban, ExternalLink, Github } from 'lucide-react';
import { Card } from '../../components/Card';
import { SectionHeader } from '../../components/SectionHeader';
import { PageTransition } from '../../components/PageTransition';
import { staggerContainer, staggerItem } from '../../utils/motionPresets';

export const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI and payment integration.',
      tech: ['React', 'Node.js', 'MongoDB'],
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Real-time analytics dashboard with data visualization and reporting.',
      tech: ['TypeScript', 'D3.js', 'Express'],
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Mobile App',
      description: 'Cross-platform mobile application with native performance.',
      tech: ['React Native', 'Firebase'],
      status: 'Completed',
    },
    {
      id: 4,
      title: 'API Gateway',
      description: 'Microservices API gateway with authentication and rate limiting.',
      tech: ['Node.js', 'Redis', 'Docker'],
      status: 'Planning',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-[var(--primary)]/20 text-[var(--primary)] border-[var(--primary)]';
      case 'In Progress':
        return 'bg-yellow-500/20 text-yellow-500 border-yellow-500';
      case 'Planning':
        return 'bg-blue-500/20 text-blue-500 border-blue-500';
      default:
        return 'bg-[var(--text)]/20 text-[var(--text)] border-[var(--border)]';
    }
  };

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Projects"
          subtitle="Explore my latest work and projects"
          icon={<FolderKanban className="w-6 h-6 text-[var(--primary)]" />}
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={staggerItem}>
              <Card>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center">
                    <FolderKanban className="w-6 h-6 text-[var(--primary)]" />
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text)] mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-[var(--text)]/70 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors hover-grow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-medium">View</span>
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)] transition-colors hover-grow"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-4 h-4" />
                  </motion.button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </PageTransition>
  );
};

