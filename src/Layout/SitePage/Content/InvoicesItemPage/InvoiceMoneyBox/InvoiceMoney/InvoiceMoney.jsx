import React from 'react';
import styles from './invoicemoney.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../../utils/dateEditor';
import { NavLink } from 'react-router-dom';
import InvoiceMoneyControlsContainer from '../InvoiceMoneyControls/InvoicesMoneyControlsContainer';

export default function InvoiceMoney(props) {

  return (
    <div className={classNames('tableRow', styles.invoiceItem)}>
      <div className={classNames('tableCell',styles.moneyCell)}>
        Платеж №&nbsp;{props.money.id + 10000}
      </div>
      <div className={classNames('tableCell',styles.moneyCell)}>
        {editDate(props.money.date)}
      </div>
      <div className={classNames('tableCell',styles.moneyCell)}>
        {props.money.total}&nbsp;&#8381;
      </div>
      <div className={classNames('tableCell',styles.moneyCell)}>
        {props.money.approved ? <span className={styles.statusTrue}>Оплачено</span> : <span className={styles.statusFalse}>Не&nbsp;оплачено</span>}
      </div>
      {!props.invoice.approved &&
        <div className={classNames('tableCell', styles.moneyCell, styles.paymentControls)}>
          <InvoiceMoneyControlsContainer
            payment={props.money}
            invoice={props.invoice}
          />
        </div>
      }
      <NavLink
        to={`/payment/${props.money.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </div>
  );
}
