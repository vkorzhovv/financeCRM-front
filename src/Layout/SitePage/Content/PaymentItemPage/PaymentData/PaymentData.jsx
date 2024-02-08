import React from 'react';
import styles from './paymentdata.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../utils/dateEditor';
import { editFileName } from '../../../../../utils/fileNameEditor';
import { NavLink } from 'react-router-dom';

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
                  <p className={styles.paymentDataTitle}>Проект:</p>
                  {props.payment.invoice.project ?
                    <NavLink
                      to={`/projects/${props.payment.invoice.project.id}`}
                      className={!(props.me.user_type === 's' ||
                        props.me.id === props.payment.invoice.project.client.id ||
                        props.me.id === props.payment.invoice.project.foreman.id ||
                        props.me.id === props.payment.invoice.project.project_manager.id)
                        && 'nonTouch'
                      }
                    >
                      {props.payment.invoice.project.name}
                    </NavLink>
                    :
                    <p>Не выбран</p>
                  }
                </div>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Получатель:</p>
                  {props.payment.invoice.receiver ?
                    <NavLink to={`/staff/${props.payment.invoice.receiver.id}`}>
                      {props.payment.invoice.receiver.last_name} {props.payment.invoice.receiver.first_name}
                    </NavLink>
                    :
                    <p>Не выбран</p>
                  }
                </div>
                <div className={classNames('flex', styles.paymentDataField)}>
                  <p className={styles.paymentDataTitle}>Плательщик:</p>
                  {props.payment.invoice.payer ?
                    <NavLink to={`/staff/${props.payment.invoice.payer.id}`}>
                      {props.payment.invoice.payer.last_name} {props.payment.invoice.payer.first_name}
                    </NavLink>
                    :
                    <p>Не выбран</p>
                  }
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
          <div className={classNames('table', styles.paymentTable)}>
            <div className={classNames('tableHeader', styles.paymentTableTitles)}>
              <div className={classNames('tableRow')}>
                {paymentTh.map((item, index) =>
                  <div
                    key={item + index}
                    className={classNames('tableCell', styles.titlesItem)}>{item}</div>
                )}
              </div>
            </div>
            <div className={classNames('tableBody')}>
              <div className={classNames('tableRow', styles.paymentTableItem)}>
                <div className={classNames('tableCell', styles.itemCell)}>
                  {editDate(props.payment.date)}
                </div>
                <div className={classNames('tableCell', styles.itemCell)}>
                  {props.payment.invoice.amount}&nbsp;&#8381;
                </div>
                <div className={classNames('tableCell', styles.itemCell)}>
                  {props.payment.total}&nbsp;&#8381;
                </div>
                <div className={classNames('tableCell', styles.itemCell)}>
                  {props.payment.approved ? <span className={styles.statusTrue}>Оплачен</span> : <span className={styles.statusFalse}>Не оплачен</span>}
                </div>
              </div>
            </div>
          </div>
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
                      Файл {item.id}{editFileName(item.scan)}
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
