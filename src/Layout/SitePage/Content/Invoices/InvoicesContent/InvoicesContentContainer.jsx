import React from 'react';
import InvoicesContent from './InvoicesContent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectInvoices, selectUserInvoices } from '../../../../../redux/invoicesSelector';
import { getInvoices, getUserInvoices } from '../../../../../redux/invoicesReducer';
import { selectMe } from '../../../../../redux/authSelectors';

export default function InvoicesContentContainer(props) {

  const dispatch = useDispatch()
  const me = useSelector(selectMe);
  const allInvoices = useSelector(selectInvoices);
  const userInvoices = useSelector(selectUserInvoices);

  const invoices = me.user_type === 's' ?
    allInvoices :
    userInvoices;

  useEffect(() => {
    me.user_type && me.user_type === 's' && dispatch(getInvoices());
    me.user_type && me.user_type !== 's' && dispatch(getUserInvoices(me.id));
  }, [dispatch, me.user_type])

  return (
    <InvoicesContent
      invoices={invoices}
    />
  );
}
