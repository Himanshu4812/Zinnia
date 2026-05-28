import { Container } from "@/src/components/ui/Container";
import { zinnia } from "@/src/data/zinnia";
import { Check } from "lucide-react";

export function ProjectInfo() {
  return (
    <section id="project-info" className="py-20 lg:py-32 bg-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-semibold text-foreground">
              {zinnia.highlights.title}
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {zinnia.highlights.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-card rounded-xl shadow-sm border border-border/60 hover:shadow-md hover:border-primary/40 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <p className="text-base lg:text-lg text-foreground font-medium">
                  <span className="text-muted-foreground mr-2">{item.label}:</span>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
