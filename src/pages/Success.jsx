import { useState, useEffect } from 'react';
import PageBackground from '../components/PageBackground';
import HeartIcon from '../components/HeartIcon';
import Polaroid, { PhotoPlaceholder } from '../components/Polaroid';
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

  // Trigger confetti on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Photo rotations for the collage
  const rotations = ['rotate-2', '-rotate-1', '-rotate-2', 'rotate-1'];

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

      {/* Photo collage */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 max-w-xs sm:max-w-sm px-4">
        {config.gallery_photos.map((photo, index) => (
          <Polaroid 
            key={index} 
            variant="mini" 
            rotation={rotations[index]}
          >
            <div 
              className="aspect-square w-full rounded relative"
              style={{
                background: `linear-gradient(135deg, 
                  ${index % 2 === 0 ? 'var(--color-secondary)' : 'var(--color-background)'} 0%, 
                  ${index % 2 === 0 ? 'var(--color-background)' : 'var(--color-secondary)'} 100%)`,
              }}
            >
              {photo ? (
                <img 
                  src={photo} 
                  alt={`Memory ${index + 1}`} 
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <PhotoPlaceholder size="mini" />
                </div>
              )}
            </div>
          </Polaroid>
        ))}
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
