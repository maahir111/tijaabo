import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRedirect = () => {
  const isAuthenticated = localStorage.getItem('adminToken');
  
  return isAuthenticated ? 
    <Navigate to="/admin/dashboard" replace /> : 
    <Navigate to="/admin/login" replace />;
};

export default AdminRedirect; 