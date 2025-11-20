import { motion } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Calendar,
  MapPin,
  Building2,
  ExternalLink,
  Star,
  Minus,
  Maximize2,
  X,
} from "lucide-react";
import { Card } from "../../components/Card";
import { PageTransition } from "../../components/PageTransition";
import { SectionHeader } from "../../components/SectionHeader";
import { WindowModal } from "../../components/WindowModal";
import { useWindow } from "../../context/WindowContext";
import {
  staggerContainer,
  staggerItem,
  fadeIn,
} from "../../utils/motionPresets";
import { useRef } from "react";

interface TimelineEntry {
  id: string;
  type: "education" | "experience";
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  isCurrent?: boolean;
  website?: string;
  linkedin?: string;
  skills?: string[];
  achievements?: string[];
}

// Raw experience data
const experienceData = {
  education: {
    title: "EDUCATION",
    icon: GraduationCap,
    items: [
      {
        id: "edu-1",
        title: "SOFTWARE ENGINEERING",
        subtitle: "University of Moratuwa",
        period: "2023 - Present",
        location: "Moratuwa, Sri Lanka",
        description:
          "Specializing in full-stack development, algorithms, and software architecture. Maintaining excellent academic performance with focus on modern development practices.",
        skills: [
          "Data Structures",
          "Algorithms",
          "Software Architecture",
          "Database Design",
          "Web Development",
        ],
        achievements: [
          "Dean's List 2023",
          "Top 10% of Class",
          "Outstanding Project Award",
        ],
        level: "primary",
      },
      {
        id: "edu-2",
        title: "ADVANCED LEVEL",
        subtitle: "Technology Stream",
        period: "2022 - 2023",
        location: "Sri Lanka",
        description:
          "Specialized in Engineering Technology, Science for Technology, and Information & Communication Technology with excellent academic performance. Strengthened technical, analytical, and practical problem-solving abilities.",
        skills: [
          "Engineering Technology",
          "Science for Technology",
          "Information & Communication Technology",
          "Technical Problem Solving",
          "Analytical Thinking",
        ],
        achievements: [
          "3C Passes",
          "District Rank Top 347",
          "Best Performance in Engineering Technology",
        ],
        level: "secondary",
      },
    ],
  },
  work: {
    title: "WORK EXPERIENCE",
    icon: Briefcase,
    items: [
      {
        id: "work-3",
        title: "SOFTWARE ENGINEER INTERN",
        subtitle: "Ranga Technologies",
        period: "Sep 2025 - Present · Frontend",
        location: "Hybrid · Sri Lanka & Remote",
        website: "https://www.rangatechnologies.com/",
        linkedin:
          "https://www.linkedin.com/company/rangatechnologies/posts/?feedView=all",
        description:
          "Delivering polished, high-performing frontend experiences for customer-facing platforms. Focused on accessible UI systems, rapid iteration with cross-functional squads, and infusing GenAI-enhanced workflows into production-ready codebases.",
        skills: [
          "React",
          "TypeScript",
          "Design Systems",
          "Accessibility",
          "Frontend Performance",
          "AI-assisted Development",
        ],
        achievements: [
          "Modernizing the shared component library to boost delivery velocity",
          "Driving measurable gains in interaction latency and Lighthouse metrics",
          "Championing UI polish standards through code reviews and paired sessions",
        ],
        level: "primary",
      },
      {
        id: "work-2",
        title: "HEAD WEB DEVELOPER",
        subtitle: "NextGen Websites",
        period: "2023 - Present",
        location: "Australia (Remote)",
        website: "https://www.nextgenwebsites.info/",
        description:
          "Leading web development projects, architecting scalable solutions, and mentoring junior developers. Responsible for full project lifecycle management.",
        skills: [
          "React",
          "Node.js",
          "AWS",
          "Team Leadership",
          "Project Management",
          "TypeScript",
        ],
        achievements: [
          "30+ Projects Delivered",
          "Team of 5 Developers",
          "100% Client Satisfaction",
          "Performance Award 2024",
        ],
        level: "primary",
      },
      {
        id: "work-1",
        title: "SENIOR WEB DEVELOPER",
        subtitle: "Nebula Arcs",
        period: "2024 - 2025",
        location: "Sri Lanka (Remote & On-site)",
        website: "https://nebulaarcs.com",
        description:
          "Spearheaded high-performance web development projects, delivering innovative, user-centric digital solutions. Collaborated closely with designers and clients to translate visions into scalable, optimized products. Oversaw end-to-end project execution while ensuring top-tier code quality and performance.",
        skills: [
          "React",
          "Next.js",
          "Tailwind CSS",
          "TypeScript",
          "UI/UX Implementation",
          "Project Leadership",
        ],
        achievements: [
          "15+ High-Impact Projects Delivered",
          "Improved Page Load Speeds by 40%",
          "Maintained 100% Client Retention Rate",
          "Introduced AI-Driven Development Workflows",
        ],
        level: "primary",
      },
      {
        id: "work-4",
        title: "FRONTEND DEVELOPER",
        subtitle: "Freelance Projects",
        period: "2022 - Present",
        location: "Remote",
        description:
          "Developed responsive web applications for various clients across different industries. Focused on creating exceptional user experiences.",
        skills: [
          "React",
          "TypeScript",
          "CSS",
          "JavaScript",
          "Responsive Design",
          "UI/UX",
        ],
        achievements: [
          "15+ Successful Projects",
          "5-Star Client Ratings",
          "Repeat Client Rate 80%",
        ],
        level: "secondary",
      },
    ],
  },
};

// Helper function to parse period string to dates
const parsePeriod = (
  period: string
): { startDate: string; endDate: string; isCurrent: boolean } => {
  const isCurrent = period.toLowerCase().includes("present");

  // Handle formats like "2023 - Present", "2024 - 2025", "Sep 2025 - Present"
  const parts = period.split("-").map((p) => p.trim());

  if (parts.length === 2) {
    let startStr = parts[0];
    let endStr = parts[1];

    // Parse start date
    let startDate = "";
    if (startStr.match(/^\d{4}$/)) {
      // Just year like "2023"
      startDate = `${startStr}-01`;
    } else if (startStr.match(/^[A-Za-z]{3} \d{4}$/)) {
      // Month year like "Sep 2025"
      const [month, year] = startStr.split(" ");
      const monthMap: { [key: string]: string } = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12",
      };
      startDate = `${year}-${monthMap[month] || "01"}`;
    } else {
      startDate = `${startStr}-01`;
    }

    // Parse end date
    let endDate = "";
    if (isCurrent || endStr.toLowerCase() === "present") {
      endDate = "";
    } else if (endStr.match(/^\d{4}$/)) {
      endDate = `${endStr}-12`;
    } else {
      endDate = "";
    }

    return { startDate, endDate, isCurrent };
  }

  return { startDate: "", endDate: "", isCurrent: false };
};

// Transform experience data to timeline format
const transformToTimelineData = (): TimelineEntry[] => {
  const timelineEntries: TimelineEntry[] = [];

  // Transform education items
  experienceData.education.items.forEach((item) => {
    const { startDate, endDate, isCurrent } = parsePeriod(item.period);
    timelineEntries.push({
      id: item.id,
      type: "education",
      title: item.title,
      organization: item.subtitle,
      location: item.location,
      startDate,
      endDate,
      description: item.description,
      isCurrent,
      skills: item.skills,
      achievements: item.achievements,
    });
  });

  // Transform work experience items
  experienceData.work.items.forEach((item) => {
    const { startDate, endDate, isCurrent } = parsePeriod(item.period);
    timelineEntries.push({
      id: item.id,
      type: "experience",
      title: item.title,
      organization: item.subtitle,
      location: item.location,
      startDate,
      endDate,
      description: item.description,
      isCurrent,
      website: item.website,
      linkedin: item.linkedin,
      skills: item.skills,
      achievements: item.achievements,
    });
  });

  return timelineEntries;
};

const timelineData = transformToTimelineData();

export const Timeline: React.FC = () => {
  const { openWindow, closeWindow, isWindowOpen, getWindowOrigin } = useWindow();
  const entryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Keep entries in their original order (no sorting)
  const educationEntries = timelineData.filter((e) => e.type === "education");
  const experienceEntries = timelineData.filter((e) => e.type === "experience");

  const formatDate = (dateString: string) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const handleEntryClick = (entryId: string) => {
    const ref = entryRefs.current[entryId];
    const rect = ref?.getBoundingClientRect() || null;
    openWindow(entryId, rect);
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
            <Calendar className="w-4 h-4 text-[var(--primary)]" />
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
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Main Window Container */}
        <Window title="Timeline - Education & Experience">
          {/* Header Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-[var(--primary)]" />
              <div>
                <h1 className="text-2xl font-bold text-[var(--text)]">Timeline</h1>
                <p className="text-sm text-[var(--text)]/70">Education & Experience</p>
              </div>
            </div>
          </motion.div>

        {/* Timeline Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experience Timeline */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text)]">
                Experience
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/50 to-[var(--border)]" />

              <div className="space-y-6">
                {experienceEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    variants={staggerItem}
                    initial="hidden"
                    animate="visible"
                    className="relative pl-14"
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className="absolute left-4 top-2 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-[var(--panel)] z-10 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                    />

                    {/* Entry Card - OS Style Window */}
                    <div
                      ref={(el) => (entryRefs.current[entry.id] = el)}
                      onClick={() => handleEntryClick(entry.id)}
                      className="cursor-pointer"
                    >
                      <Card className="hover:border-[var(--primary)]/50 transition-all group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                                {entry.title}
                              </h3>
                              {entry.isCurrent && (
                                <span className="px-2 py-1 bg-[var(--primary)] text-white text-xs font-bold uppercase rounded animate-pulse">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[var(--primary)] font-semibold mb-3">
                              <Building2 className="w-4 h-4" />
                              {entry.organization}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text)]/60 mb-3">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {entry.location}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(entry.startDate)} -{" "}
                                {formatDate(entry.endDate)}
                              </div>
                            </div>
                            <p className="text-sm text-[var(--text)]/80 leading-relaxed mb-3 line-clamp-3">
                              {entry.description}
                            </p>

                            {/* Links */}
                            {(entry.website || entry.linkedin) && (
                              <div className="flex flex-wrap gap-3 mb-3">
                                {entry.website && (
                                  <a
                                    href={entry.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)] hover:text-[var(--hover)] font-medium underline underline-offset-4 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    Website
                                  </a>
                                )}
                                {entry.linkedin && (
                                  <a
                                    href={entry.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-[var(--primary)] hover:text-[var(--hover)] font-medium underline underline-offset-4 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    LinkedIn
                                  </a>
                                )}
                              </div>
                            )}

                            {/* Skills */}
                            {entry.skills && entry.skills.length > 0 && (
                              <div className="mb-3">
                                <h4 className="text-xs font-semibold text-[var(--text)]/70 mb-2 uppercase tracking-wider">
                                  Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {entry.skills.slice(0, 3).map((skill, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 text-xs font-medium bg-[var(--bg)] border border-[var(--border)] rounded text-[var(--text)]/80"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                  {entry.skills.length > 3 && (
                                    <span className="px-2 py-1 text-xs font-medium bg-[var(--bg)] border border-[var(--border)] rounded text-[var(--text)]/80">
                                      +{entry.skills.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Achievements */}
                            {entry.achievements &&
                              entry.achievements.length > 0 && (
                                <div>
                                  <h4 className="text-xs font-semibold text-[var(--text)]/70 mb-2 uppercase tracking-wider">
                                    Achievements
                                  </h4>
                                  <div className="space-y-1">
                                    {entry.achievements.slice(0, 2).map(
                                      (achievement, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-start gap-2 text-xs text-[var(--text)]/70"
                                        >
                                          <Star className="w-3 h-3 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                                          <span>{achievement}</span>
                                        </div>
                                      )
                                    )}
                                    {entry.achievements.length > 2 && (
                                      <div className="text-xs text-[var(--text)]/50 italic">
                                        +{entry.achievements.length - 2} more
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                ))}
                {experienceEntries.length === 0 && (
                  <div className="pl-14 text-center py-12 text-[var(--text)]/50">
                    <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No experience entries to display.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
              </div>
              <h2 className="text-2xl font-bold text-[var(--text)]">
                Education
              </h2>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] via-[var(--primary)]/50 to-[var(--border)]" />

              <div className="space-y-6">
                {educationEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    variants={staggerItem}
                    initial="hidden"
                    animate="visible"
                    className="relative pl-14"
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className="absolute left-4 top-2 w-4 h-4 rounded-full bg-[var(--primary)] border-4 border-[var(--panel)] z-10 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                    />

                    {/* Entry Card - OS Style Window */}
                    <div
                      ref={(el) => (entryRefs.current[entry.id] = el)}
                      onClick={() => handleEntryClick(entry.id)}
                      className="cursor-pointer"
                    >
                      <Card className="hover:border-[var(--primary)]/50 transition-all group">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl font-bold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                                {entry.title}
                              </h3>
                              {entry.isCurrent && (
                                <span className="px-2 py-1 bg-[var(--primary)] text-white text-xs font-bold uppercase rounded animate-pulse">
                                  Current
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[var(--primary)] font-semibold mb-3">
                              <Building2 className="w-4 h-4" />
                              {entry.organization}
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--text)]/60 mb-3">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {entry.location}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {formatDate(entry.startDate)} -{" "}
                                {formatDate(entry.endDate)}
                              </div>
                            </div>
                            <p className="text-sm text-[var(--text)]/80 leading-relaxed mb-3 line-clamp-3">
                              {entry.description}
                            </p>

                            {/* Skills */}
                          {entry.skills && entry.skills.length > 0 && (
                            <div className="mb-3">
                              <h4 className="text-xs font-semibold text-[var(--text)]/70 mb-2 uppercase tracking-wider">
                                Skills
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {entry.skills.map((skill, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 text-xs font-medium bg-[var(--bg)] border border-[var(--border)] rounded text-[var(--text)]/80"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Achievements */}
                          {entry.achievements &&
                            entry.achievements.length > 0 && (
                              <div>
                                <h4 className="text-xs font-semibold text-[var(--text)]/70 mb-2 uppercase tracking-wider">
                                  Achievements
                                </h4>
                                <div className="space-y-1">
                                  {entry.achievements.map(
                                    (achievement, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-start gap-2 text-xs text-[var(--text)]/70"
                                      >
                                        <Star className="w-3 h-3 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                                        <span>{achievement}</span>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                ))}
                {educationEntries.length === 0 && (
                  <div className="pl-14 text-center py-12 text-[var(--text)]/50">
                    <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No education entries to display.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        </Window>

        {/* Timeline Entry Modals */}
        {timelineData.map((entry) => {
          const isOpen = isWindowOpen(entry.id);
          const Icon = entry.type === "education" ? GraduationCap : Briefcase;

          return (
            <WindowModal
              key={entry.id}
              isOpen={isOpen}
              onClose={() => closeWindow(entry.id)}
              title={entry.title}
              icon={<Icon className="w-4 h-4" />}
              windowId={entry.id}
              originRect={getWindowOrigin(entry.id)}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4 pb-4 border-b border-[var(--border)]">
                  <div className="w-16 h-16 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-[var(--primary)]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-[var(--text)]">{entry.title}</h2>
                      {entry.isCurrent && (
                        <span className="px-3 py-1 bg-[var(--primary)] text-white text-xs font-bold uppercase rounded animate-pulse">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-lg text-[var(--primary)] font-semibold mb-3">
                      <Building2 className="w-5 h-5" />
                      {entry.organization}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text)]/60">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {entry.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {formatDate(entry.startDate)} - {formatDate(entry.endDate)}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Description</h3>
                  <p className="text-[var(--text)]/80 leading-relaxed">{entry.description}</p>
                </div>

                {entry.website && (
                  <div className="pt-4 border-t border-[var(--border)]">
                    <a
                      href={entry.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--hover)] font-medium underline underline-offset-4 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Visit Website
                    </a>
                  </div>
                )}

                {entry.skills && entry.skills.length > 0 && (
                  <div className="pt-4 border-t border-[var(--border)]">
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {entry.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)]/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {entry.achievements && entry.achievements.length > 0 && (
                  <div className="pt-4 border-t border-[var(--border)]">
                    <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Achievements</h3>
                    <div className="space-y-2">
                      {entry.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-[var(--text)]/80">
                          <Star className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </WindowModal>
          );
        })}
      </div>
    </PageTransition>
  );
};
