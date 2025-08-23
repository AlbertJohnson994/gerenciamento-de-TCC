// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../store'; // Adjust the path if your store file is elsewhere

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   requiredRole?: string;
// }

// export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   children,
//   requiredRole
// }) => {
//   const { user, token } = useSelector((state: RootState) => state.auth);

//   console.log('ProtectedRoute - token:', token);
//   console.log('ProtectedRoute - user:', user);
//   console.log('ProtectedRoute - requiredRole:', requiredRole);

//   if (!token) {
//     console.log('No token, redirecting to login');
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && user?.role !== requiredRole) {
//     console.log('Role mismatch, redirecting to dashboard');
//     return <Navigate to="/dashboard" replace />;
//   }

//   console.log('Access granted to protected route');
//   return <>{children}</>;
// };

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "STUDENT" | "ORIENTADOR";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { token, user } = useSelector((state: RootState) => state.auth);

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Logged in but role mismatch
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
