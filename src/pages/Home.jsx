import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-white font-sans text-black selection:bg-[#d6ff41] selection:text-black">
      
      {/* 1. HERO SECTION */}
      {/* pt-40 ensures it clears your fixed floating navbar */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left: Typography & CTAs */}
        <div className="flex-1 space-y-8 text-center lg:text-left z-10">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-[1.1]">
            Enter a new era of <span className="text-gray-400">buying and selling.</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto lg:mx-0">
            From vintage fashion to next-gen tech. Aura is the secure marketplace designed for seamless transactions and zero friction.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link to="/products">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold rounded-full transition-colors flex items-center justify-center gap-2">
                Start Shopping
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
            </Link>
            <Link to="/sell">
              <button className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-full transition-colors flex items-center justify-center gap-2">
                List an Item
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Floating Image (matching the reference) */}
        <div className="flex-1 relative w-full max-w-md mx-auto">
          {/* Abstract background shape to frame the image */}
          <div className="absolute inset-0 bg-gray-100 rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
          
          {/* Main Hero Image Square */}
          <div className="relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl">
            {/* Using a placeholder lifestyle/ecommerce image */}
            <img 
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
              alt="Aura Marketplace" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating 'Price Tag' Badge (like the €2,420 tag in the reference) */}
          <div className="absolute top-12 -left-8 md:-left-12 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-3 h-3 bg-[#d6ff41] rounded-full"></div>
            <p className="font-bold text-lg">Just Sold</p>
            <p className="text-gray-500 font-medium ml-2">₹ 14,999</p>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (matching the 200K, 200M€, 4.5/5 row) */}
      <section className="py-16 px-6 border-y border-gray-100 bg-[#f8f8f8]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <div className="pt-8 md:pt-0">
            <h2 className="text-5xl font-black tracking-tighter mb-2">500K+</h2>
            <p className="text-gray-500 text-sm">Active users trusting Aura.</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h2 className="text-5xl font-black tracking-tighter mb-2">₹120M</h2>
            <p className="text-gray-500 text-sm">In secure transactions this year.</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h2 className="text-5xl font-black tracking-tighter mb-2">100%</h2>
            <p className="text-gray-500 text-sm">Fraud protection guarantee.</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS (matching the overlapping white cards on an image background) */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        
        {/* Full-width container with rounded corners and background image */}
        <div className="relative w-full rounded-[3rem] overflow-hidden bg-black py-24 px-6 lg:px-16">
          
          {/* Background Image with dark overlay */}
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Shopping Lifestyle" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          
          <div className="relative z-10">
            
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
                Better selling, starts here.
              </h2>
              <p className="text-gray-300 text-lg">Whatever you're looking for, find it safely on Aura.</p>
            </div>

            {/* The 3 Overlapping Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Card 1 */}
              <div className="bg-white rounded-[2rem] p-8 flex flex-col justify-between aspect-[4/5] hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight mb-4">Secure<br/>Escrow</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Funds are held safely until the buyer confirms the item is exactly as described. Zero risk.
                  </p>
                </div>
                <button className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-[#d6ff41] hover:scale-110 transition-transform mt-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-[2rem] p-8 flex flex-col justify-between aspect-[4/5] hover:-translate-y-2 transition-transform duration-300 shadow-xl md:-translate-y-8">
                {/* The middle card is offset upwards to match the staggered look from the reference */}
                <div>
                  <h3 className="text-3xl font-bold tracking-tight mb-4">Lightning<br/>Fast Listings</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Snap a photo, write a quick description, and your item is live to millions in under 60 seconds.
                  </p>
                </div>
                <button className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-[#d6ff41] hover:scale-110 transition-transform mt-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-[2rem] p-8 flex flex-col justify-between aspect-[4/5] hover:-translate-y-2 transition-transform duration-300 shadow-xl">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight mb-4">Verified<br/>Community</h3>
                  <p className="text-gray-500 leading-relaxed">
                    Every user goes through our strict verification process. Deal with real people, always.
                  </p>
                </div>
                <button className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-[#d6ff41] hover:scale-110 transition-transform mt-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}