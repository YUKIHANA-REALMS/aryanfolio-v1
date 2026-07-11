import { useState, useEffect, useCallback } from "react";
import { TerminalWindow } from "./TerminalWindow";
import { AnimatedSection } from "./AnimatedSection";
import { Button } from "./ui/button";
import { Github, Mail, FileText, Download, Calculator, Users } from "lucide-react";
import pixelAvatar from "../assets/aegis.png";
import { Link } from "react-router-dom";
import { useEffectClasses } from "./TerminalWindow";
import { useAdminSettings } from "../context/AdminSettings";

export const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const { settings } = useAdminSettings();
  const { glassClass } = useEffectClasses();

  const personal = { name: settings.heroTitle || settings.siteName, title: "Full-Stack Developer & Cloud DevOps Engineer", tagline: settings.heroTagline, email: settings.email };
  const social = { github: settings.githubUrl };

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < personal.tagline.length) {
        setDisplayText(personal.tagline.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 45);
    
    return () => clearInterval(timer);
  }, [personal.tagline]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-[120px] animate-float" />
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-white/[0.03] rounded-full blur-[100px] animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white/[0.02] rounded-full blur-[100px] animate-float-slow" />
      </div>

      <AnimatedSection animation="slide-in-up" className="w-full relative z-10">
        <TerminalWindow title="root@aryan:~#" className="w-full max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            {/* Avatar with white glow */}
            <AnimatedSection animation="slide-in-up" delay={1} className="flex justify-center">
              <div className="relative group">
                {/* Outer glow layers */}
                <div className="absolute -inset-8 bg-white/[0.04] rounded-full blur-[120px] opacity-50 animate-glow-breathe" />
                <div className="absolute -inset-6 bg-white/[0.06] rounded-full blur-[80px] opacity-60 animate-glow-breathe" style={{ animationDelay: '1s' }} />
                <div className="absolute -inset-4 bg-white/[0.08] rounded-full blur-[60px] opacity-70 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Rotating ring */}
                <div className="absolute -inset-2 rounded-full animate-spin" style={{ animationDuration: '12s' }}>
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-white/30 via-white/10 to-white/30 blur-sm" />
                </div>
                
                {/* Inner border glow */}
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-md opacity-50 group-hover:opacity-80 transition-all duration-500" />
                
                {/* Avatar container */}
                <div className="relative">
                  <img 
                    src={pixelAvatar} 
                    alt={`${personal.name}'s avatar`} 
                    data-admin-logo
                    className="relative w-28 h-28 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-700 transform group-hover:scale-105 pixel-art shadow-2xl shadow-white/10"
                  />
                  
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                </div>
                
                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-white/40 rounded-full animate-ping opacity-40"
                      style={{
                        left: `${20 + Math.cos(i * 45 * Math.PI / 180) * 65}%`,
                        top: `${20 + Math.sin(i * 45 * Math.PI / 180) * 65}%`,
                        animationDelay: `${i * 0.4}s`,
                        animationDuration: `${2 + i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </AnimatedSection>
            
            {/* Name and Title */}
            <AnimatedSection animation="slide-in-up" delay={1.5} className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
                {personal.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-white/50 font-light tracking-wide">
                {personal.title}
              </h2>
            </AnimatedSection>
            
            {/* Typing animation */}
            <AnimatedSection delay={2} className="min-h-[120px] flex items-center justify-center">
              <div className={`max-w-3xl mx-auto glass-card p-6 rounded-xl ${glassClass}`}>
                <p className="text-white/80 leading-relaxed text-lg font-light">
                  {displayText}
                  <span className="cursor inline-block w-0.5 h-6 bg-white ml-1 animate-pulse">|</span>
                </p>
              </div>
            </AnimatedSection>
            
            {/* Online status */}
            <AnimatedSection animation="slide-in-up" delay={2.5} className="flex justify-center">
              <div className={`flex items-center space-x-3 glass-card px-5 py-2.5 rounded-full ${glassClass}`}>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-sm text-white/60 font-medium tracking-wide">Available for work</span>
              </div>
            </AnimatedSection>
            
            {/* Contact info */}
            <AnimatedSection animation="slide-in-up" delay={3}>
              <div className={`flex items-center justify-center space-x-3 glass-card p-3 rounded-lg hover:bg-white/5 transition-all duration-300 ${glassClass}`}>
                <Mail className="w-4 h-4 text-white/70" />
                <span className="text-white/70">{personal.email}</span>
              </div>
            </AnimatedSection>
            
            {/* Action buttons */}
            <AnimatedSection animation="slide-in-up" delay={3.5}>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="premium-button group relative overflow-hidden text-white/80 hover:text-white"
                  onClick={() => window.open(social.github, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">GitHub</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="premium-button group relative overflow-hidden text-white/80 hover:text-white"
                  onClick={() => scrollToSection('contact')}
                >
                  <FileText className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">Contact</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="premium-button group relative overflow-hidden text-white/80 hover:text-white"
                  onClick={() => scrollToSection('projects')}
                >
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                  <span className="relative z-10">Projects</span>
                </Button>
                <Link to="/friends">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="premium-button group relative overflow-hidden text-white/80 hover:text-white"
                  >
                    <Users className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">Network</span>
                  </Button>
                </Link>
                <Link to="/converter">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="premium-button group relative overflow-hidden text-white/80 hover:text-white"
                  >
                    <Calculator className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                    <span className="relative z-10">Tools</span>
                  </Button>
                </Link>
              </div>
            </AnimatedSection>

            {/* Scroll indicator */}
            <AnimatedSection animation="fade-in" delay={4}>
              <div className="pt-6">
                <div className="flex flex-col items-center space-y-2 opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                     onClick={() => scrollToSection('about')}>
                  <span className="text-xs text-white/40 tracking-widest uppercase">Explore</span>
                  <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </TerminalWindow>
      </AnimatedSection>
    </section>
  );
};
