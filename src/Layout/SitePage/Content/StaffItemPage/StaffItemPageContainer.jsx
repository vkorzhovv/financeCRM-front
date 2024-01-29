import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getUserPayments } from '../../../../redux/paymentReducer';
import { selectUserPayments } from '../../../../redux/paymentSelector';
import { getUserItem } from '../../../../redux/userItemReducer';
import { selectUserItem } from '../../../../redux/userItemSelector';
import { getClients, getContractors, getEmployees} from '../../../../redux/usersReducer';
import { selectClients, selectContractors, selectEmployees } from '../../../../redux/usersSelector';
import StaffItemPage from './StaffItemPage';

export default function StaffItemPageContainer(props) {

  const dispatch = useDispatch();

  let { userId } = useParams();

  const user = useSelector(selectUserItem);
  const clients = useSelector(selectClients);
  const contractors = useSelector(selectContractors);
  const employees = useSelector(selectEmployees);
  const userPayments = useSelector(selectUserPayments);

  useEffect(() => {
    const getList = (type) => {
      type === 'p' ? dispatch(getContractors()) : type === 'k' ? dispatch(getClients()) : dispatch(getEmployees());
    }
    dispatch(getUserPayments(userId));
    dispatch(getUserItem(userId));
    getList(user.user_type);
  }, [dispatch, userId, user.user_type])

  const userList = user.user_type === 'p' ? contractors : user.user_type === 'k' ? clients : employees;
  const userListTitle = user.user_type === 'p' ? 'Подрядчики' : user.user_type === 'k' ? 'Клиенты' : 'Сотрудники';

  return (
    <StaffItemPage
      user={user}
      userPayments={userPayments}
      userList={userList}
      userListTitle={userListTitle}
    />
  );
}
