import { OverviewSection } from "@/features/portfolio/components/overview-section";
import { ProjectsSection } from "@/features/portfolio/components/projects-section";
import { WorkSection } from "@/features/portfolio/components/work-section";

export default function Home() {
  return (
    <main className="container container-padding-x">
      <OverviewSection />
      <WorkSection />
      <ProjectsSection />
    </main>
  );
}
