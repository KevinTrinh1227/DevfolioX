// components/sections/Projects.tsx
import { loadProjects } from "../../config/projects";
import { ProjectsSectionClient } from "./ProjectsClient";

export async function ProjectsSection() {
  const projects = await loadProjects();
  return <ProjectsSectionClient projects={projects} />;
}
