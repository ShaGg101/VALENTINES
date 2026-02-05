/**
 * Sparkle/Star SVG icon component
 * @param {Object} props
 * @param {number} props.size - Width and height in pixels
 * @param {string} props.color - Fill color (defaults to primary)
 * @param {string} props.className - Additional Tailwind classes
 * @param {Object} props.style - Additional inline styles
 */
export default function SparkleIcon({ 
  size = 12, 
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
      <polygon points="12,0 14,10 24,12 14,14 12,24 10,14 0,12 10,10"/>
    </svg>
  );
}
