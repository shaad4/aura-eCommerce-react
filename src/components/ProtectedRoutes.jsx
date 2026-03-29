import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
    const {isLoggedIn} = useSelector(state => state.auth)

    if (!isLoggedIn){
        return <Navigate to="/login" />
    }
  
    return children;

}


