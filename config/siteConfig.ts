// config/siteConfig.ts
export const siteConfig = {
  name: "Kevin Trinh",
  title: "CS Student @ University of Houston",
  tagline:
    "I'm currently a student at the University of Houston, pursuing a Bachelor of Science in Computer Science. I have a profound interest in machine learning, operating systems, full-stack development, and everything in between.",
  location: "Houston, TX",

  socials: {
    github: "https://github.com/kevintrinh1227",
    linkedin: "https://www.linkedin.com/in/YOUR_LINKEDIN_SLUG",
    devto: "https://dev.to/YOUR_DEVTO_HANDLE",
    medium: "https://medium.com/@YOUR_MEDIUM_HANDLE",
    youtube: "https://www.youtube.com/@CoderTrinh",
    email: "you@example.com", // <-- no "mailto:" here
    handshake: "",
    telegram: "",
    discord: "https://discord.gg/YOUR_DISCORD_LINK",
  },

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
    certifications: true, // <-- add this
    codingStats: true,
    contact: true,
    resume: true,
  },

  theme: {
    mode: "system",
    accent: "indigo",
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
  },

  resume: {
    items: [],
  },

  sponsor: {
    enabled: true,
    url: "https://github.com/sponsors/kevintrinh1227",
  },
};

export type SiteConfig = typeof siteConfig;
