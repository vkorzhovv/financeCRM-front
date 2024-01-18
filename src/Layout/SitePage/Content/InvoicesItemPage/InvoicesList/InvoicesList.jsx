import React from 'react';
import styles from './invoiceslist.module.css';
import { NavLink } from 'react-router-dom';


export default function InvoicesList(props) {

  return (
    props.invoicesList.map((item) =>
      <div >
        <NavLink
          to={`/invoices/${item.id}`}
          className={styles.invoiceLink}
        >
          Счет № {item.id + 10000}
        </NavLink>
      </div>
    )
  );
}
