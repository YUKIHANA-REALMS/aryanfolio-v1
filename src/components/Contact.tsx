import { TerminalWindow } from "./TerminalWindow";
import { AnimatedSection } from "./AnimatedSection";
import { Mail, Github, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { portfolioConfig } from "../config/portfolio.config";
import { useEffectClasses } from "./TerminalWindow";

export const Contact = () => {
  const { content, social, personal } = portfolioConfig;
  const { glassClass } = useEffectClasses();

  return (
    <section id="contact" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection animation="slide-in-up">
          <TerminalWindow title="contact.sh">
            <div className="space-y-8 text-center">
              <AnimatedSection delay={2}>
                <h2 className="text-2xl font-bold mb-6 font-code text-white">
                  {content.contact.title}
                </h2>
              </AnimatedSection>

              <div className="space-y-6">
                <AnimatedSection animation="slide-in-up" delay={3}>
                  <p className="text-white/60 leading-relaxed max-w-2xl mx-auto">
                    {content.contact.description}
                  </p>
                </AnimatedSection>

                <AnimatedSection animation="slide-in-up" delay={4}>
                  <div className={`flex items-center justify-center space-x-2 text-white/70 font-mono relative skill-progress glow-pulse ${glassClass}`}>
                    <Mail className="w-5 h-5 text-white/60" />
                    <span>{personal.email}</span>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="slide-in-up" delay={5}>
                  <p className="text-white/40">
                    You can also connect with me on social media
                  </p>
                </AnimatedSection>

                <AnimatedSection animation="slide-in-up" delay={6}>
                  <div className="flex justify-center flex-wrap gap-4 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="premium-button font-mono stagger-1"
                      onClick={() => window.location.href = '/contact-email'}
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="premium-button font-mono stagger-2"
                      onClick={() => window.open(social.github, '_blank')}
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="premium-button font-mono stagger-3"
                      onClick={() => window.open('https://discord.gg/aerox', '_blank')}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Discord
                    </Button>
                  </div>
                </AnimatedSection>
              </div>

              <AnimatedSection animation="slide-in-up" delay={7}>
                <div className="pt-8 text-white/40 font-mono text-sm">
                  <p>$ {content.contact.cta}</p>
                  <div className="cursor inline-block w-2 h-4 bg-white/60 ml-1 animate-pulse">_</div>
                </div>
              </AnimatedSection>
            </div>
          </TerminalWindow>
        </AnimatedSection>
      </div>
    </section>
  );
};
