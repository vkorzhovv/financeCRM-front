import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsInInvoice } from '../../../../../redux/paymentReducer';
import { selectPaymentsInInvoice } from '../../../../../redux/paymentSelector';
import PaymentList from './PaymentList';


export default function PaymentListContainer(props) {

  const dispatch = useDispatch();
  const paymentsList = useSelector(selectPaymentsInInvoice);

  const paymentId = props.payment.invoice.id;

  useEffect(() => {
    paymentId && dispatch(getPaymentsInInvoice(paymentId))
  }, [dispatch, paymentId])


  return (
    <PaymentList
      paymentsList={paymentsList}
    />
  );
}
