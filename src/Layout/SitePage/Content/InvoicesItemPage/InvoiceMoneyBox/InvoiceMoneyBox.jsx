import React from 'react';
import styles from './invoicemoneybox.module.css';
import classNames from 'classnames';
import InvoiceMoney from './InvoiceMoney/InvoiceMoney';

export default function InvoiceMoneyBox(props) {
  return (
    <div className={classNames(styles.invoiceMoney)}>
      <div className={classNames('flex', styles.moneyHeader)}>
        <h3 className={classNames(styles.moneyHeaderText)}>{props.title}</h3>
        <div className={classNames('flex')}>
          <p className={classNames(styles.moneyHeaderText, styles.moneyHeaderSumm)}>Общая сумма</p>
          <button className={classNames('flex', styles.addPayBtn)}>
            <span className={classNames(styles.horLine, styles.line)}></span>
            <span className={classNames(styles.verLine, styles.line)}></span>
          </button>
        </div>
      </div>
      <table className={styles.moneyTable}>
        <tbody>
          {props.paymentsInInvoice.map(item =>
            <InvoiceMoney
              key={item.id}
              invoice={props.invoice}
              money={item}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
