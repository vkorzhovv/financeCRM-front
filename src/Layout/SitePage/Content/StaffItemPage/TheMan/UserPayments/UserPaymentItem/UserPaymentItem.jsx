import React from 'react';
import styles from './userpaymentitem.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../../../utils/dateEditor';
import { NavLink } from 'react-router-dom';

export default function UserPaymentItem(props) {
  return (
    <NavLink
      to={`/payment/${props.item.id}`}
      className={classNames('tableRow', 'tableRowHov', styles.invoiceItem)}
    >
      <div className={classNames('tableCell', styles.moneyCell)}>
        Платеж №&nbsp;{props.item.id + 10000}
      </div>
      <div className={classNames('tableCell', styles.moneyCell)}>
        Счет №&nbsp;{props.item.invoice.id + 10000}
      </div>
      <div className={classNames('tableCell', styles.moneyCell)}>
        {editDate(props.item.date)}
      </div>
      <div className={classNames('tableCell', styles.moneyCell)}>
        {props.item.total}&nbsp;&#8381;
      </div>
      <div className={classNames('tableCell', styles.moneyCell)}>
        {props.item.approved ? <span className={styles.statusTrue}>Оплачено</span> : <span className={styles.statusFalse}>Не&nbsp;оплачено</span>}
      </div>
      {/* {!props.invoice.approved &&
        <div
          onClick={e => {
            e.preventDefault()
          }}
          className={classNames('tableCell', styles.moneyCell, styles.paymentControls)}
        >
          <InvoiceMoneyControlsContainer
            payment={props.money}
            invoice={props.invoice}
          />
        </div>
      } */}
    </NavLink>
  );
}
