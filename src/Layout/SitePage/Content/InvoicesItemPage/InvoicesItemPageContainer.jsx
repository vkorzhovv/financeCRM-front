import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getInvoiceItem } from '../../../../redux/invoiceItemReducer';
import { selectInvoiceItem } from '../../../../redux/invoiceItemSelector';
import InvoicesItemPage from './InvoicesItemPage';

export default function InvoicesItemPageContainer(props) {

  const dispatch = useDispatch();
  const invoice = useSelector(selectInvoiceItem);

  let { invoicesId } = useParams();

  useEffect(() => {
    dispatch(getInvoiceItem(invoicesId))
  }, [dispatch, invoicesId])

  return (
    <InvoicesItemPage invoice={invoice} />
  );
}
