// app/page.tsx
import { Suspense } from "react";

import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HeroSection } from "../components/sections/Hero";
import { AboutSection } from "../components/sections/About";
import { EducationSection } from "../components/sections/Education";
import { ExperienceSection } from "../components/sections/Experience";
import { ProjectsSection } from "../components/sections/Projects";
import { BlogSection } from "../components/sections/Blogs";
import { YouTubeSection } from "../components/sections/YouTube";
import { CertificationsSection } from "../components/sections/Certifications";
import { ContactSection } from "../components/sections/Contact";

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Components that (directly or via hooks) use useSearchParams must be wrapped in Suspense */}
      <Suspense fallback={null}>
        <HeroSection />
      </Suspense>

      <Suspense fallback={null}>
        <AboutSection />
      </Suspense>

      <Suspense fallback={null}>
        <ExperienceSection />
      </Suspense>

      {/* Other sections can render normally */}
      <EducationSection />
      <ProjectsSection />
      <BlogSection />
      <YouTubeSection />
      <CertificationsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
