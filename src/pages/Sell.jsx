import { useForm } from 'react-hook-form'
import { useDispatch , useSelector} from 'react-redux'
import { addProductAsync } from '../features/productsSlice'
import { toast } from 'react-toastify'
import { uploadImageToCloudinary } from '../services/cloudinary'

export default function Sell(){
    const { register, handleSubmit, reset, formState : {errors} } = useForm();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.products || { loading: false });
    const { user } = useSelector(state => state.auth)
    
    const onSubmit = async (data) => {
        console.log("USER:", user);
        try {
            const file = data.image[0];

            const imageUrl = await uploadImageToCloudinary(file);

            const finalData = {
                ...data,
                sellerId : user.id,
                image : imageUrl
            };

            await dispatch(addProductAsync(finalData)).unwrap();

            toast.success("Product listed successfully!")
            reset();
        } catch (err){
            console.error("ADD PRODUCT ERROR:", err);
            toast.error("Failed to add product")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white font-sans text-black pt-24 pb-12">
            <div className="w-full max-w-xl p-8 sm:p-12">
                
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold tracking-tight mb-2">Sell on Aura.</h1>
                    <p className="text-gray-500 text-sm">List a new item in the catalog.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    
                    {/* Title Input */}
                    <div>
                        <input
                            type="text"
                            placeholder="Product Title"
                            className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            {...register("title", { required: "A title is required" })}
                        />
                        {errors.title && (
                            <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.title.message}</span>
                        )}
                    </div>

                    {/* Price Input */}
                    <div>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-medium">₹</span>
                            <input
                                type="number"
                                placeholder="Price"
                                step="0.01"
                                className="w-full pl-10 pr-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                                {...register("price", { 
                                    required: "Price is required", 
                                    min: { value: 1, message: "Price must be at least ₹1" } 
                                })}
                            />
                        </div>
                        {errors.price && (
                            <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.price.message}</span>
                        )}
                    </div>

                    {/* Description Textarea */}
                    <div>
                        <textarea
                            placeholder="Describe your product..."
                            className="w-full px-6 py-4 rounded-3xl border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none h-32"
                            {...register("description", { required: "Please provide a description" })}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.description.message}</span>
                        )}
                    </div>

                    {/* Image File Upload Input */}
                    <div>
                        <input 
                            type="file" 
                            accept="image/*"
                            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-gray-500 cursor-pointer 
                                       file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-black file:text-white hover:file:bg-gray-800 file:transition-colors file:cursor-pointer"
                            {...register("image", { required: "An image is required" })}
                        />
                        {errors.image && (
                            <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.image.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold py-4 rounded-full transition-colors disabled:opacity-50 mt-4"
                    >
                        {loading ? "Listing Product..." : "Add Product"}
                    </button>

                </form>
            </div>
        </div>
    );


}