import React from 'react';
import InvoicesContent from './InvoicesContent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredInvoices } from '../../../../../redux/invoicesSelector';
import { filterInvoice, getInvoices, getUserInvoices } from '../../../../../redux/invoicesReducer';
import { selectMe } from '../../../../../redux/authSelectors';

export default function InvoicesContentContainer(props) {

  const dispatch = useDispatch()
  const me = useSelector(selectMe);
  // const allInvoices = useSelector(selectInvoices);
  // const userInvoices = useSelector(selectUserInvoices);

  // const invoices = me.user_type === 's' ?
  //   allInvoices :
  //   userInvoices;
  const invoices = useSelector(selectFilteredInvoices);

  useEffect(() => {
    Promise.all([
      me.user_type && me.user_type === 's' && dispatch(getInvoices()),
      me.user_type && me.user_type !== 's' && dispatch(getUserInvoices(me.id))
    ])
      .then(() => {
        dispatch(filterInvoice(
          sessionStorage.getItem('invoiceProject') || '',
          sessionStorage.getItem('invoicePayer') || '',
          sessionStorage.getItem('invoiceReceiver') || '',
          sessionStorage.getItem('invoiceFromDate') || '',
          sessionStorage.getItem('invoiceToDate') || '',
          sessionStorage.getItem('invoiceSummMin') || 0,
          sessionStorage.getItem('invoiceSummMax') || 'Infinity',
          sessionStorage.getItem('invoiceType') || '',
          sessionStorage.getItem('invoiceStatus') || ''
        ))
      })

  }, [dispatch, me.user_type])

  return (
    <InvoicesContent
      invoices={invoices}
    />
  );
}
