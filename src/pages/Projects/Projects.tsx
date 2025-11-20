import { motion } from "framer-motion";
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
  Tag,
  Users,
  LayoutTemplate,
} from "lucide-react";
import { PageTransition } from "../../components/PageTransition";
import { WindowModal } from "../../components/WindowModal";
import { useWindow } from "../../context/WindowContext";
import { staggerContainer, staggerItem } from "../../utils/motionPresets";
import { useState, useRef } from "react";

// Project Images - Using public folder paths
const YummyImg = "/images/projects/yummy.webp";
const NebulaImg = "/images/projects/nebula.webp";
const NextGImg = "/images/projects/nextg.webp";
const SPCImg = "/images/projects/spc.webp";
const ExlImg = "/images/projects/exl.webp";
const StudyMateImg = "/images/projects/studymate.webp";
const BusMateImg = "/images/projects/busmate.webp";
const AIWriteCheckerImg = "/images/projects/aiwrite.webp";
const GardImg = "/images/projects/gardningtemp.webp";
const jobportal = "/images/projects/jobportal.webp";
const aquaImg = "/images/projects/aqua.webp";
const LSMImg = "/images/projects/lsm.webp";
const salonIMg = "/images/projects/ims.webp";
const AlphaIMg = "/images/projects/alpha.webp";
const sentryIMg = "/images/projects/sentry.webp";
const libryIMg = "/images/projects/libry.webp";
const bluhIMg = "/images/projects/bluhdev.webp";
const herbIMg = "/images/projects/herb.webp";

export const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | "CLIENT PROJECT" | "TEMPLATE PROJECT"
  >("all");
  const { openWindow, closeWindow, isWindowOpen, getWindowOrigin } =
    useWindow();
  const projectRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const projects = [
    // Client Projects
    {
      id: 1,
      title: "YUMMY YAKO",
      description:
        "A dessert food truck website highlighting delicious treats, menu browsing, and an engaging user experience with smooth animations.",
      tech: ["REACTJS", "TAILWIND CSS", "FRAMER MOTION"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-11-15",
      github: "https://github.com",
      demo: "https://yummyyako.netlify.app/",
      longDescription:
        "A dessert food truck website highlighting delicious treats, menu browsing, and an engaging user experience with smooth animations.",
      image: YummyImg,
    },
    {
      id: 2,
      title: "NEBULA ARCS",
      description:
        "A creative digital agency website offering services in web development, SEO, digital marketing, AI video production, and more.",
      tech: ["REACTJS", "NEXTJS", "TAILWIND CSS", "FRAMER MOTION"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-12-01",
      github: "https://github.com",
      demo: "https://nebulaarcs.com/",
      longDescription:
        "A creative digital agency website offering services in web development, SEO, digital marketing, AI video production, and more.",
      stats: { views: "3.2K", users: "1.1K", rating: "4.9" },
      image: NebulaImg,
    },
    {
      id: 3,
      title: "NEXTGEN WEBSITES",
      description:
        "Affordable and professional web development services for businesses worldwide",
      tech: ["REACTJS", "TAILWIND"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-10-20",
      github: "https://github.com",
      demo: "https://www.nextgenwebsites.info/",
      longDescription:
        "Affordable and professional web development services for businesses worldwide",
      image: NextGImg,
    },
    {
      id: 4,
      title: "SPARKLING CAR CARE",
      description:
        "Professional car cleaning and detailing services in Artarmon, NSW",
      tech: ["REACTJS", "TAILWIND"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-11-10",
      github: "https://github.com",
      demo: "https://www.sparklingcarcare.com.au/",
      longDescription:
        "Professional car cleaning and detailing services in Artarmon, NSW",
      stats: { views: "1.8K", users: "420", rating: "4.9" },
      image: SPCImg,
    },
    {
      id: 5,
      title: "EXL EDUCATION",
      description:
        "An educational platform providing curated learning resources, tutorials, and academic support for students across Australia.",
      tech: ["REACTJS", "TAILWIND CSS"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-09-25",
      github: "https://github.com",
      demo: "https://exleducation.netlify.app/",
      longDescription:
        "An educational platform providing curated learning resources, tutorials, and academic support for students across Australia.",
      stats: { views: "1.9K", users: "600", rating: "4.7" },
      image: ExlImg,
    },
    {
      id: 6,
      title: "STUDY MATE",
      description:
        "A smart task management platform built for students to organize assignments, lectures, and exams with real-time syncing via Firebase.",
      tech: ["REACTJS", "TAILWIND CSS", "FIREBASE", "FRAMER MOTION"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-08-15",
      github: "https://github.com",
      demo: "https://smtaskmanager.netlify.app/",
      longDescription:
        "A smart task management platform built for students to organize assignments, lectures, and exams with real-time syncing via Firebase.",
      image: StudyMateImg,
    },
    {
      id: 7,
      title: "BUSMATE LK",
      description:
        "Real-time web application helping Sri Lankan commuters plan efficient bus routes and track availability",
      tech: ["REACTJS", "FIREBASE", "FRAMER MOTION", "TAILWIND CSS"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-07-20",
      github: "https://github.com",
      demo: "https://busmatelk.netlify.app/",
      longDescription:
        "Real-time web application helping Sri Lankan commuters plan efficient bus routes and track availability",
      image: BusMateImg,
    },
    {
      id: 8,
      title: "AI WRITE CHECKER",
      description:
        "Free and reliable AI content detection tool to verify authenticity of written text",
      tech: ["REACTJS", "FIREBASE", "AI API"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-06-10",
      github: "https://github.com",
      demo: "https://aiwritechecker.netlify.app/",
      longDescription:
        "Free and reliable AI content detection tool to verify authenticity of written text",
      image: AIWriteCheckerImg,
    },
    {
      id: 9,
      title: "GARDENIN TEMPLATE",
      description:
        "A beautifully designed and responsive gardening website template for landscapers and garden service providers",
      tech: ["REACTJS", "TAILWIND"],
      status: "Completed",
      category: "CLIENT PROJECT",
      date: "2024-05-15",
      github: "https://github.com",
      demo: "https://gardenintemplate.netlify.app/",
      longDescription:
        "A beautifully designed and responsive gardening website template for landscapers and garden service providers",
      image: GardImg,
    },
    // Template Projects
    {
      id: 10,
      title: "JOB PORTAL DESIGN",
      description:
        "Advanced job portal with sophisticated UI/UX implementations and modern design patterns",
      tech: ["REACT", "NODE.JS", "MONGODB", "EXPRESS"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2024-04-20",
      github: "https://github.com",
      demo: "https://jobportaltest.netlify.app/",
      longDescription:
        "Advanced job portal with sophisticated UI/UX implementations and modern design patterns",
      image: jobportal,
    },
    {
      id: 11,
      title: "SANDARU AQUA",
      description:
        "Advanced water purification solutions with innovative design and maintenance services",
      tech: ["REACT", "NODE.JS", "FIREBASE"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2024-03-25",
      github: "https://github.com",
      demo: "https://sandaruaqua.netlify.app/",
      longDescription:
        "Advanced water purification solutions with innovative design and maintenance services",
      image: aquaImg,
    },
    {
      id: 12,
      title: "LASSANA MOMENTS",
      description:
        "Full-Stack ongoing group project as Head Front-End Developer",
      tech: ["REACT", "NODE.JS", "FIREBASE"],
      status: "In Progress",
      category: "TEMPLATE PROJECT",
      date: "2024-02-15",
      github: "https://github.com",
      demo: "https://lassanamomentz.netlify.app/",
      longDescription:
        "Full-Stack ongoing group project as Head Front-End Developer",
      image: LSMImg,
    },
    {
      id: 13,
      title: "Salon IMS",
      description:
        "Salon Inventory Management System simplifies and optimizes inventory management for salon operations.",
      tech: ["C#", "MySQL"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2024-01-10",
      github:
        "https://github.com/Werosh/Salon-Inventory-System-Uni-Assinment.git",
      demo: "https://github.com/Werosh/Salon-Inventory-System-Uni-Assinment.git",
      longDescription:
        "Salon Inventory Management System simplifies and optimizes inventory management for salon operations.",
      image: salonIMg,
    },
    {
      id: 14,
      title: "ALPHAWIZARDS PORTFOLIO",
      description:
        "Personal portfolio platform with advanced UI/UX implementations",
      tech: ["REACT", "NODE.JS", "MONGODB"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2023-12-05",
      github: "https://github.com",
      demo: "https://thealphawizards.netlify.app/",
      longDescription:
        "Personal portfolio platform with advanced UI/UX implementations",
      image: AlphaIMg,
    },
    {
      id: 15,
      title: "SERENITY HOTEL",
      description:
        "Hotel booking platform offering seamless reservations and availability checking",
      tech: ["REACT", "NODE.JS"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2023-11-20",
      github: "https://github.com",
      demo: "https://hotelsentry.netlify.app/",
      longDescription:
        "Hotel booking platform offering seamless reservations and availability checking",
      image: sentryIMg,
    },
    {
      id: 16,
      title: "BUY BOOK ANYWHERE",
      description:
        "Advanced library search engine with intelligent recommendations",
      tech: ["PYTHON", "TENSORFLOW", "AWS"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2023-10-15",
      github: "https://github.com",
      demo: "https://demolibry.netlify.app/",
      longDescription:
        "Advanced library search engine with intelligent recommendations",
      image: libryIMg,
    },
    {
      id: 17,
      title: "GROUP PORTFOLIO",
      description:
        "Collaborative portfolio platform with advanced UI/UX implementations",
      tech: ["REACT", "NODE.JS", "MONGODB"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2023-09-10",
      github: "https://github.com",
      demo: "https://bluhbluhdev.netlify.app/",
      longDescription:
        "Collaborative portfolio platform with advanced UI/UX implementations",
      image: bluhIMg,
    },
    {
      id: 18,
      title: "HERBAL HAVEN",
      description:
        "Premium herbal products and remedies designed to enhance well-being",
      tech: ["VUE.JS", "FIREBASE"],
      status: "Completed",
      category: "TEMPLATE PROJECT",
      date: "2023-08-25",
      github: "https://github.com",
      demo: "https://hebalhaven.netlify.app/",
      longDescription:
        "Premium herbal products and remedies designed to enhance well-being",
      image: herbIMg,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tech.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeCategory === "all" || project.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "In Progress":
        return <Clock className="w-4 h-4" />;
      case "Planning":
        return <FolderOpen className="w-4 h-4" />;
      default:
        return <FileCode className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Planning":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-[var(--text)]/20 text-[var(--text)] border-[var(--border)]";
    }
  };

  const handleProjectClick = (projectId: number) => {
    const ref = projectRefs.current[`project-${projectId}`];
    // Always open modal in center on mobile, use origin on desktop
    const isMobile = window.innerWidth < 768;
    const rect = isMobile ? null : ref?.getBoundingClientRect() || null;
    openWindow(`project-${projectId}`, rect);
  };

  const Window: React.FC<{
    title: string;
    children: React.ReactNode;
    className?: string;
  }> = ({ title, children, className = "" }) => (
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
            <span className="text-sm font-medium text-[var(--text)]">
              {title}
            </span>
          </div>
        </div>
      </div>

      {/* Window Content */}
      <div className="p-3 sm:p-4 lg:p-6">{children}</div>
    </motion.div>
  );

  const ProjectWindow: React.FC<{
    project: (typeof projects)[0];
    index: number;
  }> = ({ project, index }) => {
    const windowId = `project-${project.id}`;
    const isOpen = isWindowOpen(windowId);

    return (
      <>
        <motion.div
          ref={(el) => {
            projectRefs.current[windowId] = el;
          }}
          variants={staggerItem}
          className="h-full cursor-pointer"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => handleProjectClick(project.id)}
        >
          <div className="bg-[var(--panel)] border border-[var(--border)] rounded-lg overflow-hidden h-full flex flex-col hover:border-[var(--primary)]/50 transition-all duration-300 group">
            {/* Project Image */}
            {project.image && (
              <div className="relative w-full h-32 sm:h-40 overflow-hidden bg-[var(--bg)]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    // Hide image if it fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}

            {/* Window Header */}
            <div className="bg-[var(--bg)] border-b border-[var(--border)] px-2 sm:px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[var(--primary)] flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--text)] truncate">
                  {project.title}
                </span>
              </div>
              <div
                className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-xs border flex-shrink-0 ${getStatusColor(
                  project.status
                )}`}
              >
                {getStatusIcon(project.status)}
              </div>
            </div>

            {/* Window Content */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col">
              <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--primary)]/20 transition-colors">
                  <FileCode className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-[var(--text)] mb-1 truncate">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--text)]/50 mb-2 truncate">
                    {project.category}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--text)]/70 mb-3 sm:mb-4 line-clamp-3 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                {project.tech.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-1.5 sm:px-2 py-0.5 text-xs rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]/70"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-1.5 sm:px-2 py-0.5 text-xs rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]/70">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 mt-auto pt-2 sm:pt-3 border-t border-[var(--border)]">
                <motion.button
                  className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs font-medium bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectClick(project.id);
                  }}
                >
                  <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Open</span>
                </motion.button>
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded border border-[var(--border)] text-[var(--text)]/70 hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View on GitHub"
                >
                  <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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
          <div className="space-y-4 sm:space-y-6">
            {/* Project Image */}
            {project.image && (
              <div className="relative w-full h-48 sm:h-64 lg:h-80 rounded-lg overflow-hidden bg-[var(--bg)] border border-[var(--border)]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Hide image if it fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Project Header */}
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[var(--border)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center flex-shrink-0">
                <FileCode className="w-6 h-6 sm:w-8 sm:h-8 text-[var(--primary)]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--text)] truncate">
                    {project.title}
                  </h2>
                  <div
                    className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm border flex-shrink-0 ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {getStatusIcon(project.status)}
                    <span>{project.status}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text)]/70 mb-2 sm:mb-3">
                  {project.category}
                </p>
                <div className="flex items-center gap-3 sm:gap-4 text-xs text-[var(--text)]/60">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>
                      {new Date(project.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text)] mb-2 sm:mb-3">
                Description
              </h3>
              <p className="text-sm sm:text-base text-[var(--text)]/80 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--text)] mb-2 sm:mb-3 flex items-center gap-2">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--primary)]" />
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] hover:border-[var(--primary)]/50 hover:text-[var(--primary)] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-[var(--border)]">
              <motion.a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[var(--primary)] text-white text-sm sm:text-base font-medium hover:bg-[var(--hover)] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ExternalLink className="w-4 h-4" />
                View Demo
              </motion.a>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-[var(--panel)] border border-[var(--border)] text-[var(--text)] text-sm sm:text-base font-medium hover:border-[var(--primary)] transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
      <div className="max-w-[1400px] mx-auto space-y-4 sm:space-y-6 px-2 sm:px-4 lg:px-6">
        {/* Main Window Container */}
        <Window title="Projects Explorer">
          {/* Toolbar */}
          <div className="mb-6 space-y-4">
            {/* Category Filter Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`group inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 rounded-lg ${
                    activeCategory === "all"
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-[var(--bg)] text-[var(--text)] border-[var(--border)] hover:border-[var(--primary)]"
                  }`}
                >
                  <FolderKanban className="w-4 h-4" />
                  ALL PROJECTS
                </button>
                <button
                  onClick={() => setActiveCategory("CLIENT PROJECT")}
                  className={`group inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 rounded-lg ${
                    activeCategory === "CLIENT PROJECT"
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-[var(--bg)] text-[var(--text)] border-[var(--border)] hover:border-[var(--primary)]"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  CLIENT PROJECTS
                </button>
                <button
                  onClick={() => setActiveCategory("TEMPLATE PROJECT")}
                  className={`group inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 rounded-lg ${
                    activeCategory === "TEMPLATE PROJECT"
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "bg-[var(--bg)] text-[var(--text)] border-[var(--border)] hover:border-[var(--primary)]"
                  }`}
                >
                  <LayoutTemplate className="w-4 h-4" />
                  MY PROJECTS
                </button>
              </div>
            </div>

            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div className="relative flex-1 w-full sm:max-w-md">
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
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "grid"
                      ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                      : "text-[var(--text)]/50 hover:text-[var(--text)]"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "list"
                      ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                      : "text-[var(--text)]/50 hover:text-[var(--text)]"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status Bar */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-[var(--text)]/70 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-3 sm:px-4 py-2">
              <div className="flex items-center gap-2">
                <Folder className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>
                  {filteredProjects.length} project
                  {filteredProjects.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                <span>
                  {
                    filteredProjects.filter((p) => p.status === "Completed")
                      .length
                  }{" "}
                  completed
                </span>
              </div>
              <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                <span>
                  {
                    filteredProjects.filter((p) => p.status === "In Progress")
                      .length
                  }{" "}
                  in progress
                </span>
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-8 sm:py-12 text-[var(--text)]/50">
              <FolderKanban className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm sm:text-base">
                {searchQuery
                  ? `No projects found matching "${searchQuery}"`
                  : activeCategory !== "all"
                  ? `No ${
                      activeCategory === "CLIENT PROJECT"
                        ? "client"
                        : "template"
                    } projects found`
                  : "No projects found"}
              </p>
            </div>
          ) : (
            <motion.div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                  : "space-y-3"
              }
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredProjects.map((project, index) => (
                <ProjectWindow
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          )}
        </Window>
      </div>
    </PageTransition>
  );
};
