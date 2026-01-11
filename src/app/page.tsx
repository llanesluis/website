import { OverviewSection } from "@/components/portfolio/overview-section";
import { ProjectsSection } from "@/components/portfolio/projects-section";
import { WorkSection } from "@/components/portfolio/work-section";

export default function Home() {
  return (
    <main className="container-padding-x container">
      <OverviewSection />
      <WorkSection />
      <ProjectsSection />
    </main>
  );
}
