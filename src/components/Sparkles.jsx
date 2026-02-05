import SparkleIcon from './SparkleIcon';

// Default positions for sparkles
const defaultPositions = [
  { left: '25%', top: '20%', delay: 0 },
  { left: '70%', top: '25%', delay: 1 },
  { left: '30%', top: '55%', delay: 2 },
  { left: '65%', top: '60%', delay: 0.5 },
  { left: '45%', top: '35%', delay: 1.5 },
];

/**
 * Sparkle stars background decoration
 * @param {Object} props
 * @param {string} props.color - Sparkle fill color
 * @param {Array} props.positions - Array of position objects
 */
export default function Sparkles({ 
  color = 'var(--color-primary)',
  positions = defaultPositions,
}) {
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={i}
          className="absolute animate-sparkle opacity-50"
          style={{
            left: pos.left,
            top: pos.top,
            animationDelay: `${pos.delay}s`,
          }}
        >
          <SparkleIcon size={12} color={color} />
        </div>
      ))}
    </>
  );
}
