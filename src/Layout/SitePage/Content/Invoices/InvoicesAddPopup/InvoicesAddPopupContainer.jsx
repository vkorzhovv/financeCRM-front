import React, { useEffect } from "react";
import InvoicesAddPopup from "./InvoicesAddPopup";
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from "../../../../../redux/projectsReducer";
import { selectProjects } from "../../../../../redux/projectsSelector";
import { selectClients, selectContractors } from "../../../../../redux/usersSelector";
import { getClients, getContractors } from "../../../../../redux/usersReducer";


export default function InvoicesAddPopupContainer(props) {

  const dispatch = useDispatch()

  const projectsList = useSelector(selectProjects)
  const payersList = useSelector(selectClients)
  const receiversList = useSelector(selectContractors)

  useEffect(() => {
    dispatch(getProjects())
    dispatch(getClients())
    dispatch(getContractors())
  }, [dispatch])

  return (
    <InvoicesAddPopup
      projectsList={projectsList}
      payersList={payersList}
      receiversList={receiversList}

      handleClickClose={props.handleClickClose}
      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
      close={props.close}

      invoice={props.invoice}
    />
  )
};
