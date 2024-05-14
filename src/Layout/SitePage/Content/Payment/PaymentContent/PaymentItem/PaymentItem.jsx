import React from 'react';
import styles from './paymentitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { editName } from '../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../utils/dateEditor';

export default function PaymentItem(props) {

  return (
    <NavLink
      to={`/payment/${props.item.id}`}
      className={classNames('tableRow','tableRowHov', styles.paymentItem)}
    >
      <div className={classNames('tableCell', styles.paymentCell)}>
        Платеж №&nbsp;{props.item.id + 10000}
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        Счет №&nbsp;{props.item.invoice.id + 10000}
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        {
          props.item.invoice.project ? props.item.invoice.project.name : 'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        {
          props.item.invoice?.receiver
            ?
            `${props.item.invoice.receiver.last_name} ${props.item.invoice.receiver?.first_name}`
            :
            'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        {
          props.item.invoice?.payer
            ?
            `${props.item.invoice.payer.last_name} ${props.item.invoice.payer?.first_name}`
            :
            'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        {editDate(props.item.date)}
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        {props.item.approved ? <span className={styles.statusTrue}>Оплачен</span> : <span className={styles.statusFalse}>Не оплачен</span>}
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        {props.item.invoice.amount}&nbsp;&#8381;
      </div>
      <div className={classNames('tableCell', styles.paymentCell)}>
        {props.item.total}&nbsp;&#8381;
      </div>
    </NavLink>
  );
}
