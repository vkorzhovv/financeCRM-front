import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './paymentlist.module.css';

export default function PaymentList(props) {

  return (
    props.paymentsList.map((item) =>
      <div >
        <NavLink
          to={`/payment/${item.id}`}
          className={styles.paymentLink}
        >
          Платеж № {item.id + 10000}
        </NavLink>
      </div>
    )
  );
}
