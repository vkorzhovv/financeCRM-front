import React from 'react';
import styles from './invoicedata.module.css';
import classNames from 'classnames';
import InvoiceMoneyBox from '../InvoiceMoneyBox/InvoiceMoneyBox';
import PaymentAddPopupContainer from '../../Payment/PaymentAddPopup/PaymentAddPopupContainer';
import { editDate } from '../../../../../utils/dateEditor';
import InvoicesListContainer from '../InvoicesList/InvoicesListContainer';
import { editInvoice, getInvoiceItem } from '../../../../../redux/invoiceItemReducer';
import { useDispatch } from 'react-redux';
import CheckIcon from '../../../../../svgIcons/check';

export default function InvoiceData(props) {

  const dispatch = useDispatch();

  const invoiceTh = [
    'Сумма счета',
    'Поступления',
    'Остаток',
    'Статус оплаты',
  ]

  const remainder = (Number(props.invoice.amount) - (props.invoice.receipts)).toFixed(2);

  const handleToApprove = async () => {
    !props.invoice.approved
      ?
      await dispatch(editInvoice(
        props.invoice.id,
        props.invoice.comment,
        true,
        props.invoice.payment_type,
        props.invoice.subtype,
        props.invoice.payer.id,
        props.invoice.receiver.id,
        props.invoice.project.id,
        props.invoice.amount,
        props.invoice.date,
      ))
        .then(() => {
          dispatch(getInvoiceItem(props.invoice.id))
        })
      :
      await dispatch(editInvoice(
        props.invoice.id,
        props.invoice.comment,
        false,
        props.invoice.payment_type,
        props.invoice.subtype,
        props.invoice.payer.id,
        props.invoice.receiver.id,
        props.invoice.project.id,
        props.invoice.amount,
        props.invoice.date,
      ))
        .then(() => {
          dispatch(getInvoiceItem(props.invoice.id))
        })

  }

  return (
    <div className={styles.invoiceData}>
      <div className={styles.invoicesList}>
        <p className={styles.invoicesListTitle}>Номер счета</p>
        <InvoicesListContainer
          invoice={props.invoice}
        />
      </div>
      <div className={classNames(styles.dataRight)}>
        <div className={styles.left}>
          <div className={classNames(styles.leftItem)}>
            <div className={classNames(styles.leftItem, styles.invoiceDataItem, styles.invoiceDataMain)}>
              <div className={classNames('flex', styles.invoiceHeader)}>
                <h2 className={styles.theinvoiceTitle}>Счет № {props.invoice.id + 10000} <span>от&nbsp;{editDate(props.invoice.date)}</span></h2>
                <div className={classNames('flex', styles.approvedBox)}>
                  {
                    props.invoice.approved ?
                      <span className={classNames(styles.approved, styles.approvedTrue)}>Подтвержден</span> :
                      <span className={classNames(styles.approved, styles.approvedFalse)}>Не подтвержден</span>
                  }
                  {
                    remainder <= (0).toFixed(2) &&
                    <button
                      onClick={handleToApprove}
                      className={classNames('flex', styles.controlBtn, styles.fillSVG)}>
                      <CheckIcon />
                    </button>
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
              <div className={classNames('table', styles.invoiceTable)}>
                <div className={classNames('tableHeader', styles.invoiceTableTitles)}>
                  <div className={classNames('tableRow')}>
                    {invoiceTh.map((item, index) =>
                      <div
                        key={item + index}
                        className={classNames('tableCell', styles.titlesItem)}>
                        {item}
                      </div>
                    )}
                  </div>
                </div>
                <div className={classNames('tableBody')}>
                  <div className={classNames('tableRow', styles.invoiceTableItem)}>
                    <div className={classNames('tableCell', styles.cellItem)}>
                      {props.invoice.amount}
                    </div>
                    <div className={classNames('tableCell', styles.cellItem)}>
                      {props.invoice.receipts}
                    </div>
                    <div className={classNames('tableCell', styles.cellItem)}>
                      {props.remainder}
                    </div>
                    <div className={classNames('tableCell', styles.cellItem)}>
                      {
                        props.remainder === parseFloat(props.invoice.amount).toFixed(2) ?
                          <span className={styles.statusFalse}>Не оплачено</span> :
                          props.remainder > 0 ?
                            <span className={styles.statusFalse}>Частично оплачено</span> :
                            <span className={styles.statusTrue}>Оплачено</span>
                      }
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
}
