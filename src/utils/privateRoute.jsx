import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { selectIsAuth } from "../redux/authSelectors";
import { useSelector } from 'react-redux';

export default function PrivateRoute({
  children,
}) {

  const isAuth = useSelector(selectIsAuth);

  return isAuth ? children : <Navigate to="/login" />;
};
