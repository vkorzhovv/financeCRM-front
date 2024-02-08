import React from 'react';
import styles from './invoiceslist.module.css';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';


export default function InvoicesList(props) {

  return (
    props.invoicesList.map((item) =>
      <div
        key={item.id}
      >
        <NavLink
          to={`/invoices/${item.id}`}
          className={classNames(styles.invoiceLink, !(props.me.user_type === 's' || props.me.id === item.payer.id || props.me.id === item.receiver.id) && 'nonTouch')}
        >
          Счет № {item.id + 10000}
        </NavLink>
      </div>
    )
  );
}
