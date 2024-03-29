import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPaymentItem } from '../../../../redux/paymentItemReducer';
import { selectPaymentItem } from '../../../../redux/paymentItemSelector';
import PaymentItemPage from './PaymentItemPage';

export default function PaymentItemPageContainer(props) {

  const dispatch = useDispatch();
  const payment = useSelector(selectPaymentItem);

  let { paymentId } = useParams();

  useEffect(() => {
    dispatch(getPaymentItem(paymentId))
  }, [dispatch, paymentId])

  return (
    <PaymentItemPage
      payment={payment}
    />
  );
}
