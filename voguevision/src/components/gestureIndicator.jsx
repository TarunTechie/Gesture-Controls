import React from 'react';

const GestureIndicator = () => {
  return (
    <div className="relative group">
      <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/30 rounded-full p-1.5 group-hover:bg-white/20 transition-all duration-300 animate-pulse-subtle">
        <img 
          src="./gesture_icon/wave.svg" 
          alt="Wave gesture" 
          className="w-full h-full"
          style={{ filter: 'invert(100%)' }}
        />
      </div>
      <div className="absolute opacity-0 group-hover:opacity-100 -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-2 py-1 rounded whitespace-nowrap transition-opacity duration-200">
        Use hand gestures
      </div>
      
      {/* Subtle ping animation to draw attention */}
      <span className="absolute inset-0 rounded-full border border-white/30 animate-ping-slow"></span>
      
      <style jsx>{`
        @keyframes pulse-subtle {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.5); opacity: 0; }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        .animate-ping-slow {
          animation: ping-slow 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default GestureIndicator;