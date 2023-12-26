import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUserItem } from '../../../../redux/userItemReducer';
import { selectUserItem } from '../../../../redux/userItemSelector';
import StaffItemPage from './StaffItemPage';

export default function StaffItemPageContainer(props) {

  const dispatch = useDispatch();

  let { userId } = useParams();

  useEffect(() => {
    dispatch(getUserItem(userId))
  }, [dispatch, userId])

  const user = useSelector(selectUserItem);

  return (
    <StaffItemPage user={user} />
  );
}
