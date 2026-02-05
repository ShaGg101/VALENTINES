/**
 * Reusable Heart SVG icon component
 * @param {Object} props
 * @param {number} props.size - Width and height in pixels
 * @param {string} props.color - Fill color (defaults to primary)
 * @param {string} props.className - Additional Tailwind classes
 * @param {Object} props.style - Additional inline styles
 */
export default function HeartIcon({ 
  size = 24, 
  color = 'var(--color-primary)', 
  className = '',
  style = {},
  ...props 
}) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color}
      className={className}
      style={style}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}
