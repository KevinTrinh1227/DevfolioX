// config/certifications.ts

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  link: string;
};

export const certifications: Certification[] = [
  {
    name: "Google Data Analytics",
    issuer: "Coursera / Google",
    date: "2024",
    description:
      "Hands-on projects in SQL, spreadsheets, and dashboards focused on real-world analytics workflows.",
    imageUrl: "/certifications/example.jpg",
    link: "https://www.coursera.org/professional-certificates/google-data-analytics",
  },
  {
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description:
      "Validated understanding of core AWS services, cloud concepts, security, and billing models.",
    imageUrl: "/certifications/example.jpg",
    link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    name: "Meta Front-End Dev Certificate",
    issuer: "Coursera / Meta",
    date: "2023",
    description:
      "Built responsive front-end projects using modern React, accessibility best practices, and UI patterns.",
    imageUrl: "/certifications/example.jpg",
    link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
  },
  {
    name: "IBM Data Science I",
    issuer: "Coursera / IBM",
    date: "2023",
    description:
      "End-to-end data science projects including data cleaning, exploratory analysis, and basic model building.",
    imageUrl: "/certifications/example.jpg",
    link: "https://www.coursera.org/professional-certificates/ibm-data-science",
  },
  {
    name: "Meta Front-End Dev II",
    issuer: "Coursera / Meta",
    date: "2023",
    description:
      "Built responsive front-end projects using modern React, accessibility best practices, and UI patterns.",
    imageUrl: "/certifications/example.jpg",
    link: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
  },
  {
    name: "IBM Data Science",
    issuer: "Coursera / IBM",
    date: "2023",
    description:
      "End-to-end data science projects including data cleaning, exploratory analysis, and basic model building.",
    imageUrl: "/certifications/example.jpg",
    link: "https://www.coursera.org/professional-certificates/ibm-data-science",
  },
];
