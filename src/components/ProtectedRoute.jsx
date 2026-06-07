import React from 'react'
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("formify_token");

    if (!token) {
        return <Navigate to={"/login"} replace/>
    }
    return children;
}

export default ProtectedRoute