import React from 'react';
import styles from './payment.module.css';
import PaymentContentContainer from './PaymentContent/PaymentContentContainer';
import PaymentHeader from './PaymentHeader/PaymentHeader';
// import classNames from 'classnames';

export default function Payment(props) {

  return (
    <div className={styles.payment}>
      <PaymentHeader />
      <PaymentContentContainer />
    </div>
  );
}
