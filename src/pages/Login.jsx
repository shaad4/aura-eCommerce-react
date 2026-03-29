import React from 'react'
import { useForm } from "react-hook-form"
import { loginAsync } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit , formState : {errors}} = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { loading } = useSelector((state) => state.auth);

    const onSubmit = async (data) => {

        await dispatch(loginAsync(data)).unwrap();

        navigate("/products")
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white font-sans text-black">
            {/* Main Login Container */}
            <div className="w-full max-w-md p-8 sm:p-12">
                
                {/* Header matching the bold, minimal typography */}
                <div className="mb-12">
                    <h1 className="text-5xl font-bold tracking-tight mb-2">Log in</h1>
                    <p className="text-gray-500 text-sm">Welcome back. Enter your details.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs ml-4 mt-2 block">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs ml-4 mt-2 block">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {/* Submit Button (Matching the lime green accent) */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold py-4 rounded-full transition-colors disabled:opacity-50 mt-4"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form> 

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                        Don't have a account?{' '}
                        <Link to="/signup" className="text-black font-medium hover:underline transition-colors">
                        Create one
                        </Link>
                    </p>
                </div>  
                
                
            </div>
        </div>
    );
}


