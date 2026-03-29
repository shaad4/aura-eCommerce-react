import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, removeFromCart } from '../features/cartSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Cart() {
    const {items} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const cartTotal = items.reduce((total, item) => total + Number(item.price), 0);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        toast.info("Removed From Bag")
    }

    const handleClear = () => {
        dispatch(clearCart());
        toast.info("Bag cleared");
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans text-black pt-24 px-6">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    {/* Simple minimalist shopping bag SVG */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-2">Your bag is empty.</h3>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                <Link to="/products">
                    <button className="bg-black text-white hover:bg-gray-800 font-semibold py-4 px-8 rounded-full transition-colors">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-black pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto">
                
                <h1 className="text-5xl font-bold tracking-tight mb-12 border-b border-gray-100 pb-8">
                    Your Bag
                </h1>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                    
                    {/* Left Column: Cart Items List */}
                    <div className="flex-1">
                        <div className="space-y-8">
                            {items.map((item) => (
                                <div key={item.id} className="flex items-center gap-6 group">
                                    
                                    {/* Product Image Square */}
                                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#f8f8f8] rounded-3xl flex-shrink-0 flex items-center justify-center p-4">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg sm:text-xl text-black truncate">
                                            {item.title}
                                        </h3>
                                        {/* Optional: Add category or extra details here if you have them */}
                                        <p className="text-gray-500 text-sm mt-1">Qty: 1</p>
                                    </div>

                                    {/* Price & Remove Action */}
                                    <div className="flex flex-col items-end gap-2 sm:gap-4">
                                        <p className="font-semibold text-lg sm:text-xl text-black">
                                            ₹{item.price}
                                        </p>
                                        <button 
                                            onClick={() => handleRemove(item.id)}
                                            className="text-sm font-medium text-gray-400 hover:text-red-500 transition-colors underline-offset-4 hover:underline"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-[#f8f8f8] rounded-3xl p-8 sticky top-32">
                            <h3 className="text-2xl font-bold tracking-tight mb-6">Summary</h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4 flex justify-between items-center mt-4">
                                    <span className="font-semibold text-lg text-black">Total</span>
                                    <span className="font-bold text-2xl text-black">₹{cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Primary Checkout Action */}
                            <Link to="/checkout" className="block w-full">
                                <button className="w-full bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold py-4 rounded-full transition-colors mb-4">
                                    Go to Checkout
                                </button>
                            </Link>

                            {/* Secondary Clear Cart Action */}
                            <button 
                                onClick={handleClear}
                                className="w-full bg-white hover:bg-gray-50 border border-gray-200 text-black font-medium py-4 rounded-full transition-colors"
                            >
                                Clear Bag
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
