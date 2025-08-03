import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenExpired } from '../lib/checkAuthToken';

const PrivateRoute = () => {
  const token = localStorage.getItem('adminToken');

  // Haddii token la waayo ama uu dhacay
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }

  // Haddii token-ka sax yahay
  return <Outlet />;
};

export default PrivateRoute;
