import React from 'react';
import styles from './paymentdata.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../utils/dateEditor';
import { editFileName } from '../../../../../utils/fileNameEditor';

export default function PaymentData(props) {

  const paymentTh = [
    'Дата начисления',
    'Сумма счета',
    'Сумма оплачено',
    'Статус платежа',
  ]

  return (
    <div className={styles.paymentData}>
      <div className={styles.left}>
        <div className={classNames(styles.leftItem)}>
          <div className={classNames(styles.leftItem, styles.paymentDataItem, styles.paymentDataMain)}>
            <div className={classNames('flex', styles.paymentHeader)}>
              <h2 className={styles.thepaymentTitle}>Платеж № {props.payment.id + 10000}</h2>
              <div className={styles.check}>
                Счет №&nbsp;{props.payment.invoice.id + 10000}
              </div>
            </div>
            <div className={classNames('flex', styles.paymentMainInfo)}>
              <div className={styles.paymentDataList}>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Проект:</p> <p>{props.payment.invoice.project && props.payment.invoice.project.name}</p>
                </div>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Получатель:</p><p>
                    {
                      props.payment.invoice.receiver
                        ?
                        `${props.payment.invoice.receiver.last_name} ${props.payment.invoice.receiver.first_name}`
                        :
                        'Не выбран'
                    }
                  </p>
                </div>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Плательщик:</p><p>
                    {
                      props.payment.invoice.payer
                        ?
                        `${props.payment.invoice.payer.last_name} ${props.payment.invoice.payer.first_name}`
                        :
                        'Не выбран'
                    }
                  </p>
                </div>
              </div>
              <div className={styles.description}>
                <p>
                  {props.payment.comment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={classNames(styles.paymentDataItem, styles.tableWrapper)}>
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
                    {props.payment.invoice.amount}
                  </td>
                  <td>
                    {props.payment.total}
                  </td>
                  <td>
                    {props.payment.approved ? <span className={styles.statusTrue}>Оплачен</span> : <span className={styles.statusFalse}>Не оплачен</span>}
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        <div className={classNames(styles.paymentDataItem, styles.dataItemFiles)}>
          <div className={classNames(styles.attachmentHeader)}>
            <h3 className={classNames(styles.attachmentHeaderText)}>Приложенные документы</h3>
          </div>
          <div className={styles.attachmentData}>
            <div className={classNames('flex', styles.attachmentField)}>
              <p className={styles.attachmentFieldName}>Скан/фото документа:</p>
              <div className={classNames(styles.attachmentLinks)}>
                {(props.payment.scans && props.payment.scans.length) ?
                  props.payment.scans.map((item, index) =>
                    <a
                      href={item.scan}
                      key={item.id}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className={styles.attachmentFieldDocument}>
                      Файл {index + 1}{editFileName(item.scan)}
                    </a>

                  )
                  :
                  "Приложенных документов нет"
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
