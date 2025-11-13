// config/siteConfig.ts
export const siteConfig = {
  name: "Kevin Trinh",
  title: "CS Student @ University of Houston",
  tagline:
    "I'm currently a student at the University of Houston, pursuing a Bachelor of Science in Computer Science. I have a profound interest in machine learning, operating systems, full-stack development, and everything in between.",
  location: "Houston, TX",

  socials: {
    github: "https://github.com/kevintrinh1227",
    linkedin: "https://www.linkedin.com/in/YOUR_LINKEDIN_SLUG", // TODO: replace with your real slug
    devto: "https://dev.to/YOUR_DEVTO_HANDLE", // (optional) replace or leave empty
    medium: "https://medium.com/@YOUR_MEDIUM_HANDLE", // (optional)
    youtube: "https://www.youtube.com/@CoderTrinh",
    email: "you@example.com", // TODO: replace (used by the "Email me directly" button)
    handshake: "",
    telegram: "", // public profile/invite (NOT the bot token/chat id)
    discord: "https://discord.gg/YOUR_DISCORD_LINK", // (optional) can also be a user profile URL
  },

  // Repo info shown in the UI (static; for live stats you already fetch via loaders)
  repo: {
    url: "https://github.com/kevintrinh1227/devfoliox",
    lastUpdated: "Jan 10, 2025",
    lastCommit: "Refined layout, sections, and contact form",
    stars: 42,
    forks: 7,
    downloads: 120,
  },

  sections: {
    hero: true,
    about: true,
    education: true,
    experience: true,
    achievements: true,
    research: true,
    openSource: true,
    projects: true,
    blog: true,
    youtube: true,
    certifications: true,
    codingStats: true,
    contact: true,
    resume: true,
  },

  theme: {
    mode: "system", // 'light' | 'dark' | 'system'
    accent: "indigo", // tailwind accent key you’re using
  },

  // Centralized contact-form UI caps/messages (server still enforces)
  contact: {
    nameMaxLength: 80,
    emailMaxLength: 254,
    messageMaxLength: 2000,
    // Updated success text per your request
    successText: "Message Successfully Sent. I'll get back to you soon!",
    errorText: "Something went wrong. Please try again.",

    // Optional: use these to drive the Subject <select> (with "Custom..." handled in the UI)
    topicOptions: [
      "General message",
      "Role / Opportunity",
      "Question about a project",
      "Business Inquiry",
      "Other",
    ] as const,
  },

  about: {
    intro: [
      "I am currently an undergraduate student at the University of Houston pursuing a B.S. in Computer Science. I recently built a full stack app used by over 100+ users that allows UH students to get insights and AI schedule recommendations on their degree plan.",
      "I have interests in various types of software development, including machine learning, operating systems, and full-stack development. I'm a huge enthusiast of desk setups and PCs. In my free time, I enjoy playing chess, thrifting, and video games.",
    ],
    currentlyLookingFor:
      "Internships / early-career SWE roles and open source collaboration.",
    avatarUrl: "/avatar.jpg",
    recentTools: [
      "C++",
      "Python",
      "React",
      "PostgreSQL",
      "Google Cloud",
      "Linux Ubuntu",
      "Git",
    ],
    moreDetails: [
      "I’m particularly interested in how systems, infrastructure, and machine learning intersect — from efficient data pipelines to intelligent features that feel seamless to users.",
      "Recently, I’ve been focusing on building projects that solve real problems for students and early-career developers, including tools that surface insights from academic data.",
      "Outside of tech, I enjoy optimizing my workspace, learning new openings and tactics in chess, and hunting for unique finds while thrifting.",
    ],
  },

  // NEW: resume delivery config (used by /api/resume or /resume.pdf route)
  // - source: "google" (live export) or "file" (serve static PDF)
  // - googleDocId: leave empty if you prefer to keep it in env (RESUME_GOOGLE_DOC_ID)
  // - file.path: file under /public (e.g., /resume.static.pdf)
  // - file.url: remote PDF if you host it elsewhere
  // - filename: suggested filename for download header
  // - cacheSeconds: server/browser cache window
  resumeDelivery: {
    source: "google" as "google" | "file",
    googleDocId: "", // prefer env RESUME_GOOGLE_DOC_ID; this is a fallback
    file: {
      path: "/resume.static.pdf",
      url: "",
    },
    filename: "Kevin_Trinh_Resume.pdf",
    cacheSeconds: 3600,
  },

  // Keep your previous placeholder for future structured resume items if you need it
  resume: {
    items: [],
  },

  sponsor: {
    enabled: true,
    url: "https://github.com/sponsors/kevintrinh1227",
  },
} as const;

export type SiteConfig = typeof siteConfig;
