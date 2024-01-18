import React, { useEffect, useState } from "react";
import InvoicesAddPopup from "./InvoicesAddPopup";
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from "../../../../../redux/projectsReducer";
import { selectProjects } from "../../../../../redux/projectsSelector";
import { selectClients, selectContractors } from "../../../../../redux/usersSelector";
import { getClients, getContractors } from "../../../../../redux/usersReducer";
import { getItems, getPaymentTypes, getSubtypes } from "../../../../../redux/cashItemReducer";
import { selectAllItems, selectPaymentTypes, selectSubtypes } from "../../../../../redux/cashItemSelector";


export default function InvoicesAddPopupContainer(props) {

  const [type, setType] = useState(false || (props.invoice && props.invoice.payment_type.id))

  const dispatch = useDispatch()

  const projectsList = useSelector(selectProjects);
  const payersList = useSelector(selectClients);
  const receiversList = useSelector(selectContractors);
  const typesList = useSelector(selectPaymentTypes);
  const createdTypes = useSelector(selectAllItems);
  const subtypesList = useSelector(selectSubtypes);

  useEffect(() => {
    dispatch(getProjects())
    dispatch(getClients())
    dispatch(getContractors())
    dispatch(getPaymentTypes())
    dispatch(getItems())
    type && dispatch(getSubtypes(type))
  }, [dispatch, type])

  return (
    <InvoicesAddPopup
      projectId={props.projectId}
      createdTypes={createdTypes}
      remainder={props.remainder}
      projectsList={projectsList}
      payersList={payersList}
      receiversList={receiversList}
      typesList={typesList}
      subtypesList={subtypesList}
      setType={setType}
      handleClickClose={props.handleClickClose}
      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
      close={props.close}
      invoice={props.invoice}
    />
  )
};
