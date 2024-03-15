import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate,Outlet } from 'react-router-dom';

const ProtectedRoutes = ({isAdmin}) => {
  const { isAuthenticated,loading,user} = useSelector(state => state.user) 
  if (isAuthenticated === false && loading===false) {
    return <Navigate to='/login' />;
  }
  if (isAdmin === true&&loading===false&&user.role!=="admin") {
    return <Navigate to='/login' />;
  }
  
    return <Outlet />;
  
}

export default ProtectedRoutes
