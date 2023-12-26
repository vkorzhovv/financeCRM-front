import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserControls from './UserControls';
import { getMe, logout } from '../../../../redux/authReducer';
import { selectFirstNameMe, selectLastNameMe, selectUsernameMe, selectUserTypeMe } from '../../../../redux/authSelectors';

export default function UserControlsContainer(props) {

  const dispatch = useDispatch();

  const handleClick = (() => {
    dispatch(logout());
  })

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  const firstName = useSelector(selectFirstNameMe);
  const lastName = useSelector(selectLastNameMe);
  const username = useSelector(selectUsernameMe);
  const userType = useSelector(selectUserTypeMe);

  return (
    <UserControls
      handleClick={handleClick}
      firstName={firstName}
      lastName={lastName}
      username={username}
      userType={userType}
    />
  );
}
