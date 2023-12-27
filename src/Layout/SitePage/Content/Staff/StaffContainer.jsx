import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../../redux/usersReducer';
import { selectAllUsers } from '../../../../redux/usersSelector';
import Staff from './Staff';

export default function StaffContainer(props) {

  const dispatch = useDispatch();
  let users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <Staff users={users} />
  );
}
