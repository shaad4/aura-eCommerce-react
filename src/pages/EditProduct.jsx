import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { updateProductAsync } from '../features/productsSlice'

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products);

    const product = products.find(item => item.id === id);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (product) {
            reset(product);
        }
    }, [product, reset]);

    const onSubmit = (data) => {
        dispatch(updateProductAsync({ id, data }));
        navigate('/my-listing');
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white font-sans text-black pt-24 pb-12">
            <div className="w-full max-w-xl p-8 sm:p-12">
                
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold tracking-tight mb-2">Edit Listing.</h1>
                    <p className="text-gray-500 text-sm">Update the details for "{product.title}".</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Title Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2 ml-4">Product Title</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            {...register("title", { required: true })}
                        />
                    </div>

                    {/* Price Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2 ml-4">Price</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                            <input
                                type="number"
                                placeholder="Price"
                                className="w-full pl-10 pr-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                                {...register("price", { required: true, min: 1 })}
                            />
                        </div>
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-2 ml-4">Description</label>
                        <textarea
                            placeholder="Description"
                            className="w-full px-6 py-4 rounded-3xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none h-32"
                            {...register("description", { required: true })}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-4">
                        <button 
                            type="submit"
                            className="flex-1 bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold py-4 rounded-full transition-colors"
                        >
                            Save Changes
                        </button>
                        
                        <button 
                            type="button"
                            onClick={() => navigate('/my-listing')}
                            className="flex-1 bg-white hover:bg-gray-50 border border-gray-200 text-black font-medium py-4 rounded-full transition-colors"
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}