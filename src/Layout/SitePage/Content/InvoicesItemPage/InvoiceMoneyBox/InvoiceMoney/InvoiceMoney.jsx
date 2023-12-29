import React from 'react';
import styles from './invoicemoney.module.css';
import classNames from 'classnames';
import InvoiceMoneyControls from '../InvoiceMoneyControls/InvoiceMoneyControls';

export default function InvoiceMoney(props) {

  return (
    <tr className={styles.invoiceItem}>
      <td className={classNames(styles.moneyCell)}>
        {props.money.payer}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.date}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.summ}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.status ? <span className={styles.statusTrue}>Оплачено</span> : <span className={styles.statusFalse}>Не оплачено</span>}
      </td>
      <td className={classNames(styles.moneyCell)}>
        <InvoiceMoneyControls />
      </td>
    </tr>
  );
}
