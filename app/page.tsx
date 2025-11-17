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

      {/* Any section that (directly or via hooks) uses useSearchParams/usePathname/useRouter
          should live inside a Suspense boundary. */}
      <Suspense fallback={null}>
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
      </Suspense>

      {/* These sections don't use URL hooks, so they can render normally */}
      <BlogSection />
      <YouTubeSection />
      <CertificationsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
