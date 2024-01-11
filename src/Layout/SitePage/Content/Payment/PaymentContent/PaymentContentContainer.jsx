import React from 'react';
import PaymentContent from './PaymentContent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayments } from '../../../../../redux/paymentReducer';
import { selectPayments } from '../../../../../redux/paymentSelector';

export default function PaymentContentContainer(props) {

  const dispatch = useDispatch()
  const payments = useSelector(selectPayments)

  useEffect(() => {
    dispatch(getPayments())
  }, [dispatch])

  return (
    <PaymentContent
      payments={payments}
    />
  );
}
