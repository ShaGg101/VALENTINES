import { useState, useCallback } from 'react';
import { useConfig } from './context/ConfigContext';
import LoveLetter from './pages/LoveLetter';
import Invitation from './pages/Invitation';
import Success from './pages/Success';

function App() {
  const { config } = useConfig();
  const [currentPage, setCurrentPage] = useState('letter');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);

  // Navigation handlers
  const handleContinue = useCallback(() => {
    setCurrentPage('invitation');
  }, []);

  const handleYes = useCallback(() => {
    setCurrentPage('success');
  }, []);

  const handleBack = useCallback(() => {
    setCurrentPage('letter');
    setDodgeCount(0);
    setNoButtonPosition({ x: 0, y: 0 });
  }, []);

  const handleBackToInvitation = useCallback(() => {
    setCurrentPage('invitation');
  }, []);

  // Enhanced No button dodge handler - moves across entire screen, away from cursor
  const handleNoDodge = useCallback((event) => {
    setDodgeCount(prev => prev + 1);
    
    // Get cursor/touch position
    const clientX = event.clientX || event.touches?.[0]?.clientX || window.innerWidth / 2;
    const clientY = event.clientY || event.touches?.[0]?.clientY || window.innerHeight / 2;
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Button dimensions (approximate)
    const buttonWidth = 140;
    const buttonHeight = 60;
    
    // Calculate safe zone boundaries (with padding from edges)
    const padding = 20;
    const minX = padding;
    const maxX = viewportWidth - buttonWidth - padding;
    const minY = padding;
    const maxY = viewportHeight - buttonHeight - padding;
    
    // Minimum distance from cursor to ensure button doesn't touch it
    const minDistanceFromCursor = 150;
    
    let newX, newY, attempts = 0;
    
    // Try to find a position far from the cursor
    do {
      newX = Math.random() * (maxX - minX) + minX;
      newY = Math.random() * (maxY - minY) + minY;
      
      // Calculate distance from cursor to new button center
      const buttonCenterX = newX + buttonWidth / 2;
      const buttonCenterY = newY + buttonHeight / 2;
      const distance = Math.sqrt(
        Math.pow(buttonCenterX - clientX, 2) + 
        Math.pow(buttonCenterY - clientY, 2)
      );
      
      // If far enough from cursor, use this position
      if (distance > minDistanceFromCursor || attempts > 20) {
        break;
      }
      attempts++;
    } while (attempts < 50);
    
    setNoButtonPosition({ x: newX, y: newY });
  }, []);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case 'letter':
        return (
          <LoveLetter 
            config={config} 
            onContinue={handleContinue} 
          />
        );
      case 'invitation':
        return (
          <Invitation
            config={config}
            onYes={handleYes}
            onBack={handleBack}
            onNoDodge={handleNoDodge}
            noButtonPosition={noButtonPosition}
            dodgeCount={dodgeCount}
          />
        );
      case 'success':
        return (
          <Success
            config={config}
            onBack={handleBack}
            onBackToInvitation={handleBackToInvitation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full overflow-auto">
      {renderPage()}
    </div>
  );
}

export default App;
