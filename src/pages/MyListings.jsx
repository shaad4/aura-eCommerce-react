import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { deleteProductAsync } from '../features/productsSlice';

export default function MyListings() {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const { products, loading } = useSelector(state => state.products);

    const navigate = useNavigate();

    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    const myProducts = products.filter(
    item => item.sellerId === user?.id
    );

   

    if (!myProducts.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans text-black pt-24 px-6">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                        <line x1="12" y1="22.08" x2="12" y2="12"></line>
                    </svg>
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-2">No listings yet.</h3>
                <p className="text-gray-500 mb-8">You haven't posted any items for sale.</p>
                <Link to="/sell">
                    <button className="bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold py-4 px-8 rounded-full transition-colors">
                        Create Your First Listing
                    </button>
                </Link>
            </div>
        );
    }

  return (
        <div className="min-h-screen bg-white font-sans text-black pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-5xl font-bold tracking-tight">My Listings</h1>
                    <p className="text-gray-500 text-sm mt-4 sm:mt-0">
                        Managing {myProducts.length} {myProducts.length === 1 ? 'item' : 'items'}
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {myProducts.map(item => (
                        <div key={item.id} className="group relative flex flex-col">
                            
                            {/* Image Container */}
                            <div className="w-full aspect-square bg-[#f8f8f8] rounded-3xl mb-5 overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className={`object-cover w-full h-full mix-blend-multiply transition-all duration-300 ${item.isSold ? 'grayscale opacity-60' : 'group-hover:scale-105'}`}
                                />
                                
                                {/* SOLD Badge */}
                                {item.isSold && (
                                    <div className="absolute top-4 left-4 bg-black text-white text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-md">
                                        Sold
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex justify-between items-start gap-4 px-1">
                                <div className="flex-1 min-w-0">
                                    <h3 className={`font-semibold text-lg truncate ${item.isSold ? 'text-gray-500 line-through' : 'text-black'}`}>
                                        {item.title}
                                    </h3>
                                </div>
                                <p className={`font-semibold text-lg whitespace-nowrap ${item.isSold ? 'text-gray-400' : 'text-black'}`}>
                                    ₹{item.price}
                                </p>
                            </div>
                            
                            {/* Edit & Delete Action Buttons */}
                            {!item.isSold && (
                               <div className="flex gap-3 mt-4">
                                    {/* Edit Button: Clean, outlined pill */}
                                    <button
                                        onClick={() => navigate(`/edit/${item.id}`)}
                                        className="flex-1 border border-gray-200 text-black hover:border-black rounded-full py-2 transition-colors font-medium text-sm text-center"
                                    >
                                        Edit
                                    </button>

                                    {/* Delete Button: Subtle red tint, matching pill shape */}
                                    <button
                                        onClick={() => {
                                            if(window.confirm("Are you sure you want to delete this listing?")) {
                                                dispatch(deleteProductAsync(item.id));
                                            }
                                        }}
                                        className="flex-1 border border-red-100 bg-red-50 hover:bg-red-100 text-red-600 rounded-full py-2 transition-colors font-medium text-sm text-center"
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
