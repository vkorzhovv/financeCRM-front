import React from 'react';
import styles from './invoicemoneybox.module.css';
import classNames from 'classnames';
import InvoiceMoney from './InvoiceMoney/InvoiceMoney';

export default function InvoiceMoneyBox(props) {
  return (
    <div className={classNames(styles.invoiceMoney)}>
      <div className={classNames('flex', styles.moneyHeader)}>
        <h3 className={classNames(styles.moneyHeaderText)}>{props.title}</h3>
        <p className={classNames(styles.moneyHeaderText, styles.moneyHeaderSumm)}>{props.invoice.receipts}&nbsp;&#8381;</p>
      </div>
      <div className={styles.tableWrapper}>
        <div className={classNames('table', styles.moneyTable)}>
          {props.paymentsInInvoice.map(item =>
            <InvoiceMoney
              key={item.id}
              invoice={props.invoice}
              money={item}
            />
          )}
        </div>
      </div>
    </div>
  );
}
