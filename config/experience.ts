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
    id: "research-intern-mcnair",
    role: "Research Intern",
    company: "STMU McNair",
    location: "San Antonio, TX",
    type: "internship",
    start: "Jun 2024",
    end: "Aug 2024",
    description: [
      "Conducted thorough undergraduate research on compiler design and high-level to low-level language translation.",
      "Developed a lightweight translator by building a parser, lexer, and semantic analyzer module to convert custom code into assembly language for a virtual machine.",
      "Collaborated closely with mentors to refine development skills and deepen understanding of language design principles and compiler design methodologies.",
      "Presented research and project outcomes at multiple universities, demonstrating language processing and compiler design expertise.",
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
