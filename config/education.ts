// config/education.ts

export type EducationItem = {
  id: string;
  school: string;
  degree: string; // e.g. "Bachelor of Science - BS"
  major?: string; // e.g. "Computer Science"
  minor?: string;
  location?: string;
  start?: string;
  end?: string;
  expectedGraduation?: string;
  gpa?: string;
  coursework?: string[];
  activities?: string[];
  awards?: string[];
  imageUrl?: string; // optional school image
};

export const education: EducationItem[] = [
  {
    id: "ut-austin-ms",
    school: "The University of Texas at Austin",
    degree: "Master of Science - MS",
    major: "Computer Science",
    location: "Austin, TX",
    start: "Aug 2026",
    expectedGraduation: "May, 2028",
    gpa: "3.90",
    coursework: [
      "Advanced Algorithms",
      "Machine Learning",
      "Distributed Systems",
      "Cloud Computing",
      "Advanced Web Development",
    ],
    // no activities for UT Austin
    awards: ["Graduate Fellowship Recipient"],
    imageUrl: "/images/ut_austin_logo.png",
  },
  {
    id: "university-bs",
    school: "University of Houston",
    degree: "Bachelor of Science - BS",
    major: "Computer Science",
    location: "Houston, TX",
    start: "Aug 2022",
    end: "May 2026",
    gpa: "3.20",
    coursework: [
      "Data Structures and Algorithms",
      "Database Systems",
      "Operating Systems",
      "Computer Architecture",
      "Software Engineering",
      "Networking Fundamentals",
    ],
    activities: ["Society of Asian Engineers", "CougarCS", "CodeCoogs"],
    awards: [
      "Hackathon Finalist (CougarHacks)",
      "Undergraduate Research Scholar",
    ],
    imageUrl: "/images/uh_logo.png",
  },
  {
    id: "satx-as",
    school: "San Antonio Community College",
    degree: "Associate of Science - AS",
    major: "Computer Science",
    location: "San Antonio, TX",
    start: "Aug 2020",
    end: "May 2022",
    gpa: "3.80",
    coursework: [
      "Intro to Computer Science",
      "Discrete Mathematics",
      "Calculus I & II",
      "Programming Fundamentals (Python & Java)",
    ],
    activities: ["Programming Club", "Math Club"],
    awards: ["Dean's List (4 semesters)"],
    imageUrl: "/images/satx_college_logo.png",
  },
];
