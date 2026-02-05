import FloatingHearts from './FloatingHearts';
import Sparkles from './Sparkles';

/**
 * Reusable page background with gradient and decorative elements
 * @param {Object} props
 * @param {React.ReactNode} props.children - Page content
 * @param {string} props.className - Additional classes for the wrapper
 * @param {boolean} props.showHearts - Show floating hearts
 * @param {boolean} props.showSparkles - Show sparkle stars
 */
export default function PageBackground({
  children,
  className = '',
  showHearts = true,
  showSparkles = true,
}) {
  return (
    <div 
      className={`min-h-full w-full relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(180deg, var(--color-background) 0%, #FFF0F0 50%, color-mix(in srgb, var(--color-secondary) 40%, transparent) 100%)`,
      }}
    >
      {/* Background decorations */}
      {showHearts && <FloatingHearts />}
      {showSparkles && <Sparkles />}
      
      {/* Page content */}
      <div className="relative z-10 min-h-full flex flex-col items-center justify-center px-4 py-8">
        {children}
      </div>
    </div>
  );
}
