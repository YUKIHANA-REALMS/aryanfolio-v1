import { TerminalWindow } from "./TerminalWindow";
import { AnimatedSection } from "./AnimatedSection";
import { Badge } from "./ui/badge";
import { ExternalLink, Github, Clock, Star } from "lucide-react";
import { Button } from "./ui/button";
import { portfolioConfig } from "../config/portfolio.config";
import { useEffectClasses } from "./TerminalWindow";

const statusIcons = {
  production: Star,
  development: Clock,
  archived: Clock,
  "coming soon": Clock
};

const statusColors = {
  production: "bg-white/10 text-white border-white/20",
  development: "bg-white/5 text-white/60 border-white/10", 
  archived: "bg-white/5 text-white/40 border-white/10",
  "coming soon": "bg-white/5 text-white/60 border-white/10"
};

export const Projects = () => {
  const { projects } = portfolioConfig;
  const { glassClass } = useEffectClasses();

  return (
    <section id="projects" className="py-20 px-4 scroll-section">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection animation="slide-in-up">
          <TerminalWindow title="projects.portfolio">
            <div className="space-y-12">
              <AnimatedSection delay={0.5}>
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Featured Projects
                  </h2>
                  <div className="w-24 h-1 bg-white/30 mx-auto rounded-full" />
                  <p className="text-white/50 text-lg">
                    A showcase of my best work and contributions
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                {projects.map((project, index) => {
                  const StatusIcon = statusIcons[project.status as keyof typeof statusIcons];
                  const statusColor = statusColors[project.status as keyof typeof statusColors];

                  return (
                    <AnimatedSection
                      key={project.name}
                      animation="slide-in-up"
                      delay={1 + index * 0.2}
                    >
                      <div className={`project-card group relative h-full flex flex-col rounded-2xl ${glassClass}`}>
                        <div className="relative z-10 p-4 sm:p-6 lg:p-8 flex flex-col h-full">
                          {/* Header */}
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 sm:mb-6">
                            <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                                <StatusIcon className="w-5 h-5 text-white/50" />
                              </div>
                              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-white/90 transition-colors duration-300 break-words">
                                {project.name}
                              </h3>
                              {project.featured && (
                                <Badge className="bg-white/10 text-white border-white/20 text-xs">
                                  Featured
                                </Badge>
                              )}
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
                              <Badge 
                                className={`${statusColor} flex items-center space-x-1 border text-xs shrink-0`}
                              >
                                <StatusIcon className="w-3 h-3" />
                                <span className="capitalize font-medium">{project.status}</span>
                              </Badge>
                              <div className="text-white/40 text-xs sm:text-sm font-medium bg-white/5 px-2 py-1 rounded-full shrink-0">
                                {project.year}
                              </div>
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-white/60 mb-6 sm:mb-8 leading-relaxed flex-grow text-sm sm:text-base lg:text-lg">
                            {project.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
                            {project.tags.map((tag) => (
                              <Badge 
                                key={tag}
                                variant="outline" 
                                className="text-xs sm:text-sm border-white/10 hover:border-white/30 hover:bg-white/5 hover:text-white transition-all duration-300 cursor-default backdrop-blur-sm"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                            {project.links.live && (
                              <Button 
                                variant="outline" 
                                size="default"
                                className="premium-button group/btn relative overflow-hidden flex-1 text-sm"
                                onClick={() => window.open(project.links.live, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300 relative z-10" />
                                <span className="relative z-10 font-medium">Visit Live</span>
                              </Button>
                            )}
                            {portfolioConfig.features.showCodeButtons && project.links.github && (
                              <Button 
                                variant="outline" 
                                size="default"
                                className="premium-button group/btn relative overflow-hidden flex-1 text-sm"
                                onClick={() => window.open(project.links.github, '_blank')}
                              >
                                <Github className="w-4 h-4 mr-2 group-hover/btn:rotate-12 group-hover/btn:scale-110 transition-all duration-300 relative z-10" />
                                <span className="relative z-10 font-medium">View Code</span>
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Decorative corner gradients */}
                        <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-bl from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />
                        <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tr from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-tr-full" />
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
            </div>
          </TerminalWindow>
        </AnimatedSection>
      </div>
    </section>
  );
};
