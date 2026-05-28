import { Hero } from "@/src/components/sections/Hero";
import { Overview } from "@/src/components/sections/Overview";
import { Amenities } from "@/src/components/sections/Amenities";
import { PlansSection } from "@/src/components/sections/PlansSection";
import { Gallery } from "@/src/components/sections/Gallery";
import { Location } from "@/src/components/sections/Location";
import { GetInTouch } from "@/src/components/sections/GetInTouch";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Overview />
      <Amenities />
      <PlansSection />
      <Gallery />
      <Location />
      <GetInTouch />
    </div>
  );
}
