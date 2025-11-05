// config/education.ts

export type EducationItem = {
  id: string;
  school: string;
  degree: string;
  major?: string;
  minor?: string;
  location?: string;
  start?: string;
  end?: string;
  expectedGraduation?: string;
  gpa?: string;
  coursework?: string[];
  activities?: string[];
};

export const education: EducationItem[] = [
  {
    id: "university-bs",
    school: "University of Houston",
    degree: "B.S. in Computer Science",
    major: "Computer Science",
    location: "Houston, TX",
    expectedGraduation: "May, 2028",
    gpa: "3.20",
    coursework: [
      "Algorithms and Data Structures",
      "Database Systems",
      "Fundamentals of Operating Systems",
      "Computer Architecture",
    ],
    activities: ["Society of Asian Engineers", "CougarCS", "CodeCoogs"],
  },
];
