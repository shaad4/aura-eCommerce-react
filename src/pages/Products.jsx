import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync } from '../features/productsSlice';
import { addToCart } from '../features/cartSlice';
import {toast} from 'react-toastify';

export default function Products() {

    const dispatch = useDispatch();

    const { products, loading } = useSelector(
        (state) => state.products
    );

    const productList = products.filter(item => !item.isSold)
    

    useEffect(() => {
        dispatch(fetchProductsAsync());
    },[dispatch])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-black pt-32 pb-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 border-b border-gray-100 pb-8">
                    <h1 className="text-5xl font-bold tracking-tight">Catalog</h1>
                    <p className="text-gray-500 text-sm mt-4 sm:mt-0">
                        Showing {productList?.length || 0} results
                    </p>
                </div>

                {/* Empty State */}
                {!loading && productList?.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <p>No products found in the catalog.</p>
                    </div>
                )}

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                    {productList?.map((item) => (
                        <div key={item.id} className="group cursor-pointer flex flex-col">
                            
                            {/* Image Container with updated object-cover fill */}
                            <div className="w-full aspect-square bg-[#f8f8f8] rounded-3xl mb-5 overflow-hidden relative transition-colors duration-300 group-hover:bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    // object-contain has been changed to object-cover to make the image fill the container
                                    className="object-cover w-full h-full mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Product Details */}
                            <div className="flex justify-between items-start gap-4 px-1">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-lg text-black truncate">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm truncate mt-1">
                                        {item.description}
                                    </p>
                                </div>
                                
                                <p className="font-semibold text-lg text-black whitespace-nowrap">
                                    ₹{item.price}
                                </p>
                            </div>
                            
                            {/* "Add to Cart" button (stays the same, but now shows on full images) */}
                            <button 
                                onClick={() => {
                                    dispatch(addToCart(item))
                                    console.log("Adding:", item);
                                    toast.success("Added to Cart")
                                }} 
                                className="mt-4 w-full bg-[#d6ff41] hover:bg-[#cbf730] text-black rounded-full py-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-semibold text-sm"
                            >
                                Add To Cart
                            </button>

                        </div>
                    ))}            
                </div>

            </div>
        </div>
    );
}
