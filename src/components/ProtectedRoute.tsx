import { useAuth } from '@/context/userContext';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/login',
}) => {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? <Outlet/> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;
