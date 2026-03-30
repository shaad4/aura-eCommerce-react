import React from 'react';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 font-sans text-center relative overflow-hidden">
      
      {/* Background Aura/Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#d6ff41]/5 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Massive 404 Text */}
        <h1 className="text-8xl md:text-9xl font-bold tracking-tighter text-white mb-2">
          404<span className="text-[#d6ff41]">.</span>
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-200 mb-6 tracking-tight">
          Lost in the Aura.
        </h2>
        
        <p className="text-gray-400 max-w-md mb-10 text-sm md:text-base px-4">
          The page you're looking for seems to have vanished into the void or never existed in the first place. Let's get you back to familiar territory.
        </p>

        {/* Call to Action Button */}
        <Link 
          to="/" 
          className="group bg-[#d6ff41] text-black px-8 py-3.5 rounded-full hover:bg-[#cbf730] transition-all duration-300 font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(214,255,65,0.15)] hover:shadow-[0_0_30px_rgba(214,255,65,0.3)] hover:-translate-y-0.5"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="m12 19-7-7 7-7"/>
            <path d="M19 12H5"/>
          </svg>
          Return Home
        </Link>
      </div>
    </div>
  );
}