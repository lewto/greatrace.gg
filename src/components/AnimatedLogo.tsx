import React, { useState, useEffect } from 'react';

const AnimatedLogo: React.FC<{ onHomeClick?: () => void }> = ({ onHomeClick }) => {
  const [lightsState, setLightsState] = useState<'off' | 'red' | 'green'>('off');
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const startSequence = () => {
      // Reset states
      setLightsState('off');
      setStartAnimation(false);
      
      // Start sequence
      setTimeout(() => {
        setLightsState('red');
        
        setTimeout(() => {
          setLightsState('green');
          
          // Wait a moment with green lights
          setTimeout(() => {
            setLightsState('off');
            // Start the .gg animation only after lights go off
            setStartAnimation(true);
            
            // Reset animation state
            setTimeout(() => {
              setStartAnimation(false);
            }, 2000);
          }, 1000);
        }, 1000);
      }, 500);
    };

    startSequence();
    const interval = setInterval(startSequence, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <button 
        onClick={onHomeClick}
        className="relative flex items-center hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#FF1801] focus:ring-offset-2 focus:ring-offset-[#0A0A0F] rounded-lg p-2"
      >
        <span className="text-5xl md:text-6xl font-black font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          GreatRace
        </span>
        <div className="relative ml-1">
          {/* Traffic Lights */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-6 flex space-x-1.5">
            {[1, 2, 3].map((light) => (
              <div
                key={light}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  lightsState === 'off'
                    ? 'bg-gray-800'
                    : lightsState === 'red'
                    ? 'bg-[#FF1801] shadow-[0_0_15px_rgba(255,24,1,0.7)]'
                    : 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)]'
                }`}
              />
            ))}
          </div>
          
          {/* .gg with animation */}
          <span 
            className={`text-5xl md:text-6xl font-black font-orbitron text-[#FF1801] inline-block ${
              startAnimation ? 'animate-gg-racing' : ''
            }`}
          >
            .gg
          </span>
          
          {/* Racing trail effect */}
          <div 
            className={`absolute top-1/2 -right-8 transform -translate-y-1/2 transition-opacity duration-300 ${
              startAnimation ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-8 h-2 bg-gradient-to-r from-[#FF1801] to-transparent animate-trail"></div>
          </div>
        </div>
      </button>
    </div>
  );
};

export default AnimatedLogo;