import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getItems, getPaymentTypes, getSubtypes } from "../../../../../redux/cashItemReducer";
import { selectAllItems, selectPaymentTypes, selectSubtypes } from "../../../../../redux/cashItemSelector";
import { getUsers } from "../../../../../redux/usersReducer";
import { selectAllUsers } from "../../../../../redux/usersSelector";
import ProjectExpensesAddPopup from "./ProjectExpensesAddPopup";

export default function ProjectExpensesAddPopupContainer(props) {

  const [type, setType] = useState(false || (props.invoice && props.invoice.payment_type.id))

  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const typesList = useSelector(selectPaymentTypes);
  const subtypesList = useSelector(selectSubtypes);
  const createdTypes = useSelector(selectAllItems);

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getPaymentTypes())
    dispatch(getItems())
    type && dispatch(getSubtypes(type))
  }, [dispatch, type])

  return (
    <ProjectExpensesAddPopup
      typesList={typesList}
      subtypesList={subtypesList}
      createdTypes={createdTypes}
      users={users}
      setType={setType}
      handleClickClose={props.handleClickClose}
      projectId={props.projectId}
      expense={props.expense}

      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
    />
  )
};
