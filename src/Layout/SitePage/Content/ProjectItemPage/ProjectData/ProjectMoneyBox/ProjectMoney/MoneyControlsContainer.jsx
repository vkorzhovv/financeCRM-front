import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteInvoice, getProjectExpenses, getProjectReceipts } from '../../../../../../../redux/invoicesReducer';
import MoneyControls from '../MoneyControls/MoneyControls';

export default function MoneyControlsContainer(props) {

  const dispatch = useDispatch()

  const onDelete = async () => {
    !props.receipts
      ?
      await dispatch(deleteInvoice(props.money.id))
        .then(() => dispatch(getProjectExpenses(props.projectId)))
        .then(() => document.body.classList.remove('modal-show'))
      :
      await dispatch(deleteInvoice(props.money.id))
        .then(() => dispatch(getProjectReceipts(props.projectId)))
        .then(() => document.body.classList.remove('modal-show'))
  }

  return (
    <MoneyControls
      acceptToInvoice={props.acceptToInvoice}
      me={props.me}
      receipts={props.receipts}
      projectId={props.projectId}
      projectClient={props.projectClient}
      onDelete={onDelete}
      money={props.money}
    />
  );
}
