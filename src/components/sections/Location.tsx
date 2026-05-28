'use client';

import { Container } from "@/src/components/ui/Container";
import { MapPin, Navigation } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { zinnia } from "@/src/data/zinnia";

export function Location() {
  return (
    <section id="location" className="py-24 bg-background">
      <Container>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground mb-4">
              {zinnia.location.title}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {zinnia.location.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {zinnia.location.address}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-16">
                {zinnia.location.description}
              </p>
              <a
                href= "#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline ml-16"
              >
                <Navigation className="w-4 h-4" />
                Open in Google Maps
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="rounded-xl overflow-hidden shadow-lg border border-border/60 h-[400px]"
            >
              <iframe
                src={zinnia.location.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
