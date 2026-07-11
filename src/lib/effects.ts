// ═══════════════════════════════════════════════════════════
// VISUAL EFFECTS LIBRARY (7 effects)
// ═══════════════════════════════════════════════════════════

export type EffectType = 
  | 'glassmorphism'
  | 'neumorphism'
  | 'claymorphism'
  | 'neobrutalism'
  | 'auroramorphism'
  | 'skeuomorphism'
  | 'none';

export const visualEffects: Record<EffectType, { name: string; description: string; css: string; class: string }> = {
  glassmorphism: {
    name: 'Glassmorphism',
    description: 'Frosted glass effect with backdrop blur and transparency',
    css: `
      .effect-glassmorphism {
        background: rgba(255, 255, 255, 0.03);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }
      .effect-glassmorphism:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      }
    `,
    class: 'effect-glassmorphism'
  },
  neumorphism: {
    name: 'Neumorphism',
    description: 'Soft, extruded shadow effect on dark backgrounds',
    css: `
      .effect-neumorphism {
        background: #0a0a0a;
        border: none;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.8), -8px -8px 16px rgba(255, 255, 255, 0.03);
        border-radius: 16px;
      }
      .effect-neumorphism:hover {
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.8), -4px -4px 8px rgba(255, 255, 255, 0.03);
      }
      .effect-neumorphism:active {
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.8), inset -4px -4px 8px rgba(255, 255, 255, 0.03);
      }
    `,
    class: 'effect-neumorphism'
  },
  claymorphism: {
    name: 'Claymorphism',
    description: 'Soft, puffy 3D clay-like effect with inner shadows',
    css: `
      .effect-claymorphism {
        background: #111;
        border: none;
        border-radius: 20px;
        box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.6), -4px -4px 12px rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.05), inset 4px 4px 8px rgba(255, 255, 255, 0.03), inset -4px -4px 8px rgba(0, 0, 0, 0.3);
        transform: perspective(500px) rotateX(2deg);
        transition: all 0.3s ease;
      }
      .effect-claymorphism:hover {
        transform: perspective(500px) rotateX(0deg) translateY(-4px);
        box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.6), -6px -6px 16px rgba(255, 255, 255, 0.04), inset 0 0 0 1px rgba(255, 255, 255, 0.08), inset 4px 4px 8px rgba(255, 255, 255, 0.04), inset -4px -4px 8px rgba(0, 0, 0, 0.3);
      }
    `,
    class: 'effect-claymorphism'
  },
  neobrutalism: {
    name: 'Neobrutalism',
    description: 'Bold, raw borders with solid shadows',
    css: `
      .effect-neobrutalism {
        background: #fff;
        color: #000;
        border: 3px solid #000;
        border-radius: 0;
        box-shadow: 6px 6px 0px #000;
        transition: all 0.15s ease;
        font-weight: 700;
      }
      .effect-neobrutalism:hover {
        box-shadow: 3px 3px 0px #000;
        transform: translate(3px, 3px);
      }
      .effect-neobrutalism:active {
        box-shadow: 0px 0px 0px #000;
        transform: translate(6px, 6px);
      }
    `,
    class: 'effect-neobrutalism'
  },
  auroramorphism: {
    name: 'Auroramorphism',
    description: 'Animated aurora borealis gradient effect',
    css: `
      .effect-auroramorphism {
        background: linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 16px;
        position: relative;
        overflow: hidden;
        transition: all 0.4s ease;
      }
      .effect-auroramorphism::before {
        content: '';
        position: absolute;
        inset: -50%;
        background: conic-gradient(from 0deg, transparent, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05), transparent);
        animation: aurora-spin 8s linear infinite;
        opacity: 0;
        transition: opacity 0.5s ease;
      }
      .effect-auroramorphism:hover::before {
        opacity: 1;
      }
      .effect-auroramorphism:hover {
        border-color: rgba(255, 255, 255, 0.12);
        box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
      }
      @keyframes aurora-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    `,
    class: 'effect-auroramorphism'
  },
  skeuomorphism: {
    name: 'Skeuomorphism',
    description: 'Realistic textures with depth and material feel',
    css: `
      .effect-skeuomorphism {
        background: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05) inset, 0 4px 8px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(0, 0, 0, 0.3);
        transition: all 0.2s ease;
      }
      .effect-skeuomorphism:hover {
        background: linear-gradient(180deg, #222 0%, #111 100%);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.08) inset, 0 6px 12px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(0, 0, 0, 0.3);
      }
      .effect-skeuomorphism:active {
        background: linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 100%);
        box-shadow: 0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 2px 4px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(0, 0, 0, 0.3);
        transform: translateY(1px);
      }
    `,
    class: 'effect-skeuomorphism'
  },
  none: {
    name: 'None',
    description: 'No visual effect applied',
    css: '',
    class: ''
  }
};

export const getEffectStyles = (): string => {
  return Object.values(visualEffects)
    .map(e => e.css)
    .join('\n');
};

export const getEffectClass = (effect: EffectType): string => {
  return visualEffects[effect]?.class || '';
};
