import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectInvoices } from '../../../../../redux/invoicesReducer';
import { selectProjectInvoices } from '../../../../../redux/invoicesSelector';
import InvoicesList from './InvoicesList';

export default function InvoicesListContainer(props) {

  const dispatch = useDispatch();
  const invoicesList = useSelector(selectProjectInvoices);

  const projectId = props.invoice?.project?.id;

  useEffect(() => {
    projectId && dispatch(getProjectInvoices(projectId));
  }, [dispatch, projectId])

  return (
    <InvoicesList
      invoicesList={projectId ? invoicesList : []}
      me={props.me}
    />
  );
}
