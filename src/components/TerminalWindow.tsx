import { useAdminSettings } from '@/context/AdminSettings';
import { visualEffects } from '@/lib/effects';
import { animations } from '@/lib/animations';

export const useEffectClasses = () => {
  const { settings } = useAdminSettings();
  
  const effectClass = visualEffects[settings.visualEffect]?.class || '';
  
  const animationClasses = settings.enabledAnimations
    .map(key => animations[key]?.class)
    .filter(Boolean)
    .join(' ');

  return {
    effectClass,
    animationClasses,
    glassClass: `${effectClass} ${animationClasses}`.trim()
  };
};

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const TerminalWindow = ({ title = "Terminal", children, className = "" }: TerminalWindowProps) => {
  const { glassClass } = useEffectClasses();
  
  return (
    <div className={`terminal-window ${glassClass} ${className}`}>
      <div className="terminal-header px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/90 shadow-lg shadow-red-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/90 shadow-lg shadow-yellow-500/30"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/90 shadow-lg shadow-green-500/30"></div>
        </div>
        <div className="text-sm text-muted-foreground font-mono tracking-wider">
          {title}
        </div>
        <div className="w-16"></div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
