import { useState, useCallback } from 'react';
import PageBackground from '../components/PageBackground';
import HeartIcon from '../components/HeartIcon';
import Polaroid, { PhotoPlaceholder } from '../components/Polaroid';
import Button from '../ui/Button';

/**
 * Invitation page - the "Will you be my Valentine?" question
 * @param {Object} props
 * @param {Object} props.config - App configuration
 * @param {function} props.onYes - Handler for Yes button
 * @param {function} props.onBack - Handler for back/read letter again
 * @param {function} props.onNoDodge - Handler for No button dodge
 * @param {{x: number, y: number}} props.noButtonPosition - Current position of No button
 * @param {number} props.dodgeCount - How many times user tried to click No
 */
export default function Invitation({ 
  config, 
  onYes, 
  onBack, 
  onNoDodge,
  noButtonPosition,
  dodgeCount,
}) {
  const [isWiggling, setIsWiggling] = useState(false);
  const [noProgress, setNoProgress] = useState(0);
  
  // Maximum dodges before button transforms to "Yes!"
  const MAX_DODGES = 10;
  const progressPercentage = (noProgress / MAX_DODGES) * 100;
  const isTransformed = noProgress >= MAX_DODGES;

  // Handle No button interaction (hover, touch, click) - increases progress
  const handleNoInteraction = useCallback((e) => {
    e.preventDefault();
    
    // If already transformed, act as a Yes button
    if (noProgress >= MAX_DODGES) {
      onYes();
      return;
    }
    
    // Increase progress and trigger dodge
    setNoProgress(prev => Math.min(prev + 1, MAX_DODGES));
    onNoDodge(e);
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 500);
  }, [noProgress, onYes, onNoDodge]);

  // Hint text changes based on progress and dodge attempts
  const getHintText = () => {
    if (isTransformed) {
      return "Knew you'd come around! ";
    }
    if (noProgress > 7) {
      return "Almost there... just say yes already! ";
    }
    if (noProgress > 4) {
      return "The button is getting tired of running... ";
    }
    if (dodgeCount > 2) {
      return "The 'No' button seems shy... ";
    }
    return "Make your choice! ";
  };
  
  const hintText = getHintText();

  return (
    <PageBackground>
      {/* Top decorative pulsing hearts */}
      <div className="flex items-center gap-2 mb-6">
        <HeartIcon 
          size={20} 
          className="animate-pulse-heart" 
          style={{ animationDelay: '0s' }} 
        />
        <HeartIcon 
          size={28} 
          className="animate-pulse-heart" 
          style={{ animationDelay: '0.3s' }} 
        />
        <HeartIcon 
          size={20} 
          className="animate-pulse-heart" 
          style={{ animationDelay: '0.6s' }} 
        />
      </div>

      {/* Polaroid photo frame */}
      <Polaroid caption={config.polaroid_caption} className="mb-8 max-w-xs">
        <div 
          className="relative aspect-square w-56 sm:w-64 rounded overflow-hidden"
          style={{
            background: `linear-gradient(135deg, var(--color-secondary) 0%, var(--color-background) 100%)`,
          }}
        >
          {config.main_photo ? (
            <img 
              src={config.main_photo} 
              alt="Us" 
              className="w-full h-full object-cover"
            />
          ) : (
            <PhotoPlaceholder size="normal" />
          )}
          
          {/* Decorative corner heart */}
          <div className="absolute top-2 right-2 opacity-30">
            <HeartIcon size={24} />
          </div>
        </div>
      </Polaroid>

      {/* Main question */}
      <h1 
        className="font-serif-elegant text-2xl sm:text-3xl md:text-4xl text-center mb-8 px-4"
        style={{ color: 'var(--color-foreground)' }}
      >
        {config.main_question}
      </h1>

      {/* Buttons container */}
      <div 
        className="flex flex-col sm:flex-row items-center gap-4 mb-8 relative"
        style={{ minHeight: '120px', width: '280px' }}
      >
        {/* Yes Button */}
        <Button
          variant="primary"
          onClick={onYes}
          ariaLabel="Yes, I'll be your Valentine"
          style={{ minWidth: '120px', position: 'relative', zIndex: 10 }}
        >
          {config.yes_button_text}
        </Button>

        {/* No Button (Dodging) - now with progress bar and transformation */}
        <button
          className={`
            px-8 py-3 sm:px-10 sm:py-4 rounded-full font-sans-soft font-medium 
            text-base sm:text-lg shadow-md relative overflow-hidden
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary
            ${isWiggling ? 'animate-wiggle' : ''}
            ${isTransformed ? 'cursor-pointer' : ''}
          `}
          style={{
            backgroundColor: isTransformed ? 'var(--color-primary)' : 'var(--color-surface)',
            color: isTransformed ? 'white' : 'var(--color-foreground)',
            border: `2px solid ${isTransformed ? 'var(--color-primary)' : 'var(--color-secondary)'}`,
            minWidth: '120px',
            position: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'relative' : 'fixed',
            left: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.x}px`,
            top: noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.y}px`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
            zIndex: 20,
          }}
          onMouseEnter={isTransformed ? undefined : handleNoInteraction}
          onTouchStart={isTransformed ? undefined : handleNoInteraction}
          onClick={handleNoInteraction}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleNoInteraction(e);
            }
          }}
          aria-label={isTransformed ? "Yes! (You convinced me!)" : "No (but this button will dodge!)"}
        >
          {/* Progress bar background */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-300 ease-out"
            style={{
              background: `linear-gradient(to right, ${isTransformed ? 'rgba(255,255,255,0.2)' : 'var(--color-secondary)'} ${progressPercentage}%, transparent ${progressPercentage}%)`,
              opacity: isTransformed ? 0 : 0.4,
            }}
          />
          
          {/* Button text */}
          <span className="relative z-10">
            {isTransformed ? 'Yes! 💖' : config.no_button_text}
          </span>
        </button>
      </div>

      {/* Playful hint text */}
      <p 
        className="font-sans-soft text-sm opacity-60 text-center"
        style={{ color: 'var(--color-foreground)' }}
      >
        {hintText}
      </p>

      {/* Back button */}
      <Button
        variant="ghost"
        onClick={onBack}
        ariaLabel="Go back to read the letter again"
        className="mt-8"
      >
        ← Read Letter Again
      </Button>
    </PageBackground>
  );
}
