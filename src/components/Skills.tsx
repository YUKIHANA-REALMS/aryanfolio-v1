import { TerminalWindow } from "./TerminalWindow";
import { AnimatedSection } from "./AnimatedSection";
import { useEffectClasses } from "./TerminalWindow";
import { useAdminSettings } from "../context/AdminSettings";
import { 
  Code, 
  Server, 
  Settings,
  Cloud,
  Cpu,
  Boxes
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Frontend: Code,
  Language: Code,
  Backend: Server,
  Design: Code,
  DevOps: Settings,
  Cloud: Cloud,
  Infrastructure: Cpu,
  IaC: Boxes,
  Database: Server
};

export const Skills = () => {
  const { settings } = useAdminSettings();
  const skillsData = settings.skills;
  const { glassClass } = useEffectClasses();
  
  return (
    <section id="skills" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-white/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-white/[0.02] rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection animation="slide-in-up">
          <TerminalWindow title="skills.exe">
            <div className="space-y-10">
              <AnimatedSection delay={2}>
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold font-code text-white">
                    Technical Skills
                  </h2>
                  <div className="w-24 h-1 bg-white/30 mx-auto rounded-full shadow-lg shadow-white/10" />
                  <p className="text-white/40 font-mono max-w-2xl mx-auto">
                    My arsenal of technologies and tools for building scalable systems
                  </p>
                </div>
              </AnimatedSection>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {skillsData.map((skill, index) => {
                  const IconComponent = iconMap[skill.category] || Code;
                  return (
                    <AnimatedSection
                      key={skill.name}
                      animation="fade-in"
                      delay={1 + index * 0.05}
                    >
                      <div className={`skill-badge p-5 rounded-xl text-center group relative ${glassClass}`}>
                        <div className="relative z-10">
                          <div className="mb-4">
                            <div className="w-14 h-14 mx-auto rounded-xl bg-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.1] transition-all duration-300">
                              <IconComponent className="w-7 h-7 text-white/60 group-hover:text-white/80 transition-colors duration-200" />
                            </div>
                          </div>
                          
                          <span className="text-sm font-mono block mb-3 text-white/80 group-hover:text-white transition-colors duration-200">
                            {skill.name}
                          </span>
                          
                          <div className="space-y-2">
                            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                              <div 
                                className="h-full bg-white/60 transition-all duration-1000 ease-out rounded-full"
                                style={{ 
                                  width: `${skill.level}%`,
                                  transitionDelay: `${(1 + index * 0.05) * 100 + 300}ms`
                                }}
                              />
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-white/40 font-mono">
                                {skill.category}
                              </span>
                              <span className="text-sm text-white/70 font-mono font-bold">
                                {skill.level}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>

              <AnimatedSection animation="slide-in-up" delay={5}>
                <div className="text-center pt-8">
                  <div className={`glass-card p-6 rounded-xl ${glassClass}`}>
                    <p className="text-white/40 font-mono text-sm mb-4">
                      Always learning, always growing
                    </p>
                    <div className="flex justify-center space-x-4 text-xs font-mono">
                      <span className="text-white/60">Years of Experience: 3+</span>
                      <span className="text-white/20">|</span>
                      <span className="text-white/60">Projects Completed: 35+</span>
                      <span className="text-white/20">|</span>
                      <span className="text-white/60">Technologies Mastered: 20+</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </TerminalWindow>
        </AnimatedSection>
      </div>
    </section>
  );
};
