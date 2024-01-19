import React from 'react';
import styles from './invoicemoney.module.css';
import classNames from 'classnames';
import { editDate } from '../../../../../../utils/dateEditor';
import { NavLink } from 'react-router-dom';
import InvoiceMoneyControlsContainer from '../InvoiceMoneyControls/InvoicesMoneyControlsContainer';

export default function InvoiceMoney(props) {

  return (
    <tr className={styles.invoiceItem}>
      <td className={classNames(styles.moneyCell)}>
        Платеж №&nbsp;{props.money.id + 10000}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {editDate(props.money.date)}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.total}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.approved ? <span className={styles.statusTrue}>Оплачено</span> : <span className={styles.statusFalse}>Не&nbsp;оплачено</span>}
      </td>
      {!props.invoice.approved &&
        <td className={classNames(styles.moneyCell, styles.paymentControls)}>
          <InvoiceMoneyControlsContainer
            payment={props.money}
            invoice={props.invoice}
          />
        </td>
      }
      <NavLink
        to={`/payment/${props.money.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
