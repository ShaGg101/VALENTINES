import { useState, useCallback, useEffect, useRef } from 'react';
import PageBackground from '../components/PageBackground';
import HeartIcon from '../components/HeartIcon';
import Polaroid, { PhotoPlaceholder } from '../components/Polaroid';
import Button from '../ui/Button';
import SparkleIcon from '../components/SparkleIcon';

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
  const [showInvitation, setShowInvitation] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [noProgress, setNoProgress] = useState(0);

  // Keep track of the No button DOM node so we can compute bounds
  const noButtonRef = useRef(null);
  // If null, keep default (relative) behavior. Otherwise uses fixed constrained coords
  const [constrainedPos, setConstrainedPos] = useState(null);

  useEffect(() => {
    // If position is default (0,0) treat as not positioned (relative)
    if (!noButtonPosition || (noButtonPosition.x === 0 && noButtonPosition.y === 0)) {
      setConstrainedPos(null);
      return;
    }

    const updatePos = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const btn = noButtonRef.current;
      const btnW = btn ? btn.offsetWidth : 140; // fallback estimates
      const btnH = btn ? btn.offsetHeight : 48;
      const margin = 16;
      // Compute maximum allowed top/left so the button stays fully visible
      const maxLeft = Math.max(margin, vw - btnW - margin);
      const maxTop = Math.max(margin, vh - btnH - margin);

      let x = noButtonPosition.x;
      let y = noButtonPosition.y;

      // If out of bounds, pick a random valid location inside the viewport
      const outOfBounds = x < margin || x > maxLeft || y < margin || y > maxTop;
      if (outOfBounds) {
        x = Math.round(margin + Math.random() * (maxLeft - margin));
        y = Math.round(margin + Math.random() * (maxTop - margin));
      } else {
        x = Math.min(Math.max(margin, x), maxLeft);
        y = Math.min(Math.max(margin, y), maxTop);
      }

      setConstrainedPos({ x, y });
    };

    updatePos();
    window.addEventListener('resize', updatePos);
    return () => window.removeEventListener('resize', updatePos);
  }, [noButtonPosition]);

  
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

  const handlePaperClick = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        setShowInvitation(true);
      }, 400); // Flip halfway point
    }
  };

  // Show love letter message initially
  if (!showInvitation) {
    return (
      <PageBackground>
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          {/* Flippable Paper with Message */}
          <div
            className="relative cursor-pointer group"
            onClick={handlePaperClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePaperClick();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Tap to reveal the invitation"
            style={{
              perspective: '1000px',
            }}
          >
            <div
              className={`relative bg-white shadow-2xl rounded-lg p-8 sm:p-12 max-w-md w-full transform transition-transform duration-300 ${isFlipping ? 'animate-flip-paper' : ''} hover:scale-105`}
              style={{
                transformStyle: 'preserve-3d',
                minHeight: '400px',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF9F9 100%)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 10px 30px rgba(229,115,115,0.1)',
              }}
            >
              {/* Decorative corner sparkles */}
              <div className="absolute top-4 left-4 opacity-30">
                <SparkleIcon size={20} className="animate-sparkle" />
              </div>
              <div className="absolute top-4 right-4 opacity-30">
                <SparkleIcon size={20} className="animate-sparkle" style={{ animationDelay: '0.5s' }} />
              </div>
              <div className="absolute bottom-4 left-4 opacity-30">
                <HeartIcon size={16} className="animate-pulse-heart" style={{ animationDelay: '0.3s' }} />
              </div>
              <div className="absolute bottom-4 right-4 opacity-30">
                <HeartIcon size={16} className="animate-pulse-heart" style={{ animationDelay: '0.8s' }} />
              </div>

              {/* Message Content */}
              <div className="flex flex-col items-center justify-center h-full py-8">
                <HeartIcon 
                  size={48} 
                  className="mb-8 animate-pulse-heart" 
                  style={{ color: 'var(--color-primary)' }}
                />
                
                <p 
                  className="font-serif-elegant text-xl sm:text-2xl text-center leading-relaxed mb-12"
                  style={{ color: 'var(--color-foreground)' }}
                >
                  When I'm with you, the world feels like a better place. I can't wait to create more beautiful memories together.
                </p>

                {/* Tap instruction */}
                <div className="flex flex-col items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                  <p 
                    className="font-sans-soft text-sm uppercase tracking-wide"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Tap the paper
                  </p>
                  <div className="flex gap-1">
                    <HeartIcon size={12} className="animate-pulse-heart" style={{ animationDelay: '0s' }} />
                    <HeartIcon size={12} className="animate-pulse-heart" style={{ animationDelay: '0.2s' }} />
                    <HeartIcon size={12} className="animate-pulse-heart" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageBackground>
    );
  }

  // Show invitation after flip
  return (
    <PageBackground>
      {/* Content wrapper (no page-level flip) */}
      <div className="animate-slide-up flex flex-col items-center justify-center mx-auto max-w-2xl px-4 py-12" style={{ transformStyle: 'preserve-3d' }}>
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
          ref={noButtonRef}
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
            // If constrainedPos is null, fall back to original behavior (relative unless coords provided)
            position: constrainedPos == null ? (noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'relative' : 'fixed') : 'fixed',
            left: constrainedPos ? `${constrainedPos.x}px` : (noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.x}px`),
            top: constrainedPos ? `${constrainedPos.y}px` : (noButtonPosition.x === 0 && noButtonPosition.y === 0 ? 'auto' : `${noButtonPosition.y}px`),
            transition: 'left 0.25s ease-out, top 0.25s ease-out, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
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
            {isTransformed ? 'Yes!' : config.no_button_text}
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

      {/* Back button 
        <Button
          variant="ghost"
          onClick={onBack}
          ariaLabel="Go back to read the letter again"
          className="mt-8"
        >
          ← Read Letter Again
        </Button>
        */}
      </div>
    </PageBackground>
  );
}
