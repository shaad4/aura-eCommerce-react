import React from 'react';
import { Link } from "react-router-dom";

export default function GlobalCrash() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 font-sans text-center relative overflow-hidden">
      
      {/* Intense Red Aura Background for Critical Crash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-red-600/15 blur-[120px] md:blur-[180px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center max-w-2xl px-6">
        
        {/* Pulsing Alert Icon */}
        <div className="w-20 h-20 mb-8 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl animate-pulse"></div>
          <div className="relative z-10 bg-black/50 border border-red-500/30 w-full h-full rounded-2xl flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-4">
          System Crash<span className="text-red-500">.</span>
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-md leading-relaxed">
          A critical error occurred and the application could not continue. The Aura has been disrupted. Please reboot the environment or return to safety.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          
          <button
            onClick={() => window.location.reload()}
            className="group px-8 py-3.5 bg-[#d6ff41] text-black rounded-full hover:bg-[#cbf730] transition-all duration-300 font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(214,255,65,0.15)] hover:shadow-[0_0_30px_rgba(214,255,65,0.3)] hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180 duration-500">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Reboot System
          </button>

          <Link
            to="/"
            className="group px-8 py-3.5 bg-transparent hover:bg-white/5 border border-white/20 text-white rounded-full transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:border-white/40"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-1">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Return Home
          </Link>
          
        </div>
      </div>
    </div>
  );
}