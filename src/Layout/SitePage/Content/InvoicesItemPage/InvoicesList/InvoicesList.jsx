import React from 'react';
// import { NavLink } from 'react-router-dom';

import styles from './invoiceslist.module.css';

export default function InvoicesList(props) {

  return (
    // <NavLink
    //   to={`/invoices/${props.invoiceItem.id}`}
    //   className={styles.invoiceLink}
    // >
    //   {props.invoiceItem.name}
    // </NavLink>
    <div className={styles.invoiceLink}>{props.invoiceItem.name}</div>
  );
}
