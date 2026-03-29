import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrdersAsync } from '../features/ordersSlice'
import { Link } from 'react-router-dom'

export default function MyOrders() {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(fetchOrdersAsync());
    }, [dispatch]);

   if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans text-black pt-24 px-6">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                        <path d="m3.3 7 8.7 5 8.7-5"></path>
                        <path d="M12 22V12"></path>
                    </svg>
                </div>
                <h3 className="text-3xl font-bold tracking-tight mb-2">No orders yet.</h3>
                <p className="text-gray-500 mb-8">When you buy an item, your receipt will show up here.</p>
                <Link to="/products">
                    <button className="bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold py-4 px-8 rounded-full transition-colors">
                        Start Shopping
                    </button>
                </Link>
            </div>
        );
    }

 return (
        <div className="min-h-screen bg-white font-sans text-black pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-5xl font-bold tracking-tight">Order History</h1>
                    <p className="text-gray-500 text-sm mt-4 sm:mt-0">
                        {orders.length} {orders.length === 1 ? 'purchase' : 'purchases'} total
                    </p>
                </div>

                {/* Orders List */}
                <div className="space-y-6">
                    {orders.map(order => (
                        <div 
                            key={order.id} 
                            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 border border-gray-100 rounded-3xl hover:border-gray-200 transition-colors bg-white shadow-sm"
                        >
                            {/* Product Image Square */}
                            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#f8f8f8] rounded-2xl flex-shrink-0 flex items-center justify-center p-3">
                                <img 
                                    src={order.product?.image} 
                                    alt={order.product?.title} 
                                    className="w-full h-full object-contain mix-blend-multiply"
                                />
                            </div>

                            {/* Order Details */}
                            <div className="flex-1 min-w-0 w-full">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg sm:text-xl text-black truncate pr-4">
                                        {order.product?.title}
                                    </h3>
                                    <p className="font-bold text-lg text-black whitespace-nowrap">
                                        ₹{order.product?.price}
                                    </p>
                                </div>
                                
                                {/* Order Metadata */}
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-4">
                                    {/* Order Status Badge */}
                                    <div className="inline-flex items-center gap-1.5 bg-[#d6ff41]/20 text-[#8cb300] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-max">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                        Order Confirmed
                                    </div>
                                    
                                    {/* Order ID Reference */}
                                    <p className="text-xs text-gray-400 font-mono">
                                        Order ID: {order.id.substring(0, 8).toUpperCase()}
                                    </p>
                                </div>
                            </div>
                            
                            
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}