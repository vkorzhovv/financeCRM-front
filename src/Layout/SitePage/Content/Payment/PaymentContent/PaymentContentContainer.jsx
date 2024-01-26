import React from 'react';
import PaymentContent from './PaymentContent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPayments, getUserPayments } from '../../../../../redux/paymentReducer';
import { selectPayments } from '../../../../../redux/paymentSelector';
import { selectMe } from '../../../../../redux/authSelectors';

export default function PaymentContentContainer(props) {

  const dispatch = useDispatch()
  const me = useSelector(selectMe);
  const payments = useSelector(selectPayments)

  useEffect(() => {
    me.user_type && me.user_type === 's' && dispatch(getPayments());
    me.user_type && me.user_type !== 's' && dispatch(getUserPayments(me.id));
  }, [dispatch, me.user_type])

  return (
    <PaymentContent
      payments={payments}
    />
  );
}
