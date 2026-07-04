import { Contributions } from "@/components/sections/contributions";
import { Intro } from "@/components/sections/intro";
import { Projects } from "@/components/sections/projects";
import { Work } from "@/components/sections/work";
import { Writing } from "@/components/sections/writing";

export default function Home() {
  return (
    <main className="container container-padding-x">
      <Intro />
      <Work />
      <Projects />
      <Writing />
      <Contributions />
    </main>
  );
}
