import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInvoiceItem } from '../../../../redux/invoiceItemReducer';
import { selectInvoiceItem } from '../../../../redux/invoiceItemSelector';
import { getPaymentsInInvoice } from '../../../../redux/paymentReducer';
import { selectPaymentsInInvoice } from '../../../../redux/paymentSelector';
import InvoicesItemPage from './InvoicesItemPage';

export default function InvoicesItemPageContainer(props) {

  const dispatch = useDispatch();
  const invoice = useSelector(selectInvoiceItem);
  const paymentsInInvoice = useSelector(selectPaymentsInInvoice)

  let { invoicesId } = useParams();

  useEffect(() => {
    dispatch(getInvoiceItem(invoicesId))
    dispatch(getPaymentsInInvoice(invoicesId))
  }, [dispatch, invoicesId])

  return (
    <InvoicesItemPage invoice={invoice} paymentsInInvoice={paymentsInInvoice}/>
  );
}
