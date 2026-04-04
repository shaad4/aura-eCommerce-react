import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
    const { user, loading} = useSelector(state => state.auth)

    if (loading){
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
            </div>
        ); 
    }
    if (!user){
        return <Navigate to="/login" />
    }
  
    return children;

}


