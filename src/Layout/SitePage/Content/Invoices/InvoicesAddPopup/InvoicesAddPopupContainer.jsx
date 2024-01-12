import React, { useEffect, useState } from "react";
import InvoicesAddPopup from "./InvoicesAddPopup";
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from "../../../../../redux/projectsReducer";
import { selectProjects } from "../../../../../redux/projectsSelector";
import { selectClients, selectContractors } from "../../../../../redux/usersSelector";
import { getClients, getContractors } from "../../../../../redux/usersReducer";
import { selectSubtypes, selectTypes } from "../../../../../redux/invoicesSelector";
import { getSubtypes, getTypes } from "../../../../../redux/invoicesReducer";


export default function InvoicesAddPopupContainer(props) {

  const [typeId, setTypeId] = useState(false || (props.invoice && props.invoice.payment_type.id))

  const dispatch = useDispatch()

  const projectsList = useSelector(selectProjects)
  const payersList = useSelector(selectClients)
  const receiversList = useSelector(selectContractors)
  const typesList = useSelector(selectTypes);
  const subtypesList = useSelector(selectSubtypes);

  useEffect(() => {
    dispatch(getProjects())
    dispatch(getClients())
    dispatch(getContractors())
    dispatch(getTypes())
    typeId && dispatch(getSubtypes(typeId))
  }, [dispatch, typeId])

  return (
    <InvoicesAddPopup
      remainder={props.remainder}
      projectsList={projectsList}
      payersList={payersList}
      receiversList={receiversList}
      typesList={typesList}
      subtypesList={subtypesList}
      setTypeId={setTypeId}
      handleClickClose={props.handleClickClose}
      submitText={props.submitText}
      popupHeader={props.popupHeader}
      detail={props.detail}
      close={props.close}
      invoice={props.invoice}
    />
  )
};
