import React from 'react';
import styles from './paymentdata.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../utils/dateEditor';

export default function PaymentData(props) {

  const paymentTh = [
    'Дата начисления',
    'Сумма начисления',
    'Сумма оплаты',
    'Статус платежа',
  ]

  return (
    <div className={styles.paymentData}>
      <div className={styles.left}>
        <div className={classNames(styles.leftItem)}>
          <div className={classNames(styles.leftItem, styles.paymentDataItem, styles.paymentDataMain)}>
            <div className={classNames('flex', styles.paymentHeader)}>
              <h2 className={styles.thepaymentTitle}>{props.payment.number_payment}</h2>
              <div className={styles.check}>
                {props.payment.number_check}
              </div>
            </div>
            <div className={classNames('flex', styles.paymentMainInfo)}>
              <div className={styles.paymentDataList}>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Проект:</p> <p>{props.payment.project}</p>
                </div>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Получатель:</p><p>{props.payment.recipient.last_name} {props.payment.recipient.first_name}</p>
                </div>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Плательщик:</p><p>{props.payment.payer.last_name} {props.payment.payer.first_name}</p>
                </div>
              </div>
              <div className={styles.description}>
                <p>
                  {props.payment.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className={classNames(styles.paymentDataItem)}>
          <table className={styles.paymentTable}>
            <thead className={styles.paymentTableTitles}>
              <tr>
                {paymentTh.map(item =>
                  <th className={styles.titlesItem}>{item}</th>
                )}
              </tr>
            </thead>
            <tbody>
              <tr className={styles.paymentTableItem}>
                <td>
                  {editDate(props.payment.date)}
                </td>
                <td>
                  {props.payment.summ_plus}
                </td>
                <td>
                  {props.payment.summ_minus}
                </td>
                <td>
                  {props.payment.status ? <span className={styles.statusTrue}>Подтвержден</span> : <span className={styles.statusFalse}>Не подтвержден</span>}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={classNames(styles.paymentDataItem)}>
          <div className={classNames('flex', styles.attachmentHeader)}>
            <h3 className={classNames(styles.attachmentHeaderText)}>Приложенные документы</h3>
          </div>
          <div className={styles.attachmentData}>
            <div className={classNames('flex', styles.attachmentField)}>
              <p className={styles.attachmentFieldName}>Скан</p>
              <div className={classNames(styles.attachmentLinks)}>
                <span className={styles.attachmentFieldDocument}>fail.jpg</span>
              </div>
            </div>
            <div className={classNames('flex', styles.attachmentField)}>
              <p className={styles.attachmentFieldName}>Фотография</p>
              <div className={classNames(styles.attachmentLinks)}>
                <span className={styles.attachmentFieldDocument}>fail.jpg</span>
                <span className={styles.attachmentFieldDocument}>fail.jpg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
