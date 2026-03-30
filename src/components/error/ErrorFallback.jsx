import { Link } from "react-router-dom";

export default function ErrorFallback({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 font-sans w-full min-h-[50vh]">
      
      {/* Glassmorphic Error Card */}
      <div className="relative w-full max-w-lg p-8 md:p-12 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center text-center">
        
        {/* Subtle Error Glow inside the card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] bg-red-500/20 blur-[60px] pointer-events-none"></div>

        {/* Warning Icon */}
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20 relative z-10 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tighter text-white mb-3 relative z-10">
          System Error<span className="text-red-500">.</span>
        </h2>

        {/* Message */}
        <p className="text-gray-400 mt-2 max-w-sm relative z-10 text-sm md:text-base leading-relaxed">
          {message || "We couldn't load this component due to an unexpected glitch in the Aura. Try refreshing or head back to safety."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto relative z-10">
          
          <button
            onClick={() => window.location.reload()}
            className="group px-6 py-3 bg-[#d6ff41] text-black rounded-full hover:bg-[#cbf730] transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(214,255,65,0.15)] hover:shadow-[0_0_25px_rgba(214,255,65,0.3)] hover:-translate-y-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180 duration-500">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Reload Page
          </button>

          <Link
            to="/"
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-colors duration-300 font-medium flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Go Home
          </Link>
          
        </div>
      </div>
    </div>
  );
}