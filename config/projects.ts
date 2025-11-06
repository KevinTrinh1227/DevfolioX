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
    id: "reactfolio",
    name: "Reactfolio",
    summary:
      "A React.js front-end portfolio template designed for developers who want a clean and flexible personal site.",
    description: [
      "Reactfolio is a customizable portfolio template built with React and modern tooling, focused on a smooth UX and clean, responsive layout.",
      "It’s structured for easy editing, so students and developers can quickly plug in their own projects, experience, and contact info.",
    ],
    start: "Sep 2023",
    end: "Dec 2023",
    technologies: ["React", "JavaScript", "CSS"],
    featured: true,
    githubStars: 35,
    githubForks: 6,
    downloads: 90,
    links: [
      {
        label: "Live Demo",
        href: "https://your-reactfolio-demo-url.com",
        type: "live",
      },
      {
        label: "Source",
        href: "https://github.com/yourname/reactfolio",
        type: "github",
      },
      {
        label: "Docs",
        href: "https://github.com/yourname/reactfolio#readme",
        type: "docs",
      },
    ],
  },
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
    id: "prize-picks-predictions",
    name: "Prize-Picks-Predictions",
    summary:
      "A Flask web app that uses machine learning models to generate PrizePicks-style prediction insights.",
    description: [
      "Prize-Picks-Predictions ingests historical player and game data, runs it through trained machine learning models, and surfaces simple over/under style suggestions.",
      "The app focuses on interpretability and clean UI so users can quickly see model outputs, confidence levels, and recent performance.",
    ],
    start: "Aug 2024",
    end: "Present",
    technologies: ["Python", "Flask", "Pandas", "scikit-learn"],
    githubStars: 18,
    githubForks: 4,
    downloads: 40,
    links: [
      {
        label: "Source",
        href: "https://github.com/yourname/Prize-Picks-Predictions",
        type: "github",
      },
      {
        label: "Docs",
        href: "https://github.com/yourname/Prize-Picks-Predictions#readme",
        type: "docs",
      },
    ],
  },
  {
    id: "hycord-client",
    name: "Hycord-Client",
    summary:
      "A Python Discord client that integrates Minecraft player stats and server data into rich Discord embeds.",
    description: [
      "Hycord-Client connects Discord with Minecraft servers, pulling player stats, session history, and game events into a unified dashboard inside Discord.",
      "It uses caching and background tasks to reduce API spam while keeping stats, leaderboards, and activity summaries up to date.",
    ],
    start: "May 2024",
    end: "Present",
    technologies: ["Python", "discord.py", "Redis", "REST APIs"],
    githubStars: 22,
    githubForks: 5,
    downloads: 50,
    links: [
      {
        label: "Source",
        href: "https://github.com/yourname/Hycord-Client",
        type: "github",
      },
      {
        label: "Docs",
        href: "https://github.com/yourname/Hycord-Client#readme",
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
