import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, getContractors, getEmployees } from '../../../../../redux/usersReducer';
import { selectClients, selectContractors, selectEmployees, selectFilteredClients, selectFilteredContractors, selectFilteredEmployees } from '../../../../../redux/usersSelector';
import StaffContent from './StaffContent';

export default function StaffContentContainer(props) {

  const dispatch = useDispatch();

  const contractors = useSelector(selectFilteredContractors);
  const employees = useSelector(selectFilteredEmployees);
  const clients = useSelector(selectFilteredClients);

  useEffect(() => {
    dispatch(getClients())
    dispatch(getEmployees())
    dispatch(getContractors())
  }, [dispatch])

  return (
    <StaffContent
      contractors={contractors}
      employees={employees}
      clients={clients}
    />
  );
}
