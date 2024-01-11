import React from 'react';
import styles from './invoicedata.module.css';
import classNames from 'classnames';
import InvoiceMoneyBox from '../InvoiceMoneyBox/InvoiceMoneyBox';
import PaymentAddPopupContainer from '../../Payment/PaymentAddPopup/PaymentAddPopupContainer';
import { editDate } from '../../../../../utils/dateEditor';

export default function InvoiceData(props) {

  const invoiceTh = [
    'Сумма счета',
    'Поступления',
    'Остаток',
    'Статус оплаты',
  ]

  return (
    <div className={styles.invoiceData}>
      <div className={styles.left}>
        <div className={classNames(styles.leftItem)}>
          <div className={classNames(styles.leftItem, styles.invoiceDataItem, styles.invoiceDataMain)}>
            <div className={classNames('flex', styles.invoiceHeader)}>
              <h2 className={styles.theinvoiceTitle}>Счет № {props.invoice.id + 10000} <span>от {editDate(props.invoice.date)}</span></h2>
            </div>
            <div className={classNames('flex', styles.invoiceMainInfo)}>
              <div className={styles.invoiceDataList}>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Проект:</p> <p>{props.invoice.project ? props.invoice.project.name : 'Не выбран'}</p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Получатель:</p><p>
                    {
                      props.invoice.receiver
                        ?
                        `${props.invoice.receiver.last_name} ${props.invoice.receiver.first_name}`
                        :
                        'Не выбран'
                    }
                  </p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Плательщик:</p><p>
                    {
                      props.invoice.payer
                        ?
                        `${props.invoice.payer.last_name} ${props.invoice.payer.first_name}`
                        :
                        'Не выбран'
                    }
                  </p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Тип начисления:</p><p>{props.invoice.payment_type}</p>
                </div>
                <div className={classNames('flex', styles.invoiceDataField)}>
                  <p className={styles.invoiceDataTitle}>Назначение начисления:</p><p>{props.invoice.subtype}</p>
                </div>
              </div>
              <div className={styles.description}>
                <p>
                  {props.invoice.comment}
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
                    {props.invoice.summ}
                  </td>
                  <td>
                    {props.invoice.summ}
                  </td>
                  <td>
                    {props.invoice.receipt}
                  </td>
                  <td>
                    {props.invoice.approved ? <span className={styles.statusTrue}>Оплачено</span> : <span className={styles.statusFalse}>Не оплачено</span>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <div className={classNames(styles.invoiceDataItem, styles.paymentsBox)}>
          <InvoiceMoneyBox
            title={"Поступления по счету"}
            cash={props.costs}
          />
        </div>
        <PaymentAddPopupContainer
          isStatic={'isStatic'}
          submitText={'Добавить'}
          popupHeader={`Добавить платеж`}
        />
      </div>
    </div>
  );
}
