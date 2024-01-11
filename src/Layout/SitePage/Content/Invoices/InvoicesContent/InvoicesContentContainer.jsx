import React from 'react';
import InvoicesContent from './InvoicesContent';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectInvoices } from '../../../../../redux/invoicesSelector';
import { getInvoices } from '../../../../../redux/invoicesReducer';

export default function InvoicesContentContainer(props) {

  const dispatch = useDispatch()
  const invoices = useSelector(selectInvoices)

  useEffect(() => {
    dispatch(getInvoices())
  }, [dispatch])

  return (
    <InvoicesContent
      invoices={invoices}
    />
  );
}
