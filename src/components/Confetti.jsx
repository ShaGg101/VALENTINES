import { useEffect, useState } from 'react';

/**
 * Confetti celebration effect component
 * @param {Object} props
 * @param {boolean} props.active - Whether to show confetti
 * @param {number} props.count - Number of confetti pieces
 * @param {string[]} props.colors - Array of colors for confetti
 */
export default function Confetti({
  active = false,
  count = 30,
  colors = ['#E57373', '#FFCDD2', '#FFD700', '#FF69B4'],
}) {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (active) {
      // Generate confetti pieces
      const newPieces = Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        color: colors[Math.floor(Math.random() * colors.length)],
        isRound: Math.random() > 0.5,
        delay: Math.random() * 0.5,
        duration: 1.5 + Math.random(),
      }));
      setPieces(newPieces);

      // Clear confetti after animation completes
      const timer = setTimeout(() => {
        setPieces([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [active, count, colors]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: piece.left,
            top: '-20px',
            width: '10px',
            height: '10px',
            backgroundColor: piece.color,
            borderRadius: piece.isRound ? '50%' : '0',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
