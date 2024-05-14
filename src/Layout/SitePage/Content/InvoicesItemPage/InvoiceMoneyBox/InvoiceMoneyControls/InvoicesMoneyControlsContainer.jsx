import React from 'react';
import { useDispatch } from 'react-redux';
import { getMe } from '../../../../../../redux/authReducer';
import { getInvoiceItem } from '../../../../../../redux/invoiceItemReducer';
import { editPayment } from '../../../../../../redux/paymentItemReducer';
import { deletePayment, getPaymentsInInvoice } from '../../../../../../redux/paymentReducer';
import InvoiceMoneyControls from './InvoiceMoneyControls';

export default function InvoiceMoneyControlsContainer(props) {

  const dispatch = useDispatch()

  const onDelete = async () => {
    await dispatch(deletePayment(props.payment.id))
      .then(() => dispatch(getPaymentsInInvoice(props.payment.invoice.id)))
      .then(() => dispatch(getInvoiceItem(props.invoice.id)))
      .then(() => document.body.classList.remove('modal-show'))
      .then(() => dispatch(getMe()))
  }

  const onApproved = async () => {
    await dispatch(editPayment(
      props.payment.id,
      props.payment.date,
      props.payment.total,
      props.payment.approved ? false : true,
      props.payment.invoice.id,
      props.payment.comment,
      props.payment.scans
    ))
      .then(() => dispatch(getPaymentsInInvoice(props.payment.invoice.id)))
      .then(() => dispatch(getInvoiceItem(props.invoice.id)))
      .then(() => dispatch(getMe()))
  }

  return (
    <InvoiceMoneyControls
      invoice={props.invoice}
      payment={props.payment}
      onDelete={onDelete}
      onApproved={onApproved}
    />
  );
}
