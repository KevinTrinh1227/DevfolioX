// config/experience.ts
import raw from "./experience.json";

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

// Optionally: light runtime guard (keeps shape predictable)
function normalize(items: any[]): ExperienceItem[] {
  return (items || []).map((it) => ({
    id: String(it.id),
    role: String(it.role),
    company: String(it.company),
    location: it.location ? String(it.location) : undefined,
    type: it.type,
    start: String(it.start),
    end: String(it.end),
    description: Array.isArray(it.description)
      ? it.description.map(String)
      : [],
    technologies: Array.isArray(it.technologies)
      ? it.technologies.map(String)
      : undefined,
  }));
}

export const experience: ExperienceItem[] = normalize(raw as any[]);
