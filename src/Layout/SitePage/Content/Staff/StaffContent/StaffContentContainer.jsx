import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterUser, getClients, getContractors, getEmployees } from '../../../../../redux/usersReducer';
import { selectFilteredClients, selectFilteredContractors, selectFilteredEmployees } from '../../../../../redux/usersSelector';
import StaffContent from './StaffContent';

export default function StaffContentContainer(props) {

  const dispatch = useDispatch();

  const contractors = useSelector(selectFilteredContractors);
  const employees = useSelector(selectFilteredEmployees);
  const clients = useSelector(selectFilteredClients);

  useEffect(() => {
    Promise.all([
      dispatch(getClients()),
      dispatch(getEmployees()),
      dispatch(getContractors())
    ])
      .then(() => {
        dispatch(filterUser(
          sessionStorage.getItem('userBalanceStart') || '-Infinity',
          sessionStorage.getItem('userBalanceEnd') || 'Infinity'
        ))
      })

  }, [dispatch])

  return (
    <StaffContent
      contractors={contractors}
      employees={employees}
      clients={clients}
    />
  );
}
