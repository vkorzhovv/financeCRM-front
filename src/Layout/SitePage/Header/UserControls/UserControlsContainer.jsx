import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserControls from './UserControls';
import { getMe, logout } from '../../../../redux/authReducer';
import { selectMe } from '../../../../redux/authSelectors';

export default function UserControlsContainer(props) {

  const dispatch = useDispatch();

  const handleClick = (() => {
    dispatch(logout());
  })

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  const me = useSelector(selectMe)

  return (
    <UserControls
      handleClick={handleClick}
      me={me}
    />
  );
}
