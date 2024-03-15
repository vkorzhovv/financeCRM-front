import React from 'react';
import PaymentContent from './PaymentContent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPayment, getPayments, getUserPayments } from '../../../../../redux/paymentReducer';
import { selectFilteredPayments, selectPayments, selectUserPayments } from '../../../../../redux/paymentSelector';
import { selectMe } from '../../../../../redux/authSelectors';

export default function PaymentContentContainer(props) {

  const dispatch = useDispatch()
  const me = useSelector(selectMe);

  const payments = useSelector(selectFilteredPayments)
  useEffect(() => {
    Promise.all([
      me.user_type && me.user_type === 's' && dispatch(getPayments()),
      me.user_type && me.user_type !== 's' && dispatch(getUserPayments(me.id))
    ])
      .then(() => {
        dispatch(filterPayment(
          sessionStorage.getItem('paymentProject') || '',
          sessionStorage.getItem('paymentPayer') || '',
          sessionStorage.getItem('paymentReceiver') || '',
          sessionStorage.getItem('paymentFromDate') || '',
          sessionStorage.getItem('paymentToDate') || '',
          sessionStorage.getItem('paymentSummMin') || 0,
          sessionStorage.getItem('paymentSummMax') || 'Infinity',
          sessionStorage.getItem('paymentStatus') || ''
        ))
      }) 

  }, [dispatch, me])

  return (
    <PaymentContent
      payments={payments}
    />
  );
}
