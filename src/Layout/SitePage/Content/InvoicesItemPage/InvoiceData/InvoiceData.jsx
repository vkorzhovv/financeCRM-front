import React from 'react';
import styles from './invoicedata.module.css';
import classNames from 'classnames';
import InvoiceMoneyBox from '../InvoiceMoneyBox/InvoiceMoneyBox';
import PaymentAddPopupContainer from '../../Payment/PaymentAddPopup/PaymentAddPopupContainer';
import { editDate } from '../../../../../utils/dateEditor';
import InvoicesListContainer from '../InvoicesList/InvoicesListContainer';

export default function InvoiceData(props) {

  const invoiceTh = [
    'Сумма счета',
    'Поступления',
    'Остаток',
    'Статус оплаты',
  ]

  return (
    <div className={styles.invoiceData}>
      <div className={styles.invoicesList}>
        <p className={styles.invoicesListTitle}>Номер счета</p>
        <InvoicesListContainer
          invoice={props.invoice}
        />
      </div>
      <div className={styles.left}>
        <div className={classNames(styles.leftItem)}>
          <div className={classNames(styles.leftItem, styles.invoiceDataItem, styles.invoiceDataMain)}>
            <div className={classNames('flex', styles.invoiceHeader)}>
              <h2 className={styles.theinvoiceTitle}>Счет № {props.invoice.id + 10000} <span>от {editDate(props.invoice.date)}</span></h2>
              <div>
                {
                  props.invoice.approved ?
                    <span className={classNames(styles.approved, styles.approvedTrue)}>Подтвержден</span> :
                    <span className={classNames(styles.approved, styles.approvedFalse)}>Не подтвержден</span>
                }
              </div>
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
                    {props.invoice.amount}
                  </td>
                  <td>
                    {props.invoice.receipts}
                  </td>
                  <td>
                    {props.remainder}
                  </td>
                  <td>
                    {
                      props.remainder === parseFloat(props.invoice.amount).toFixed(2) ?
                        <span className={styles.statusFalse}>Не оплачено</span> :
                        props.remainder > 0 ?
                          <span className={styles.statusFalse}>Частично оплачено</span> :
                          <span className={styles.statusTrue}>Оплачено</span>
                    }
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
            paymentsInInvoice={props.paymentsInInvoice}
            title={"Поступления по счету"}
            invoice={props.invoice}
          />
        </div>

        {
          !props.invoice.approved &&
          <PaymentAddPopupContainer
            invoicePage={'InvoicePage'}
            invoice={props.invoice}
            isStatic={'isStatic'}
            submitText={'Добавить'}
            popupHeader={`Добавить платеж`}
          />
        }
      </div>
    </div>
  );
}
