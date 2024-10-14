import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getToken } from '../redux/service';

const PrivateRoute = ({ children }) => {
  const token = getToken();
  console.log(token)
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
