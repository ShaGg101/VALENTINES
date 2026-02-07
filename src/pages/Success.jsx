import { useState, useEffect, useRef } from 'react';
import PageBackground from '../components/PageBackground';
import HeartIcon from '../components/HeartIcon';
import Confetti from '../components/Confetti';
import Button from '../ui/Button';

/**
 * Success page - celebration after saying Yes!
 * @param {Object} props
 * @param {Object} props.config - App configuration
 * @param {function} props.onBack - Handler to go back to the beginning
 */
export default function Success({ config, onBack }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const videoRef = useRef(null);

  // Trigger confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleHeartClick = () => {
    if (heartClicks < 14) {
      setHeartClicks(prev => prev + 1);
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 300);
    }
  };

  const progress = (heartClicks / 14) * 100;
  const isComplete = heartClicks >= 14;

  // Ensure video is paused when it first appears (avoid autoplay)
  useEffect(() => {
    if (isComplete && videoRef.current) {
      try { videoRef.current.pause(); videoRef.current.currentTime = 0; } catch (e) { /* ignore */ }
    }
  }, [isComplete]);

  return (
    <PageBackground className="animate-slide-up">
      {/* Confetti celebration */}
      <Confetti 
        active={showConfetti} 
        count={config.confetti_count}
        colors={config.confetti_colors}
      />

      {/* Celebration hearts */}
      <div className="flex items-center gap-3 mb-6">
        <HeartIcon 
          size={40} 
          className="animate-celebrate" 
          style={{ animationDelay: '0s' }} 
        />
        <HeartIcon 
          size={56} 
          className="animate-celebrate" 
          style={{ animationDelay: '0.2s' }} 
        />
        <HeartIcon 
          size={40} 
          className="animate-celebrate" 
          style={{ animationDelay: '0.4s' }} 
        />
      </div>

      {/* Success message */}
      <h1 
        className="font-serif-elegant text-2xl sm:text-3xl md:text-4xl text-center mb-2"
        style={{ color: 'var(--color-primary)' }}
      >
        {config.success_message}
      </h1>

      <h2 
        className="font-serif-elegant text-xl sm:text-2xl md:text-3xl text-center mb-8"
        style={{ color: 'var(--color-foreground)' }}
      >
        {config.love_message}
      </h2>

      {/* Cute celebration GIFs (use tenor embeds for reliable media rendering) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 max-w-3xl w-full px-4">
        {(
          [
            'https://tenor.com/view/kitty-cat-cat-in-love-in-love-cat-happy-gif-10000605937555107357',
            'https://tenor.com/view/cat-gif-14345055558441530836',
            'https://tenor.com/view/besito-catlove-gif-12186015021689896619',
          ]
        ).map((src, idx) => {
          const isTenorPage = src.includes('tenor.com/view');
          let content = null;

          if (isTenorPage) {
            // Extract the numeric ID from the end of the tenor page slug and use tenor's embed URL
            const parts = src.split('-');
            const maybeId = parts[parts.length - 1] || '';
            const embedId = maybeId.replace(/[^0-9]/g, '');
            const embedSrc = embedId ? `https://tenor.com/embed/${embedId}?autoplay=1&mute=1` : src;

            content = (
              <iframe
                title={`celebration-gif-${idx}`}
                src={embedSrc}
                className="w-full h-40 sm:h-48"
                style={{ border: '0', display: 'block', pointerEvents: 'none', background: 'transparent' }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups"
                tabIndex={-1}
                aria-hidden="true"
              />
            );
          } else {
            content = (
              <img
                src={src}
                alt="Happy cat celebrating love"
                className="w-full h-40 sm:h-48 object-cover"
                loading="lazy"
                style={{ pointerEvents: 'none', background: 'transparent' }}
                draggable={false}
                tabIndex={-1}
                aria-hidden="true"
              />
            );
          }

          return (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl bg-transparent border-0 shadow-none"
              style={{ background: 'transparent' }}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* Easter egg: small, subtle red heart (looks non-interactive) */}
      <div className="mb-8 px-4 flex flex-col items-center">
        {!isComplete ? (
          <div className="flex items-center justify-center">
            <div
              onClick={handleHeartClick}
              onTouchStart={handleHeartClick}
              role="button"
              aria-label="Hidden heart easter egg"
              className="select-none"
              style={{ cursor: 'default', userSelect: 'none' }}
            >
              <HeartIcon size={20} color={'#E57373'} />
            </div>
          </div>
        ) : (
          <div className="animate-slide-up max-w-2xl w-full">
            <video
              ref={videoRef}
              src="/photos/vid.MOV"
              controls
              preload="metadata"
              className="w-full rounded-2xl shadow-2xl"
              style={{ maxHeight: '70vh' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      
      {/* Date details card */}
      <div 
        className="text-center mb-8 px-6 py-4 rounded-2xl"
        style={{
          backgroundColor: 'var(--color-surface)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <p 
          className="font-serif-elegant text-base sm:text-lg mb-1"
          style={{ color: 'color-mix(in srgb, var(--color-foreground) 60%, transparent)' }}
        >
          Mark your calendar
        </p>
        <p 
          className="font-serif-elegant text-xl sm:text-2xl font-semibold"
          style={{ color: 'var(--color-primary)' }}
        >
          {config.date_details}
        </p>
      </div>

      {/* Developer love message / code snippet */}
      <div 
        className="text-center px-6 py-4 rounded-xl max-w-xs sm:max-w-sm"
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-foreground) 8%, transparent)',
          border: '1px dashed var(--color-secondary)',
        }}
      >
        <p 
          className="font-mono text-xs leading-relaxed"
          style={{ color: 'color-mix(in srgb, var(--color-foreground) 60%, transparent)' }}
        >
          {config.code_message}
        </p>
        <p 
          className="font-sans-soft text-sm mt-3 italic"
          style={{ color: 'var(--color-foreground)' }}
        >
          {config.final_message}
        </p>

      {/* Back button 
      <Button
        variant="ghost"
        onClick={onBack}
        ariaLabel="Go back to the beginning"
        className="mt-8"
      >
        ← Go Back
      </Button>
      */}
      </div>
    </PageBackground>
  );
}
