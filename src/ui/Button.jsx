/**
 * Reusable Button component with variants
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost'} props.variant - Button style variant
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional Tailwind classes
 * @param {function} props.onClick - Click handler
 * @param {string} props.ariaLabel - Accessibility label
 * @param {Object} props.style - Additional inline styles
 */
export default function Button({
  variant = 'primary',
  children,
  className = '',
  onClick,
  ariaLabel,
  style = {},
  disabled = false,
  ...props
}) {
  const baseClasses = `
    font-sans-soft font-semibold rounded-full
    transition-all duration-300
    hover:scale-105 active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const variantClasses = {
    primary: `
      px-8 py-3 sm:px-10 sm:py-4
      bg-primary text-white
      shadow-lg hover:shadow-xl
      text-base sm:text-lg
    `,
    secondary: `
      px-8 py-3 sm:px-10 sm:py-4
      bg-surface text-foreground
      border-2 border-secondary
      shadow-md hover:shadow-lg
      text-base sm:text-lg
    `,
    ghost: `
      px-6 py-2
      bg-transparent text-foreground/80
      border border-secondary
      text-sm
    `,
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      style={style}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
