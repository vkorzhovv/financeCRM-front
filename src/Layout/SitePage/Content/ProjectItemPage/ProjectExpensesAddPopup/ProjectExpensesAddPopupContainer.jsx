import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getItems, getPaymentTypes } from "../../../../../redux/cashItemReducer";
import { selectAllItems, selectPaymentTypes } from "../../../../../redux/cashItemSelector";
import { getEmployees } from "../../../../../redux/usersReducer";
import { selectEmployees } from "../../../../../redux/usersSelector";
import ProjectExpensesAddPopup from "./ProjectExpensesAddPopup";

export default function ProjectExpensesAddPopupContainer(props) {

  const dispatch = useDispatch()
  const users = useSelector(selectEmployees)
  const typesList = useSelector(selectPaymentTypes);
  const createdTypes = useSelector(selectAllItems);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getPaymentTypes());
    dispatch(getItems());
  }, [dispatch])

  return (
    <ProjectExpensesAddPopup
      typesList={typesList}
      createdTypes={createdTypes}
      users={users}
      handleClickClose={props.handleClickClose}
      projectId={props.projectId}
      expense={props.expense}

      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
    />
  )
};
