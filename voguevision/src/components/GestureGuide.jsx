import React from 'react';

/**
 * GestureGuide Component
 * 
 * A reusable component to display available gesture controls
 * 
 * @param {Object} gestures - Dictionary of gestures with keys as gesture names and values as objects with icon and action
 * @param {string} position - Position of the guide (top, bottom)
 */
const GestureGuide = ({ gestures, position = "top" }) => {
  // Determine positioning classes
  const positionClass = position === "bottom" 
    ? "bottom-4" 
    : "relative mt-4"; // Changed from fixed positioning to relative with margin

  return (
    <div className={`flex justify-center ${positionClass} z-30`}>
      <div className="bg-[#3c2e58]/80 backdrop-blur-md rounded-full  px-4 shadow-lg border border-purple-500/30">
        <div className="flex items-center gap-3">
          {Object.entries(gestures).map(([key, { icon, action }]) => (
            <div key={key} className="flex items-center gap-2 px-3 py-1 border-r last:border-r-0 border-purple-400/20">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center">
                  <img 
                    src={icon} 
                    alt={key} 
                    className="w-12 h-12 opacity-90"
                    style={{ filter: 'invert(100%)' }}
                  />
                </div>
                <span className="text-white/90 text-xs whitespace-nowrap mt-1">{action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestureGuide;