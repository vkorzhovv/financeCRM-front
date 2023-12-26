import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../../redux/usersReducer';
import Staff from './Staff';

export default function StaffContainer(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Staff />
  );
}
