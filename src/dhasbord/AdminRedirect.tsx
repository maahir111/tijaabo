import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenExpired } from '../lib/checkAuthToken'; // Ensure this file exists

const AdminRedirect = () => {
  const token = localStorage.getItem('adminToken');

  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }

  return <Navigate to="/admin/dashboard" replace />;
};

export default AdminRedirect;
