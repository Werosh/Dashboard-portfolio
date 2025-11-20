import { motion } from 'framer-motion';
import { 
  FolderKanban, 
  ExternalLink, 
  Github, 
  Minus, 
  Maximize2, 
  X,
  Folder,
  FileCode,
  CheckCircle2,
  Clock,
  FolderOpen,
  Grid3x3,
  List,
  Search,
  Calendar,
  Tag
} from 'lucide-react';
import { PageTransition } from '../../components/PageTransition';
import { WindowModal } from '../../components/WindowModal';
import { useWindow } from '../../context/WindowContext';
import { staggerContainer, staggerItem } from '../../utils/motionPresets';
import { useState, useRef } from 'react';

export const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const { openWindow, closeWindow, isWindowOpen, getWindowOrigin } = useWindow();
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with modern UI and payment integration. Built with React, Node.js, and MongoDB. Features include product catalog, shopping cart, user authentication, payment processing, and admin dashboard. The platform is responsive, scalable, and optimized for performance.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe'],
      status: 'Completed',
      category: 'Web Application',
      date: '2024-01-15',
      github: 'https://github.com',
      demo: 'https://example.com',
      longDescription: 'A comprehensive e-commerce platform that provides a seamless shopping experience for users and powerful management tools for administrators.',
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Real-time analytics dashboard with data visualization and reporting.',
      tech: ['TypeScript', 'D3.js', 'Express'],
      status: 'In Progress',
      category: 'Data Visualization',
      date: '2024-03-20',
      github: 'https://github.com',
      demo: 'https://example.com',
      longDescription: 'Advanced analytics dashboard that provides real-time insights and customizable data visualizations for businesses.',
    },
    {
      id: 3,
      title: 'Mobile App',
      description: 'Cross-platform mobile application with native performance.',
      tech: ['React Native', 'Firebase'],
      status: 'Completed',
      category: 'Mobile Application',
      date: '2024-02-10',
      github: 'https://github.com',
      demo: 'https://example.com',
      longDescription: 'A high-performance mobile application built with React Native, delivering native-like performance across iOS and Android platforms.',
    },
    {
      id: 4,
      title: 'API Gateway',
      description: 'Microservices API gateway with authentication and rate limiting.',
      tech: ['Node.js', 'Redis', 'Docker'],
      status: 'Planning',
      category: 'Backend Service',
      date: '2024-04-01',
      github: 'https://github.com',
      demo: 'https://example.com',
      longDescription: 'Enterprise-grade API gateway that manages microservices communication, authentication, and rate limiting with high availability.',
    },
    {
      id: 5,
      title: 'UI Component Library',
      description: 'Reusable component library with comprehensive documentation.',
      tech: ['React', 'TypeScript', 'Storybook'],
      status: 'Completed',
      category: 'Design System',
      date: '2023-12-05',
      github: 'https://github.com',
      demo: 'https://example.com',
      longDescription: 'A comprehensive UI component library built with React and TypeScript, featuring Storybook documentation and accessibility support.',
    },
    {
      id: 6,
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud infrastructure setup with CI/CD pipelines.',
      tech: ['AWS', 'Docker', 'Kubernetes'],
      status: 'In Progress',
      category: 'DevOps',
      date: '2024-03-25',
      github: 'https://github.com',
      demo: 'https://example.com',
      longDescription: 'Infrastructure-as-code solution for deploying scalable applications on AWS with automated CI/CD pipelines and container orchestration.',
    },
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'In Progress':
        return <Clock className="w-4 h-4" />;
      case 'Planning':
        return <FolderOpen className="w-4 h-4" />;
      default:
        return <FileCode className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'In Progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Planning':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-[var(--text)]/20 text-[var(--text)] border-[var(--border)]';
    }
  };

  const handleProjectClick = (projectId: number) => {
    const ref = projectRefs.current[`project-${projectId}`];
    const rect = ref?.getBoundingClientRect() || null;
    openWindow(`project-${projectId}`, rect);
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
            <FolderKanban className="w-4 h-4 text-[var(--primary)]" />
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

  const ProjectWindow: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
    const windowId = `project-${project.id}`;
    const isOpen = isWindowOpen(windowId);

    return (
      <>
        <motion.div
          ref={(el) => (projectRefs.current[windowId] = el)}
          variants={staggerItem}
          className="h-full cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleProjectClick(project.id)}
        >
          <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg overflow-hidden h-full flex flex-col hover:border-[var(--primary)]/50 transition-all duration-300 group">
            {/* Window Header */}
            <div className="bg-[var(--bg)] border-b border-[var(--border)] px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--primary)]" />
                <span className="text-xs font-medium text-[var(--text)] truncate max-w-[150px]">
                  {project.title}
                </span>
              </div>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${getStatusColor(project.status)}`}>
                {getStatusIcon(project.status)}
              </div>
            </div>

            {/* Window Content */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <FileCode className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-1 truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--text)]/50 mb-2">{project.category}</p>
                </div>
              </div>

              <p className="text-sm text-[var(--text)]/70 mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-0.5 text-xs rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]/70"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-2 py-0.5 text-xs rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]/70">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--border)]">
                <motion.button
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded text-xs font-medium bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open
                </motion.button>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border border-[var(--border)] text-[var(--text)]/70 hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github className="w-3.5 h-3.5" />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Modal Window */}
        <WindowModal
          isOpen={isOpen}
          onClose={() => closeWindow(windowId)}
          title={project.title}
          icon={<FileCode className="w-4 h-4" />}
          windowId={windowId}
          originRect={getWindowOrigin(windowId)}
        >
          <div className="space-y-6">
            {/* Project Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-[var(--border)]">
              <div className="w-16 h-16 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center flex-shrink-0">
                <FileCode className="w-8 h-8 text-[var(--primary)]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-[var(--text)]">{project.title}</h2>
                  <div className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm border ${getStatusColor(project.status)}`}>
                    {getStatusIcon(project.status)}
                    <span>{project.status}</span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text)]/70 mb-3">{project.category}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--text)]/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Description</h3>
              <p className="text-[var(--text)]/80 leading-relaxed">{project.longDescription || project.description}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-[var(--primary)]" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:bg-[var(--hover)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
                View Demo
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] font-medium hover:border-[var(--primary)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-4 h-4" />
                View Code
              </motion.a>
            </div>
          </div>
        </WindowModal>
      </>
    );
  };

  return (
    <PageTransition>
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Main Window Container */}
        <Window title="Projects Explorer">
          {/* Toolbar */}
          <div className="mb-6 space-y-4">
            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text)]/50" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-[var(--bg)] border border-[var(--border)] rounded-lg text-[var(--text)] placeholder:text-[var(--text)]/50 focus:outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
              
              <div className="flex items-center gap-2 bg-[var(--bg)] border border-[var(--border)] rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                      : 'text-[var(--text)]/50 hover:text-[var(--text)]'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[var(--primary)]/20 text-[var(--primary)]'
                      : 'text-[var(--text)]/50 hover:text-[var(--text)]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text)]/70 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 py-2">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4" />
                <span>{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
              </div>
              <div className="h-4 w-px bg-[var(--border)]" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>{projects.filter(p => p.status === 'Completed').length} completed</span>
              </div>
              <div className="h-4 w-px bg-[var(--border)]" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>{projects.filter(p => p.status === 'In Progress').length} in progress</span>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-[var(--text)]/50">
              <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No projects found matching "{searchQuery}"</p>
            </div>
          ) : (
            <motion.div
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
              }
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <ProjectWindow key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          )}
        </Window>
      </div>
    </PageTransition>
  );
};
