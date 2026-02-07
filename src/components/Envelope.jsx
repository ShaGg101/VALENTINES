import { useState } from 'react';
import HeartIcon from './HeartIcon';

/**
 * Animated envelope component that opens on click
 * @param {Object} props
 * @param {function} props.onOpen - Callback when envelope finishes opening
 * @param {boolean} props.isOpening - Whether the envelope is currently opening
 */
export default function Envelope({ onOpen, isOpening }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isOpening) {
      onOpen();
    }
  };

  return (
    <div 
      className="relative cursor-pointer transform transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Click to open the love letter envelope"
      style={{
        perspective: '1000px',
      }}
    >
      <svg
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl w-[420px] sm:w-[560px] max-w-full h-auto"
      >
        {/* Envelope body (back) */}
        <rect
          x="20"
          y="40"
          width="280"
          height="160"
          rx="8"
          fill="#8B2635"
          stroke="#6B1F2A"
          strokeWidth="2"
        />

        {/* Envelope flap triangles (sides) */}
        <path
          d="M 20 40 L 160 120 L 20 200 Z"
          fill="#A0333F"
          stroke="#6B1F2A"
          strokeWidth="2"
        />
        <path
          d="M 300 40 L 160 120 L 300 200 Z"
          fill="#A0333F"
          stroke="#6B1F2A"
          strokeWidth="2"
        />

        {/* Envelope flap (top - opens) */}
        <g
          className={`transition-all duration-700 ease-out ${isOpening ? 'animate-envelope-open' : ''}`}
          style={{
            transformOrigin: '50% 20%',
            transformStyle: 'preserve-3d',
          }}
        >
          <path
            d="M 20 40 L 160 120 L 300 40 Z"
            fill="#8B2635"
            stroke="#6B1F2A"
            strokeWidth="2"
          />
          
          {/* Decorative heart on flap */}
          <g transform="translate(145, 60)">
            <circle cx="15" cy="15" r="20" fill="#6B1F2A" opacity="0.3" />
            <g transform="translate(6, 6)">
              <HeartIcon size={18} color="#FFE4E1" />
            </g>
          </g>
        </g>

        {/* Envelope front overlay */}
        <path
          d="M 20 200 L 160 120 L 300 200 Z"
          fill="#A0333F"
          stroke="#6B1F2A"
          strokeWidth="2"
        />
      </svg>

      {/* Tap instruction */}
      <div 
        className={`mt-4 text-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}
      >
        <p 
          className="font-sans-soft text-sm uppercase tracking-wide mb-2"
          style={{ color: '#8B2635' }}
        >
          {isOpening ? 'Opening...' : ' to open'}
        </p>
        <div className="flex justify-center gap-1">
          <HeartIcon size={12} className="animate-pulse-heart" style={{ animationDelay: '0s', color: '#8B2635' }} />
          <HeartIcon size={12} className="animate-pulse-heart" style={{ animationDelay: '0.2s', color: '#8B2635' }} />
          <HeartIcon size={12} className="animate-pulse-heart" style={{ animationDelay: '0.4s', color: '#8B2635' }} />
        </div>
      </div>
    </div>
  );
}
