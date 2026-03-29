import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signupAsync } from "../features/authSlice";
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Assuming your auth slice has a loading state like the login page
  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (data) => {
    await dispatch(signupAsync(data)).unwrap();

    navigate("/")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans text-black pt-24 pb-12">
      <div className="w-full max-w-md p-8 sm:p-12">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-2">Sign up</h1>
          <p className="text-gray-500 text-sm">Create your Aura account.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Username Input */}
          <div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && (
              <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.username.message}</span>
            )}
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.email.message}</span>
            )}
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              {...register("password", { 
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-6 py-4 rounded-full border border-gray-300 placeholder-gray-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === watch("password") || "Passwords do not match"
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs ml-4 mt-2 block">{errors.confirmPassword.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#d6ff41] hover:bg-[#cbf730] text-black font-semibold py-4 rounded-full transition-colors disabled:opacity-50 mt-4"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link to="/" className="text-black font-medium hover:underline transition-colors">
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Signup;