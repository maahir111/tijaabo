import React from 'react';  
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from "../lib/checkAuthToken";


const PrivateRoute = () => {
  const token = localStorage.getItem('adminToken'); // Check if admin token exists

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('adminToken');
    return <Navigate to='/admin/login' replace />;
  }

  // If authenticated, render the protected content
  return <Outlet />;
};  

export default PrivateRoute; 