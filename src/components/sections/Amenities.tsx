'use client';

import { Container } from "@/src/components/ui/Container";
import { TreePine, Shield, Utensils, ParkingCircle, Dumbbell, Lightbulb, Baby, Leaf } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { motion } from "framer-motion";

const amenitiesData = [
  { icon: TreePine, title: "Landscaped gardens & nature walkways" },
  { icon: Shield, title: "Smart security systems" },
  { icon: Utensils, title: "Grand Open Restaurant" },
  { icon: ParkingCircle, title: "Guest Parking" },
  { icon: Dumbbell, title: "Clubhouse with wellness and leisure zones" },
  { icon: Lightbulb, title: "Street Light Facility" },
  { icon: Baby, title: "Children’s play area" },
  { icon: Leaf, title: "Plantation area" },
];

export function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-white">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              Amenities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Realty brings to you the Building Revolution. It all started with realistic appraisal of your living needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenitiesData.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="flex flex-col items-center text-center p-6 bg-card border border-border/40 rounded-2xl hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
                  <item.icon className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-medium text-foreground">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
