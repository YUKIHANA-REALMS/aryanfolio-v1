import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { visualEffects, EffectType } from '@/lib/effects';
import { animations, AnimationKey } from '@/lib/animations';

export type VisualEffect = EffectType;
export type AnimationName = AnimationKey;

export interface AdminSettings {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  canonicalUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  twitterUrl: string;
  youtubeUrl: string;
  discordUrl: string;
  discordUsername: string;
  discordMessage: string;
  email: string;
  heroTagline: string;
  heroTitle: string;
  aboutTitle: string;
  aboutParagraphs: string[];
  aboutAvailability: string;
  contactTitle: string;
  contactDescription: string;
  contactCta: string;
  buttons: { label: string; link: string; type: 'primary' | 'secondary' | 'ghost' }[];
  skills: { name: string; category: string; level: number }[];
  projects: { name: string; year: string; description: string; tags: string[]; status: string; featured: boolean; liveLink: string; githubLink: string; logoUrl: string }[];
  visualEffect: VisualEffect;
  glassmorphismIntensity: number;
  borderRadius: number;
  enabledAnimations: AnimationName[];
  scrollAnimations: boolean;
  hoverAnimations: boolean;
  loadingAnimations: boolean;
  cursorEffect: boolean;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  showParticles: boolean;
  showScrollProgress: boolean;
  showTerminalWindow: boolean;
  headerStyle: 'default' | 'floating' | 'hidden';
  footerText: string;
}

const defaultSettings: AdminSettings = {
  siteName: 'Aryan',
  siteTitle: 'Aryan | Full-Stack Developer & Cloud DevOps Engineer',
  siteDescription: 'Full-Stack Developer and Cloud DevOps Engineer crafting scalable digital experiences.',
  logo: '',
  favicon: '',
  canonicalUrl: 'https://indicloud.xyz',
  githubUrl: 'https://github.com/YUKIHANA-REALMS',
  linkedinUrl: 'https://linkedin.com/in/aryan',
  twitterUrl: 'https://twitter.com/aryan',
  youtubeUrl: '',
  discordUrl: 'https://discord.gg/aerox',
  discordUsername: 'indium.xyz',
  discordMessage: 'Feel free to DM me! I am always happy to connect.',
  email: 'aryandw2010@gmail.com',
  heroTagline: "Hello, I'm Aryan, a full-stack developer and cloud DevOps engineer specializing in scalable digital solutions.",
  heroTitle: 'Aryan',
  aboutTitle: 'About Me',
  aboutParagraphs: [
    'I am a full-stack developer and cloud DevOps engineer with deep expertise in building scalable web applications and architecting robust cloud infrastructure.',
    'From containerizing microservices to building CI/CD pipelines and managing multi-cloud deployments, I bridge the gap between development and operations.'
  ],
  aboutAvailability: 'Currently available for new projects',
  contactTitle: 'Get In Touch',
  contactDescription: 'I am always interested in discussing new opportunities and innovative projects.',
  contactCta: 'Thank you for visiting my portfolio!',
  buttons: [
    { label: 'GitHub', link: 'https://github.com/YUKIHANA-REALMS', type: 'primary' },
    { label: 'Contact', link: '#contact', type: 'secondary' },
    { label: 'Projects', link: '#projects', type: 'ghost' }
  ],
  skills: [
    { name: 'React', category: 'Frontend', level: 95 },
    { name: 'TypeScript', category: 'Language', level: 92 },
    { name: 'Node.js', category: 'Backend', level: 88 },
    { name: 'Python', category: 'Language', level: 85 },
    { name: 'Docker', category: 'DevOps', level: 90 },
    { name: 'AWS', category: 'Cloud', level: 82 },
    { name: 'Kubernetes', category: 'DevOps', level: 78 },
    { name: 'Terraform', category: 'IaC', level: 75 }
  ],
  projects: [
    { name: 'IndiCloud', year: '2025', description: 'Cloud infrastructure platform.', tags: ['Docker', 'Kubernetes', 'AWS'], status: 'production', featured: true, liveLink: 'https://indicloud.xyz', githubLink: 'https://github.com/YUKIHANA-REALMS', logoUrl: '' },
    { name: 'DevOps Toolkit', year: '2025', description: 'Automation scripts and CI/CD pipelines.', tags: ['Python', 'Bash', 'GitHub Actions'], status: 'production', featured: true, liveLink: '', githubLink: 'https://github.com/YUKIHANA-REALMS', logoUrl: '' },
    { name: 'CloudWatch Dashboard', year: '2025', description: 'Real-time monitoring dashboard.', tags: ['React', 'TypeScript', 'Grafana'], status: 'production', featured: true, liveLink: '', githubLink: 'https://github.com/YUKIHANA-REALMS', logoUrl: '' },
    { name: 'InfraProvisioner', year: '2025', description: 'Automated infrastructure provisioning.', tags: ['Go', 'Terraform', 'AWS'], status: 'coming soon', featured: false, liveLink: '', githubLink: 'https://github.com/YUKIHANA-REALMS', logoUrl: '' },
    { name: 'ContainerForge', year: '2025', description: 'Container optimization platform.', tags: ['Python', 'Docker', 'Trivy'], status: 'coming soon', featured: false, liveLink: '', githubLink: 'https://github.com/YUKIHANA-REALMS', logoUrl: '' }
  ],
  visualEffect: 'glassmorphism',
  glassmorphismIntensity: 20,
  borderRadius: 12,
  enabledAnimations: ['float', 'pulse', 'fade-in', 'slideUp', 'glow', 'shimmer'],
  scrollAnimations: true,
  hoverAnimations: true,
  loadingAnimations: true,
  cursorEffect: false,
  primaryColor: '#FFFFFF',
  accentColor: '#888888',
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  showParticles: true,
  showScrollProgress: true,
  showTerminalWindow: true,
  headerStyle: 'default',
  footerText: 'Built with passion'
};

const allEffectCSS = Object.values(visualEffects).map(e => e.css).join('\n');
const allAnimationCSS = Object.values(animations).map(a => a.css).join('\n');

interface AdminSettingsContextType {
  settings: AdminSettings;
  updateSettings: (updates: Partial<AdminSettings>) => void;
  updateSettingsImmediate: (updates: Partial<AdminSettings>) => void;
  resetSettings: () => void;
  getEffectClass: () => string;
  getAnimationClasses: () => string;
}

const AdminSettingsContext = createContext<AdminSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  updateSettingsImmediate: () => {},
  resetSettings: () => {},
  getEffectClass: () => '',
  getAnimationClasses: () => ''
});

export const useAdminSettings = () => useContext(AdminSettingsContext);

export const AdminSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('admin-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultSettings, ...parsed, projects: (parsed.projects || defaultSettings.projects).map((p: any) => ({ ...{ logoUrl: '', liveLink: '', githubLink: '' }, ...p })) };
      }
      return defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const pendingRef = useRef<Partial<AdminSettings> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flushUpdates = useCallback(() => {
    if (pendingRef.current) {
      const updates = pendingRef.current;
      pendingRef.current = null;
      setSettings(prev => ({ ...prev, ...updates }));
    }
  }, []);

  // Debounced updateSettings — batches rapid keystrokes
  const updateSettings = useCallback((updates: Partial<AdminSettings>) => {
    pendingRef.current = pendingRef.current ? { ...pendingRef.current, ...updates } : updates;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flushUpdates, 300);
  }, [flushUpdates]);

  // Immediate update — for dropdowns, toggles, sliders, buttons
  const updateSettingsImmediate = useCallback((updates: Partial<AdminSettings>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingRef.current = null;
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Inject effect CSS + animation CSS into DOM
  useEffect(() => {
    let styleEl = document.getElementById('admin-effects-style');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'admin-effects-style';
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = allEffectCSS + '\n' + allAnimationCSS;
  }, []);

  // Apply effect class + CSS variables to body
  useEffect(() => {
    const effectClass = visualEffects[settings.visualEffect]?.class || '';
    
    document.body.classList.remove(
      'effect-glassmorphism', 'effect-neumorphism', 'effect-claymorphism',
      'effect-neobrutalism', 'effect-auroramorphism', 'effect-skeuomorphism'
    );
    
    if (effectClass) {
      document.body.classList.add(effectClass);
    }

    document.documentElement.style.setProperty('--glass-blur', `${settings.glassmorphismIntensity}px`);
    document.documentElement.style.setProperty('--border-radius', `${settings.borderRadius}px`);
    document.documentElement.style.setProperty('--primary-custom', settings.primaryColor);
    document.documentElement.style.setProperty('--accent-custom', settings.accentColor);
    document.documentElement.style.setProperty('--bg-custom', settings.backgroundColor);
    document.documentElement.style.setProperty('--text-custom', settings.textColor);
    document.documentElement.style.setProperty('--radius-custom', `${settings.borderRadius}px`);

    document.body.style.backgroundColor = settings.backgroundColor;
    document.body.style.color = settings.textColor;

    document.title = settings.siteTitle || defaultSettings.siteTitle;

    if (settings.favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }

    if (settings.logo) {
      document.querySelectorAll('[data-admin-logo]').forEach((img) => {
        (img as HTMLImageElement).src = settings.logo;
      });
    }
  }, [settings]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('admin-settings', JSON.stringify(settings));
  }, [settings]);

  const resetSettings = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingRef.current = null;
    setSettings(defaultSettings);
    localStorage.removeItem('admin-settings');
  };

  const getEffectClass = (): string => {
    return visualEffects[settings.visualEffect]?.class || '';
  };

  const getAnimationClasses = (): string => {
    return settings.enabledAnimations
      .map(key => animations[key]?.class)
      .filter(Boolean)
      .join(' ');
  };

  return (
    <AdminSettingsContext.Provider value={{ settings, updateSettings, updateSettingsImmediate, resetSettings, getEffectClass, getAnimationClasses }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};
