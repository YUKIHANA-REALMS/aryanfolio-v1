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
  importedGithubIds: number[];
  showGithubRepos: boolean;
  githubFetchUsername: string;
  networkTitle: string;
  networkDescription: string;
  friends: { name: string; title: string; category: string; skills: string[]; status: string; discord: string; discordUserId: string }[];
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
  importedGithubIds: [],
  showGithubRepos: true,
  githubFetchUsername: 'YUKIHANA-REALMS',
  networkTitle: 'My Network',
  networkDescription: 'Welcome to my professional network! These are the incredible individuals I\'ve had the privilege to work, collaborate, and build friendships with. From talented developers and designers to innovative entrepreneurs and creative minds - each person here has contributed something valuable to my journey in tech.',
  friends: [
    { name: 'Azuren', title: 'Discord Server Designer', category: 'Best Friends', skills: ['Management', 'Aesthetic', 'Embeds'], status: 'Available', discord: 'azuren.dev', discordUserId: '' },
    { name: 'ZenpaiZombie', title: 'Founder @ StrelixCloud', category: 'Best Friends', skills: ['Proxmox', 'KVM', 'Virtualization'], status: 'Busy', discord: 'zenpaizombie', discordUserId: '' },
    { name: 'Nkash', title: 'VPS Specialist', category: 'Bros', skills: ['Networking', 'KVM', 'Docker'], status: 'Offline', discord: 'nkash.tech', discordUserId: '' },
    { name: 'Exo1tap', title: 'Minecraft Developer', category: 'Bros', skills: ['Java', 'Minecraft', 'Mods'], status: 'Available', discord: 'exo1tap', discordUserId: '' },
    { name: 'Spicy mango', title: 'Minecraft Server Developer', category: 'Bros', skills: ['Java', 'PaperMC'], status: 'Busy', discord: 'spicymango', discordUserId: '' },
    { name: 'Aryan', title: 'Full-Stack Developer & Cloud DevOps', category: 'Special Persons', skills: ['React', 'Node.js', 'Docker', 'AWS'], status: 'Busy', discord: 'aryan.dev', discordUserId: '' },
    { name: 'Miorin', title: 'Security Researcher', category: 'Special Persons', skills: ['Python', 'Machine Learning', 'TensorFlow'], status: 'Available', discord: 'miorin.ai', discordUserId: '' },
    { name: 'Alya', title: 'Graphic Designer', category: 'Friends', skills: ['Photoshop', 'Illustrator', 'UI Design'], status: 'Busy', discord: 'alya.design', discordUserId: '' },
    { name: 'Leo', title: 'Discord Bot Developer', category: 'Friends', skills: ['Node.js', 'JavaScript', 'Python'], status: 'Idle', discord: 'leo.codes', discordUserId: '' },
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

function mergeSettings(saved: Record<string, unknown>, defaults: AdminSettings): AdminSettings {
  const merged = { ...defaults, ...saved };
  if (saved.projects && Array.isArray(saved.projects)) {
    merged.projects = saved.projects.map((p: Record<string, unknown>) => ({
      logoUrl: '', liveLink: '', githubLink: '',
      ...p,
    }));
  }
  return merged;
}

async function fetchSettingsFromAPI(): Promise<AdminSettings | null> {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) return null;
    const data = await res.json();
    if (data.settings) return data.settings;
    return null;
  } catch {
    return null;
  }
}

async function saveSettingsToAPI(settings: AdminSettings, token: string): Promise<boolean> {
  try {
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ settings }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

interface AdminSettingsContextType {
  settings: AdminSettings;
  updateSettings: (updates: Partial<AdminSettings>) => void;
  updateSettingsImmediate: (updates: Partial<AdminSettings>) => void;
  resetSettings: () => void;
  getEffectClass: () => string;
  getAnimationClasses: () => string;
  authState: 'loading' | 'authenticated' | 'unauthenticated';
  isAdmin: boolean;
  adminLogin: (password: string) => Promise<{ success: boolean; error?: string; token?: string }>;
  adminSetup: (password: string) => Promise<{ success: boolean; error?: string; token?: string }>;
  adminLogout: () => void;
}

const AdminSettingsContext = createContext<AdminSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  updateSettingsImmediate: () => {},
  resetSettings: () => {},
  getEffectClass: () => '',
  getAnimationClasses: () => '',
  authState: 'loading',
  isAdmin: false,
  adminLogin: async () => ({ success: false }),
  adminSetup: async () => ({ success: false }),
  adminLogout: () => {},
});

export const useAdminSettings = () => useContext(AdminSettingsContext);

export const AdminSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AdminSettings>(defaultSettings);
  const [authToken, setAuthToken] = useState<string | null>(() => sessionStorage.getItem('admin-token'));
  const [authState, setAuthState] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const pendingRef = useRef<Partial<AdminSettings> | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('admin-token');
    if (token) {
      try {
        const decoded = atob(token);
        const [, , ts] = decoded.split('|');
        const age = Date.now() - parseInt(ts, 10);
        if (age > 24 * 60 * 60 * 1000) {
          sessionStorage.removeItem('admin-token');
          setAuthToken(null);
          setAuthState('unauthenticated');
        } else {
          setAuthToken(token);
          setAuthState('authenticated');
        }
      } catch {
        sessionStorage.removeItem('admin-token');
        setAuthToken(null);
        setAuthState('unauthenticated');
      }
    } else {
      setAuthState('unauthenticated');
    }
  }, []);

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      const apiSettings = await fetchSettingsFromAPI();
      if (apiSettings) {
        setSettings(apiSettings);
      } else {
        try {
          const saved = localStorage.getItem('admin-settings');
          if (saved) {
            const parsed = JSON.parse(saved);
            setSettings(mergeSettings(parsed, defaultSettings));
          }
        } catch {
          // use defaults
        }
      }
      setIsInitialLoad(false);
    };
    loadSettings();
  }, []);

  const flushUpdates = useCallback(() => {
    if (pendingRef.current) {
      const updates = pendingRef.current;
      pendingRef.current = null;
      setSettings(prev => ({ ...prev, ...updates }));
    }
  }, []);

  const updateSettings = useCallback((updates: Partial<AdminSettings>) => {
    pendingRef.current = pendingRef.current ? { ...pendingRef.current, ...updates } : updates;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(flushUpdates, 300);
  }, [flushUpdates]);

  const updateSettingsImmediate = useCallback((updates: Partial<AdminSettings>) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingRef.current = null;
    setSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // Save to localStorage + API
  useEffect(() => {
    if (isInitialLoad) return;

    localStorage.setItem('admin-settings', JSON.stringify(settings));

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      if (authToken) {
        saveSettingsToAPI(settings, authToken);
      }
    }, 1000);
  }, [settings, authToken, isInitialLoad]);

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

  const resetSettings = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    pendingRef.current = null;
    setSettings(defaultSettings);
    localStorage.removeItem('admin-settings');
    if (authToken) {
      saveSettingsToAPI(defaultSettings, authToken);
    }
  }, [authToken]);

  const getEffectClass = useCallback((): string => {
    return visualEffects[settings.visualEffect]?.class || '';
  }, [settings.visualEffect]);

  const getAnimationClasses = useCallback((): string => {
    return settings.enabledAnimations
      .map(key => animations[key]?.class)
      .filter(Boolean)
      .join(' ');
  }, [settings.enabledAnimations]);

  const adminLogin = useCallback(async (password: string) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        sessionStorage.setItem('admin-token', data.token);
        setAuthToken(data.token);
        setAuthState('authenticated');
        return { success: true, token: data.token };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch {
      return { success: false, error: 'Network error' };
    }
  }, []);

  const adminSetup = useCallback(async (password: string) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup', password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        sessionStorage.setItem('admin-token', data.token);
        setAuthToken(data.token);
        setAuthState('authenticated');
        return { success: true, token: data.token };
      }
      return { success: false, error: data.error || 'Setup failed' };
    } catch {
      return { success: false, error: 'Network error' };
    }
  }, []);

  const adminLogout = useCallback(() => {
    sessionStorage.removeItem('admin-token');
    setAuthToken(null);
    setAuthState('unauthenticated');
  }, []);

  return (
    <AdminSettingsContext.Provider value={{
      settings,
      updateSettings,
      updateSettingsImmediate,
      resetSettings,
      getEffectClass,
      getAnimationClasses,
      authState,
      isAdmin: authState === 'authenticated',
      adminLogin,
      adminSetup,
      adminLogout,
    }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};
