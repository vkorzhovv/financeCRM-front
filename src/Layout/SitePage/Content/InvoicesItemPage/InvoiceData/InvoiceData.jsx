import React from 'react';
import styles from './invoicedata.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../utils/dateEditor';
import InvoiceMoneyBox from '../InvoiceMoneyBox/InvoiceMoneyBox';

export default function InvoiceData(props) {

  const invoiceTh = [
    'Дата выставления',
    'Сумма счета',
    'Сумма поступления',
    'Статус оплаты',
  ]

  return (
    <div className={styles.invoiceData}>
      <div className={styles.left}>
        <div className={classNames(styles.leftItem)}>
          <div className={classNames(styles.leftItem, styles.invoiceDataItem, styles.invoiceDataMain)}>
            <div className={classNames('flex', styles.invoiceHeader)}>
              <h2 className={styles.theinvoiceTitle}>{props.invoice.name}</h2>
            </div>
            <div className={classNames('flex', styles.invoiceMainInfo)}>
              <div className={styles.invoiceDataList}>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Проект:</p> <p>{props.invoice.project}</p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Получатель:</p><p>{props.invoice.recipient.last_name} {props.invoice.recipient.first_name}</p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Плательщик:</p><p>{props.invoice.payer.last_name} {props.invoice.payer.first_name}</p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Тип начисления:</p><p>Тип начисления</p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Назначение начисления:</p><p>Назначение начисления</p>
                </div>
              </div>
              <div className={styles.description}>
                <p>
                  {props.invoice.description}
                </p>
              </div>
            </div>
          </div>
          <div className={classNames(styles.invoiceDataItem)}>
            <table className={styles.invoiceTable}>
              <thead className={styles.invoiceTableTitles}>
                <tr>
                  {invoiceTh.map(item =>
                    <th className={styles.titlesItem}>{item}</th>
                  )}
                </tr>
              </thead>
              <tbody>
                <tr className={styles.invoiceTableItem}>
                  <td>
                    {editDate(props.invoice.date)}
                  </td>
                  <td>
                    {props.invoice.summ}
                  </td>
                  <td>
                    {props.invoice.receipt}
                  </td>
                  <td>
                    {props.invoice.status ? <span className={styles.statusTrue}>Оплачено</span> : <span className={styles.statusFalse}>Не оплачено</span>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={styles.invoiceDataItem}>
        <InvoiceMoneyBox
          title={"Поступления по счету"}
          cash={props.costs}
        />
      </div>
    </div>
  );
}
