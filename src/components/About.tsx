import { TerminalWindow } from "./TerminalWindow";
import { AnimatedSection } from "./AnimatedSection";
import { portfolioConfig } from "../config/portfolio.config";
import { useEffectClasses } from "./TerminalWindow";

export const About = () => {
  const { content } = portfolioConfig;
  const { glassClass } = useEffectClasses();
  
  return (
    <section id="about" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="slide-in-up">
          <TerminalWindow title="about.md">
            <div className="space-y-6">
              <AnimatedSection delay={2}>
                <h2 className="text-2xl font-bold mb-6 text-center font-code text-white">
                  {content.about.title}
                </h2>
              </AnimatedSection>
              
              <div className="space-y-4 text-white/70">
                {content.about.paragraphs.map((paragraph, index) => (
                  <AnimatedSection 
                    key={index}
                    animation="slide-in-left"
                    delay={3 + index}
                  >
                    <p className="leading-relaxed">{paragraph}</p>
                  </AnimatedSection>
                ))}
              </div>
              
              <AnimatedSection animation="slide-in-up" delay={5}>
                <div className={`mt-8 p-4 glass-card rounded-xl ${glassClass}`}>
                  <p className="text-white text-center font-mono relative skill-progress">
                    {content.about.availability}
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </TerminalWindow>
        </AnimatedSection>
      </div>
    </section>
  );
};
