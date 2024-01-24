import React, { useEffect, useState } from "react";
import InvoicesAddPopup from "./InvoicesAddPopup";
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from "../../../../../redux/projectsReducer";
import { selectProjects } from "../../../../../redux/projectsSelector";
import { selectAllUsers, selectEmployees } from "../../../../../redux/usersSelector";
import { getEmployees, getUsers } from "../../../../../redux/usersReducer";
import { getItems, getPaymentTypes } from "../../../../../redux/cashItemReducer";
import { selectAllItems, selectPaymentTypes } from "../../../../../redux/cashItemSelector";
import { getSubtypes } from "../../../../../redux/cashItemReducer";
import { selectSubtypes } from "../../../../../redux/cashItemSelector";

export default function InvoicesAddPopupContainer(props) {
  const [paymentType, setPaymentType] = useState(false || (props.invoice && props.invoice.payment_type));

  const dispatch = useDispatch()

  const usersList = useSelector(selectAllUsers);
  const employeesList = useSelector(selectEmployees);
  const projectsList = useSelector(selectProjects);

  const typesList = useSelector(selectPaymentTypes);
  const createdTypes = useSelector(selectAllItems);
  const subtypesList = useSelector(selectSubtypes);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getUsers());
    dispatch(getProjects());

    dispatch(getPaymentTypes());
    dispatch(getItems());

    paymentType && dispatch(getSubtypes(paymentType))
  }, [dispatch, paymentType])

  return (
    <InvoicesAddPopup
      projectsList={projectsList}
      usersList={usersList}
      typesList={typesList}
      createdTypes={createdTypes}
      employeesList={employeesList}
      subtypesList={subtypesList}

      setPaymentType={setPaymentType}
      projectId={props.projectId}
      remainder={props.remainder}
      invoice={props.invoice}

      handleClickClose={props.handleClickClose}
      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
      close={props.close}
    />
  )
};
