import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import GestureDetect from "./gesturesDetect";
import { useState, useEffect } from "react";

export default function Header({ heading }) {
  const [glowEffect, setGlowEffect] = useState(false);
  
  // Animation effect for the header
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowEffect(prev => !prev);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="grid p-5 h-fit w-screen relative z-20">
      <div className="flex justify-between items-center relative">
        {/* Logo with subtle hover effect */}
        <Link to={"/"} className="transition-transform duration-300 hover:scale-105">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full blur opacity-30"></div>
            <img src="./logo.svg" alt="Logo" className="relative z-10" />
          </div>
        </Link>

        {/* Center header with gradient border and animation */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className={`p-0.5 border-2 rounded-full bg-gradient-to-r from-[#4A08D7] to-[#B805DF] ${glowEffect ? 'shadow-lg shadow-purple-500/50' : ''} transition-shadow duration-1000`}>
            <div className="bg-[#210632] h-fit text-xl px-2 py-2 items-center rounded-full relative overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-30 animate-gradient-shift"></div>
              <span className="flex items-center bg-white/20 backdrop-blur-sm px-20 py-4 rounded-full gap-4 text-white font-bold relative z-10">
                <img src="/icons/header.svg" className="h-10 animate-pulse-subtle" alt="Header Icon" />
                <h1 className="tracking-wider">{heading.toUpperCase()}</h1>
              </span>
            </div>
          </div>
        </div>

        {/* Cart icon with notification badge */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center bg-white/30 hover:bg-white/40 backdrop-blur-md border-2 border-white/60 rounded-full w-12 h-12 p-2 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/40">
            <ShoppingCart className="text-white" size={24} />
            <div className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </div>
          </div>
        </div>
      </div>

      <span className="absolute w-1/8 right-30">
        <GestureDetect />
      </span>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes pulse-subtle {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .animate-gradient-shift {
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </header>
  );
}