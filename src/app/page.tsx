import { Hero } from "@/src/components/sections/Hero";
import { Overview } from "@/src/components/sections/Overview";
import { ProjectInfo } from "@/src/components/sections/Features";
import { Amenities } from "@/src/components/sections/Amenities";
import { PlansSection } from "@/src/components/sections/PlansSection";
import { Gallery } from "@/src/components/sections/Gallery";
import { GetInTouch } from "@/src/components/sections/GetInTouch";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Overview />
      <Amenities />
      <ProjectInfo />
      <PlansSection />
      <Gallery />
      <GetInTouch />
    </div>
  );
}
