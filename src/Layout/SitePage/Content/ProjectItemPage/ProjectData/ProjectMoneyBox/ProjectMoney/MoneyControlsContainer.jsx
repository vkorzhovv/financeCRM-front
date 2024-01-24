import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteInvoice, getProjectInvoices } from '../../../../../../../redux/invoicesReducer';
import { deleteExpense, getExpenses } from '../../../../../../../redux/projectExpensesReducer';
import MoneyControls from '../MoneyControls/MoneyControls';

export default function MoneyControlsContainer(props) {

  const dispatch = useDispatch()

  const onDelete = async () => {
    !props.receipts
      ?
      await dispatch(deleteExpense(props.money.id))
        .then(() => dispatch(getExpenses(props.projectId)))
        .then(() => document.body.classList.remove('modal-show'))
      :
      await dispatch(deleteInvoice(props.money.id))
        .then(() => dispatch(getProjectInvoices(props.projectId)))
        .then(() => document.body.classList.remove('modal-show'))
  }

  return (
    <MoneyControls
      me={props.me}
      receipts={props.receipts}
      projectId={props.projectId}
      onDelete={onDelete}
      money={props.money}
    />
  );
}
