import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuth } from '../../redux/authSelectors';
import Login from './Login';

export default function LoginContainer(props) {

  const isAuth = useSelector(selectIsAuth);

  return isAuth ? <Navigate to='/' /> : <Login />;
}
