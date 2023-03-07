import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import { useAuth } from '@/context/Auth'

export function PrivateRoute({ children }) {
  const { user } = useAuth()
  console.log(user)

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}

export function PrivateRouteL({ children }) {
  const { user } = useAuth()

  if (user) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return children;
}