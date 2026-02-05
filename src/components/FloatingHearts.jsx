import HeartIcon from './HeartIcon';

// Default positions for floating hearts
const defaultPositions = [
  { left: '5%', top: '10%', size: 24, delay: 0 },
  { left: '90%', top: '15%', size: 20, delay: 0.5 },
  { left: '15%', top: '70%', size: 18, delay: 1 },
  { left: '85%', top: '65%', size: 22, delay: 1.5 },
  { left: '8%', top: '40%', size: 16, delay: 2 },
  { left: '92%', top: '45%', size: 14, delay: 2.5 },
  { left: '20%', top: '85%', size: 20, delay: 0.8 },
  { left: '75%', top: '80%', size: 16, delay: 1.2 },
];

/**
 * Floating hearts background decoration
 * @param {Object} props
 * @param {string} props.color - Heart fill color
 * @param {Array} props.positions - Array of position objects
 */
export default function FloatingHearts({ 
  color = 'var(--color-primary)',
  positions = defaultPositions,
}) {
  return (
    <>
      {positions.map((pos, i) => {
        const isReverse = i % 2 === 0;
        return (
          <div
            key={i}
            className={`absolute opacity-40 ${isReverse ? 'animate-float' : 'animate-float-reverse'}`}
            style={{
              left: pos.left,
              top: pos.top,
              animationDelay: `${pos.delay}s`,
            }}
          >
            <HeartIcon size={pos.size} color={color} />
          </div>
        );
      })}
    </>
  );
}
