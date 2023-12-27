import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getClients, getContractors, getEmployees } from "../../../../../redux/usersReducer";
import { selectClients, selectContractors, selectEmployees } from "../../../../../redux/usersSelector";
import ProjectAddPopup from "./ProjectAddPopup";

export default function ProjectAddPopupContainer(props) {

  const dispatch = useDispatch();

  const contractors = useSelector(selectContractors);
  const employees = useSelector(selectEmployees);
  const clients = useSelector(selectClients);

  useEffect(() => {
    dispatch(getClients())
    dispatch(getEmployees())
    dispatch(getContractors())
  }, [dispatch])

  return (
    <ProjectAddPopup
      submitText={props.submitText}
      handleClickClose={props.handleClickClose}
      popupHeader={props.popupHeader}
      contractors={contractors}
      employees={employees}
      clients={clients}
      close={props.close}
      detail={props.detail}
      project={props.project}
    />
  )
}




