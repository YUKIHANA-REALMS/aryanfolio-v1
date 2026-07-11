// ═══════════════════════════════════════════════════════════
// ANIMATION EFFECTS LIBRARY (25+ animations)
// ═══════════════════════════════════════════════════════════

export const animations = {
  float: {
    name: 'Float',
    css: `@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }`,
    class: 'anim-float'
  },
  pulse: {
    name: 'Pulse',
    css: `@keyframes pulse-custom { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.02); } }`,
    class: 'anim-pulse'
  },
  bounce: {
    name: 'Bounce',
    css: `@keyframes bounce-custom { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }`,
    class: 'anim-bounce'
  },
  spin: {
    name: 'Spin',
    css: `@keyframes spin-custom { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`,
    class: 'anim-spin'
  },
  ping: {
    name: 'Ping',
    css: `@keyframes ping-custom { 0% { transform: scale(1); opacity: 1; } 75%, 100% { transform: scale(2); opacity: 0; } }`,
    class: 'anim-ping'
  },
  wiggle: {
    name: 'Wiggle',
    css: `@keyframes wiggle { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }`,
    class: 'anim-wiggle'
  },
  glow: {
    name: 'Glow',
    css: `@keyframes glow-custom { 0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.1); } 50% { box-shadow: 0 0 20px rgba(255,255,255,0.3), 0 0 40px rgba(255,255,255,0.1); } }`,
    class: 'anim-glow'
  },
  shimmer: {
    name: 'Shimmer',
    css: `@keyframes shimmer-custom { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`,
    class: 'anim-shimmer'
  },
  slideUp: {
    name: 'Slide Up',
    css: `@keyframes slide-up-custom { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }`,
    class: 'anim-slide-up'
  },
  slideDown: {
    name: 'Slide Down',
    css: `@keyframes slide-down-custom { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }`,
    class: 'anim-slide-down'
  },
  slideLeft: {
    name: 'Slide Left',
    css: `@keyframes slide-left-custom { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }`,
    class: 'anim-slide-left'
  },
  slideRight: {
    name: 'Slide Right',
    css: `@keyframes slide-right-custom { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }`,
    class: 'anim-slide-right'
  },
  fadeIn: {
    name: 'Fade In',
    css: `@keyframes fade-in-custom { from { opacity: 0; } to { opacity: 1; } }`,
    class: 'anim-fade-in'
  },
  scaleIn: {
    name: 'Scale In',
    css: `@keyframes scale-in { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }`,
    class: 'anim-scale-in'
  },
  rotateIn: {
    name: 'Rotate In',
    css: `@keyframes rotate-in { from { opacity: 0; transform: rotate(-10deg) scale(0.9); } to { opacity: 1; transform: rotate(0) scale(1); } }`,
    class: 'anim-rotate-in'
  },
  flip: {
    name: 'Flip',
    css: `@keyframes flip { 0% { transform: perspective(400px) rotateY(0); } 40% { transform: perspective(400px) rotateY(-180deg); } 100% { transform: perspective(400px) rotateY(-360deg); } }`,
    class: 'anim-flip'
  },
  jello: {
    name: 'Jello',
    css: `@keyframes jello { 0%, 100% { transform: skewX(0deg) skewY(0deg); } 30% { transform: skewX(-8deg) skewY(-8deg); } 40% { transform: skewX(6deg) skewY(6deg); } 50% { transform: skewX(-4deg) skewY(-4deg); } 65% { transform: skewX(2deg) skewY(2deg); } 75% { transform: skewX(-1deg) skewY(-1deg); } }`,
    class: 'anim-jello'
  },
  rubberBand: {
    name: 'Rubber Band',
    css: `@keyframes rubber-band { 0% { transform: scaleX(1) scaleY(1); } 30% { transform: scaleX(1.25) scaleY(0.75); } 40% { transform: scaleX(0.75) scaleY(1.25); } 50% { transform: scaleX(1.15) scaleY(0.85); } 65% { transform: scaleX(0.95) scaleY(1.05); } 75% { transform: scaleX(1.05) scaleY(0.95); } 100% { transform: scaleX(1) scaleY(1); } }`,
    class: 'anim-rubber-band'
  },
  shake: {
    name: 'Shake',
    css: `@keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); } 20%, 40%, 60%, 80% { transform: translateX(4px); } }`,
    class: 'anim-shake'
  },
  tada: {
    name: 'Tada',
    css: `@keyframes tada { 0% { transform: scale(1) rotate(0); } 10%, 20% { transform: scale(0.9) rotate(-3deg); } 30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); } 40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); } 100% { transform: scale(1) rotate(0); } }`,
    class: 'anim-tada'
  },
  sway: {
    name: 'Sway',
    css: `@keyframes sway { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(5deg); } 75% { transform: rotate(-5deg); } }`,
    class: 'anim-sway'
  },
  wobble: {
    name: 'Wobble',
    css: `@keyframes wobble { 0% { transform: translateX(0); } 15% { transform: translateX(-12px) rotate(-5deg); } 30% { transform: translateX(10px) rotate(3deg); } 45% { transform: translateX(-8px) rotate(-3deg); } 60% { transform: translateX(6px) rotate(2deg); } 75% { transform: translateX(-3px) rotate(-1deg); } 100% { transform: translateX(0); } }`,
    class: 'anim-wobble'
  },
  heartbeat: {
    name: 'Heartbeat',
    css: `@keyframes heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.1); } 28% { transform: scale(1); } 42% { transform: scale(1.1); } 70% { transform: scale(1); } }`,
    class: 'anim-heartbeat'
  },
  flash: {
    name: 'Flash',
    css: `@keyframes flash { 0%, 50%, 100% { opacity: 1; } 25%, 75% { opacity: 0; } }`,
    class: 'anim-flash'
  },
  headShake: {
    name: 'Head Shake',
    css: `@keyframes head-shake { 0% { transform: translateX(0); } 6.5% { transform: translateX(-6px) rotateY(-9deg); } 18.5% { transform: translateX(5px) rotateY(7deg); } 31.5% { transform: translateX(-3px) rotateY(-5deg); } 43.5% { transform: translateX(2px) rotateY(3deg); } 50% { transform: translateX(0); } }`,
    class: 'anim-head-shake'
  },
  swing: {
    name: 'Swing',
    css: `@keyframes swing { 20% { transform: rotate(15deg); } 40% { transform: rotate(-10deg); } 60% { transform: rotate(5deg); } 80% { transform: rotate(-5deg); } 100% { transform: rotate(0); } }`,
    class: 'anim-swing'
  },
  backInUp: {
    name: 'Back In Up',
    css: `@keyframes back-in-up { 0% { transform: translateY(120px) scale(0.7); opacity: 0.7; } 80% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }`,
    class: 'anim-back-in-up'
  },
  backInDown: {
    name: 'Back In Down',
    css: `@keyframes back-in-down { 0% { transform: translateY(-120px) scale(0.7); opacity: 0.7; } 80% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(0) scale(1); opacity: 1; } }`,
    class: 'anim-back-in-down'
  }
} as const;

export type AnimationKey = keyof typeof animations;

export const getAnimationStyles = (enabled: AnimationKey[]): string => {
  return enabled
    .map(key => animations[key]?.css)
    .filter(Boolean)
    .join('\n');
};

export const getAnimationClasses = (enabled: AnimationKey[]): string => {
  return enabled
    .map(key => animations[key]?.class)
    .filter(Boolean)
    .join(' ');
};
