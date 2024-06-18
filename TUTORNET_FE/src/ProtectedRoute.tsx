import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import useCookie from './Hook/UserAuth';
import { LinearProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: ReactNode;
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { userData , isValidToken} = useCookie();
  const userRoleString = userData.role;

if (!isValidToken){
  return <LinearProgress color="secondary" />;
}
  const userRoles = userRoleString.split(',').map(role => role.trim());
  console.log('User roles array:', userRoles);

  const hasAccess = userRoles.some(role => roles.includes(role));
  console.log('Has access:', hasAccess);

  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
