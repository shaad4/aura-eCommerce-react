import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, logoutAsync } from '../features/authSlice';

export default function Navbar() {
  const { isLoggedIn } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate("/");
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 font-sans">
      
      {/* Dark Glassmorphism Nav */}
      <nav className="flex items-center justify-between px-6 py-3 bg-black/80 backdrop-blur-md border border-white/10 shadow-lg rounded-full w-full max-w-4xl transition-all">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter text-white">
          Aura<span className="text-[#d6ff41]">.</span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          { isLoggedIn && (
             <Link to="/products" className="hover:text-white transition-colors">Buy</Link>

          )}

          {isLoggedIn && (
            <Link to="/sell" className="flex items-center gap-1 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Sell
            </Link>
          )}
          {isLoggedIn && (
            <Link to="/my-listing" className="hover:text-white transition-colors">My Listings</Link>

          )}
          {isLoggedIn && (
            <Link to="/orders" className="hover:text-white transition-colors">My orders</Link>

          )}
          
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6 text-sm font-medium text-white">
          
          {/* Cart / Bag Icon with Badge */}
          <Link to="/cart" className="relative flex items-center gap-1.5 hover:text-gray-300 transition-colors">
            Bag
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {/* Perfect Circle Count Badge */}
            {items.length > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#d6ff41] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                {items.length}
              </span>
            )}
          </Link>

          {/* Vertical Divider */}
          <div className="w-px h-4 bg-white/20 hidden sm:block"></div>

          {/* Auth Controls */}
          <div className="flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">Log in</Link>
                <Link to="/signup" className="bg-[#d6ff41] text-black px-4 py-2 rounded-full hover:bg-[#cbf730] transition-colors font-semibold">
                  Sign up
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-colors flex items-center gap-1.5"
              >
                Log out
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            )}
          </div>

        </div>
      </nav>
    </div>
  );
}