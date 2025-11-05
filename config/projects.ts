// config/projects.ts

export type ProjectLinkType =
  | "github"
  | "live"
  | "docs"
  | "download"
  | "video"
  | "other";

export type ProjectLink = {
  label: string;
  href: string;
  type?: ProjectLinkType;
};

export type ProjectItem = {
  id: string;
  name: string;

  // short one-liner
  summary: string;

  // one or more paragraphs
  description?: string[];

  // e.g. "Jun 2024"
  start: string;
  // e.g. "Present" or "Aug 2024"
  end: string;

  technologies?: string[];
  links?: ProjectLink[];
  featured?: boolean;

  // optional stats (manual for now)
  githubStars?: number;
  githubForks?: number;
  downloads?: number;
};

export const projects: ProjectItem[] = [
  {
    id: "devfoliox",
    name: "DevfolioX",
    summary:
      "A minimal, config-driven developer portfolio template built with Next.js and Tailwind CSS.",
    description: [
      "DevfolioX is a one-page portfolio focused on simplicity, speed, and practical integrations for students and developers.",
      "It centralizes projects, experience, writing, and contact into a single minimal layout while remaining easy to configure and deploy on free hosting.",
    ],
    start: "Jan 2025",
    end: "Present",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    githubStars: 12,
    githubForks: 3,
    downloads: 25,
    links: [
      {
        label: "Live Demo",
        href: "https://your-devfoliox-demo-url.com",
        type: "live",
      },
      {
        label: "Source",
        href: "https://github.com/yourname/devfoliox",
        type: "github",
      },
      {
        label: "Docs",
        href: "https://github.com/yourname/devfoliox#readme",
        type: "docs",
      },
    ],
  },
  {
    id: "cli-tool-example",
    name: "CLI Tool Example",
    summary: "A small command-line tool to automate repetitive dev tasks.",
    description: [
      "This CLI speeds up common workflows like bootstrapping new projects and running predefined scripts.",
      "It is designed to be simple to install, easy to extend, and friendly for beginners who are just getting into automation.",
    ],
    start: "Jun 2024",
    end: "Dec 2024",
    technologies: ["Node.js", "TypeScript"],
    githubStars: 5,
    githubForks: 1,
    downloads: 40,
    links: [
      {
        label: "Source",
        href: "https://github.com/yourname/cli-tool-example",
        type: "github",
      },
      {
        label: "Docs",
        href: "https://github.com/yourname/cli-tool-example#readme",
        type: "docs",
      },
    ],
  },
  {
    id: "leetcode-tracker",
    name: "LeetCode Tracker",
    summary: "A simple dashboard to keep track of LeetCode progress over time.",
    description: [
      "LeetCode Tracker helps visualize solved problems by difficulty, topic, and week.",
      "The goal is to give a calm overview of progress rather than a noisy dashboard.",
    ],
    start: "Feb 2024",
    end: "Present",
    technologies: ["React", "TypeScript", "Chart.js"],
    githubStars: 8,
    githubForks: 2,
    downloads: 18,
    links: [
      {
        label: "Live Demo",
        href: "https://your-leetcode-tracker-url.com",
        type: "live",
      },
      {
        label: "Source",
        href: "https://github.com/yourname/leetcode-tracker",
        type: "github",
      },
    ],
  },
  {
    id: "algo-visualizer",
    name: "Algorithm Visualizer",
    summary:
      "Interactive visualizations for common algorithms and data structures.",
    description: [
      "This project animates algorithms like BFS, DFS, sorting, and shortest path to make them easier to understand.",
      "It is aimed at CS students preparing for interviews or exams who prefer visual explanations.",
    ],
    start: "Sep 2023",
    end: "Apr 2024",
    technologies: ["React", "TypeScript", "Canvas API"],
    githubStars: 20,
    githubForks: 4,
    downloads: 30,
    links: [
      {
        label: "Live Demo",
        href: "https://your-algo-visualizer-url.com",
        type: "live",
      },
      {
        label: "Source",
        href: "https://github.com/yourname/algo-visualizer",
        type: "github",
      },
      {
        label: "Docs",
        href: "https://github.com/yourname/algo-visualizer#readme",
        type: "docs",
      },
    ],
  },
  {
    id: "study-planner",
    name: "Study Planner",
    summary:
      "A minimal study planning web app for courses, tasks, and deadlines.",
    description: [
      "Study Planner lets you organize courses, assignments, and exams in a clean, distraction-free interface.",
      "It focuses on a small set of features done well instead of trying to replace a full project management tool.",
    ],
    start: "Jan 2023",
    end: "Nov 2023",
    technologies: ["Next.js", "Tailwind CSS"],
    githubStars: 7,
    githubForks: 1,
    downloads: 15,
    links: [
      {
        label: "Live Demo",
        href: "https://your-study-planner-url.com",
        type: "live",
      },
      {
        label: "Source",
        href: "https://github.com/yourname/study-planner",
        type: "github",
      },
    ],
  },
  {
    id: "notes-api",
    name: "Notes API",
    summary:
      "A lightweight REST API for notes with authentication and tagging.",
    description: [
      "Notes API is a small backend service designed for learning authentication, CRUD patterns, and clean API design.",
      "It is intentionally small but structured like a real production service, making it a good teaching/project base.",
    ],
    start: "Aug 2022",
    end: "Mar 2023",
    technologies: ["Node.js", "Express", "PostgreSQL"],
    githubStars: 10,
    githubForks: 2,
    downloads: 22,
    links: [
      {
        label: "Source",
        href: "https://github.com/yourname/notes-api",
        type: "github",
      },
      {
        label: "Docs",
        href: "https://github.com/yourname/notes-api#readme",
        type: "docs",
      },
    ],
  },
];
