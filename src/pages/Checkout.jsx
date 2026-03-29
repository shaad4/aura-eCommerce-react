import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { markAsSoldAsync } from '../features/productsSlice';
import { clearCart } from '../features/cartSlice';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { addOrderAsync } from '../features/ordersSlice';

export default function Checkout() {
    const { items } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const [isProcessing, setIsProcessing] = useState(false);

    const cartTotal = items.reduce((total, item) => total + Number(item.price), 0);

    const handleCheckout = async () => {
        setIsProcessing(true);

        let hasError = false;

        try{
            for(let item of items){
                try{
                    await dispatch(markAsSoldAsync(item.id)).unwrap()
                    await dispatch(addOrderAsync(item)).unwrap();
                }catch(err){
                    toast.error(err)
                    hasError = true;
                    break;
                }
               
            }

           if(!hasError){
                dispatch(clearCart());
            
                toast.success("Purchase successful")
           }
        }catch(err){
            console.log(err)
            toast.error("Checkout failed")
        }finally{
            setIsProcessing(false);
        }
    }

    if (items.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans text-black pt-24 px-6">
                <div className="w-20 h-20 bg-[#d6ff41]/20 rounded-full flex items-center justify-center mb-6 text-[#a6d116]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-2">Order Complete</h3>
                <p className="text-gray-500 mb-8">Thank you for shopping with Aura.</p>
                <Link to="/products">
                    <button className="bg-black text-white hover:bg-gray-800 font-semibold py-4 px-8 rounded-full transition-colors">
                        Return to Catalog
                    </button>
                </Link>
            </div>
        );
    }

  return (
        <div className="min-h-screen flex items-center justify-center bg-white font-sans text-black pt-24 pb-12 px-6">
            <div className="w-full max-w-2xl">
                
                <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">Review your order</h1>

                <div className="bg-[#f8f8f8] rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                    
                    {/* Item List */}
                    <div className="space-y-4 mb-8">
                        {items.map(item => (
                            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2 shadow-sm">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                </div>
                                <p className="font-semibold text-black">₹{item.price}</p>
                            </div>
                        ))}
                    </div>

                    {/* Totals Section */}
                    <div className="border-t border-black/10 pt-6 mb-8 space-y-3">
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-500 text-sm">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="font-semibold text-xl">Total to pay</span>
                            <span className="font-bold text-3xl">₹{cartTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Primary Action */}
                    <button 
                        onClick={handleCheckout} 
                        disabled={isProcessing}
                        className="w-full bg-[#d6ff41] hover:bg-[#cbf730] text-black font-bold text-lg py-5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                        {isProcessing ? "Processing Securely..." : "Confirm Purchase"}
                    </button>

                    <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Secure checkout powered by Aura
                    </p>
                </div>
                
            </div>
        </div>
    );
}
