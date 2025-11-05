// config/experience.ts

export type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  location?: string;
  type?: "internship" | "full-time" | "part-time" | "contract";
  start: string; // e.g. "Jun 2024"
  end: string; // e.g. "Aug 2024" or "Present"
  description: string[];
  technologies?: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "swe-intern-xyz",
    role: "Software Engineering Intern",
    company: "XYZ Company",
    location: "Remote",
    type: "internship",
    start: "Jun 2024",
    end: "Aug 2024",
    description: [
      "Implemented full-stack features for an internal analytics dashboard using Next.js, Node.js, and PostgreSQL.",
      "Refactored API endpoints and database queries to reduce average dashboard load time by ~30%.",
      "Collaborated with a senior engineer on code reviews, improving test coverage and type safety across the codebase.",
      "Worked closely with a product manager to refine requirements and quickly ship small, high-impact improvements.",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    id: "tutor",
    role: "Computer Science Tutor",
    company: "University Name",
    location: "On-campus",
    type: "part-time",
    start: "Sep 2023",
    end: "May 2024",
    description: [
      "Tutored students in core CS topics including data structures, algorithms, and object-oriented programming.",
      "Led weekly review sessions for introductory CS courses, preparing slide decks and practice problems.",
      "Helped students debug programming assignments in Python and Java, emphasizing problem-solving strategies over copying solutions.",
      "Provided 1:1 guidance on studying for exams, whiteboard coding, and preparing for technical interviews.",
    ],
    technologies: ["Python", "Java", "Data Structures", "Algorithms"],
  },
  {
    id: "swe-intern-abc",
    role: "Software Engineering Intern",
    company: "ABC Startup",
    location: "Hybrid",
    type: "internship",
    start: "May 2023",
    end: "Aug 2023",
    description: [
      "Built and maintained features for a customer-facing web app, focusing on clean UI and responsive layouts.",
      "Integrated third-party APIs to support login, payments, and email notifications.",
      "Instrumented basic logging and monitoring to help the team understand user behavior and track errors in production.",
      "Worked in an agile environment, participating in daily stand-ups, sprint planning, and demoing completed work to the team.",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
    ],
  },
];
