import React from 'react';
// import { NavLink } from 'react-router-dom';

import styles from './paymentlist.module.css';

export default function PaymentList(props) {

  return (
    // <NavLink
    //   to={`/invoices/${props.paymentItem.id}`}
    //   className={styles.paymentLink}
    // >
    //   {props.paymentItem.name}
    // </NavLink>
    <div className={styles.paymentLink}>{props.paymentItem.name}</div>
  );
}
