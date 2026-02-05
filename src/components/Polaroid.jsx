/**
 * Polaroid-style photo frame component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content inside the polaroid frame
 * @param {string} props.caption - Caption text below the photo
 * @param {'normal' | 'mini'} props.variant - Size variant
 * @param {string} props.className - Additional Tailwind classes
 * @param {string} props.rotation - Rotation class (e.g., 'rotate-2', '-rotate-1')
 */
export default function Polaroid({
  children,
  caption,
  variant = 'normal',
  className = '',
  rotation = '',
}) {
  const baseClass = variant === 'mini' ? 'polaroid-mini' : 'polaroid';
  
  return (
    <div className={`${baseClass} ${rotation} ${className}`}>
      {children}
      {caption && (
        <p className="font-serif-elegant text-center mt-3 italic text-sm text-foreground/60">
          {caption}
        </p>
      )}
    </div>
  );
}

/**
 * Photo placeholder when no image is provided
 */
export function PhotoPlaceholder({ size = 'normal' }) {
  const iconSize = size === 'mini' ? 32 : 64;
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-foreground/40">
      {size === 'normal' ? (
        <>
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" className="mb-3 opacity-50">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" className="opacity-50" style={{ marginLeft: 30, marginTop: -30 }}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          <p className="text-sm font-sans-soft mt-4 opacity-60">Your Photo Here</p>
        </>
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" className="opacity-40">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      )}
    </div>
  );
}
