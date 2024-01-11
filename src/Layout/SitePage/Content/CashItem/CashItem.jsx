import React from 'react';
import CashContentContainer from './CashContent/CashContentContainer';
import CashHeader from './CashHeader.jsx/CashHeader';
import styles from './cashitem.module.css';
// import classNames from 'classnames';

export default function CashItem(props) {
  return (
    <div className={styles.cashItem}>
      <CashHeader />
      <CashContentContainer />
    </div>
  );
}
