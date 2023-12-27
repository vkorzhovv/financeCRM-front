import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, getContractors, getEmployees } from '../../../../../redux/usersReducer';
import { selectClients, selectContractors, selectEmployees } from '../../../../../redux/usersSelector';
import StaffContent from './StaffContent';

export default function StaffContentContainer(props) {

  const dispatch = useDispatch();

  const [users, setUsers] = useState(props.users);

  const contractors = useSelector(selectContractors);
  const employees = useSelector(selectEmployees);
  const clients = useSelector(selectClients);

  useEffect(() => {
    setUsers(props.users)
    dispatch(getClients())
    dispatch(getEmployees())
    dispatch(getContractors())
  }, [dispatch, props.users])

  return (
    <StaffContent
      users={users}
      contractors={contractors}
      employees={employees}
      clients={clients}
    />
  );
}
