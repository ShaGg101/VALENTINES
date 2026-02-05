import PageBackground from '../components/PageBackground';
import HeartIcon from '../components/HeartIcon';
import Button from '../ui/Button';

/**
 * Love Letter page - first page showing the heartfelt message
 * @param {Object} props
 * @param {Object} props.config - App configuration
 * @param {function} props.onContinue - Handler for continue button
 */
export default function LoveLetter({ config, onContinue }) {
  return (
    <PageBackground>
      {/* Top decorative pulsing hearts */}
      <div className="flex items-center gap-2 mb-8">
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

      {/* Love letter card */}
      <div 
        className="animate-slide-in max-w-md px-6 sm:px-8 py-10 sm:py-12 rounded-3xl shadow-2xl mx-4"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '2px solid color-mix(in srgb, var(--color-secondary) 40%, transparent)',
        }}
      >
        {/* Letter content */}
        <div className="mb-8">
          <p 
            className="font-serif-elegant text-lg sm:text-xl leading-relaxed text-center mb-6"
            style={{ color: 'var(--color-foreground)' }}
          >
            {config.love_letter}
          </p>
          
          {/* Divider */}
          <div 
            className="w-12 h-0.5 mx-auto mb-4 opacity-30"
            style={{ backgroundColor: 'var(--color-primary)' }}
          />
          
          {/* Signature */}
          <p 
            className="font-serif-elegant text-base sm:text-lg italic text-center"
            style={{ color: 'color-mix(in srgb, var(--color-foreground) 60%, transparent)' }}
          >
            {config.letter_signature}
          </p>
        </div>
      </div>

      {/* Continue button */}
      <Button
        variant="primary"
        onClick={onContinue}
        ariaLabel="Continue to valentine question"
        className="mt-10 sm:mt-12"
      >
        {config.next_button_text} →
      </Button>

      {/* Bottom decorative hearts */}
      <div className="flex items-center gap-3 mt-10 sm:mt-12 opacity-50">
        <HeartIcon size={16} />
        <HeartIcon size={20} />
        <HeartIcon size={16} />
      </div>
    </PageBackground>
  );
}
