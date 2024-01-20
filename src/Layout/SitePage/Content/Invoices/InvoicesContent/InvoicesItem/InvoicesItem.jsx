import React from 'react';
import styles from './invoicesitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { editName } from '../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../utils/dateEditor';

export default function InvoicesItem(props) {

  const remainder = (parseFloat(props.item.amount) - parseFloat(props.item.receipts)).toFixed(2);

  return (
    <div className={classNames('tableRow', styles.invoicesItem)}>
      <div className={classNames('tableCell', styles.invoicesCell)}>
        Счет №&nbsp;{props.item.id + 10000}
      </div>
      <div className={classNames('tableCell', styles.invoicesCell)}>
        {
          props.item.project ? props.item.project.name : 'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', 'nowrapString', styles.invoicesCell)}>
        {
          props.item.receiver
            ?
            `${props.item.receiver.last_name} ${editName(props.item.receiver.first_name)} ${editName(props.item.receiver.father_name)}`
            :
            'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', 'nowrapString', styles.invoicesCell)}>
        {
          props.item.payer
            ?
            `${props.item.payer.last_name} ${editName(props.item.payer.first_name)} ${editName(props.item.payer.father_name)}`
            :
            'Не выбран'
        }
      </div>
      <div className={classNames('tableCell', styles.invoicesCell)}>
        {editDate(props.item.date)}
      </div>
      <div className={classNames('tableCell', styles.invoicesCell)}>
        {
          remainder === parseFloat(props.item.amount).toFixed(2) ?
            <span className={styles.statusFalse}>Не оплачено</span> :
            remainder > 0 ?
              <span className={styles.statusFalse}>Частично оплачено</span> :
              <span className={styles.statusTrue}>Оплачено</span>
        }
      </div>
      <div className={classNames('tableCell', styles.invoicesCell)}>
        {props.item.amount}
      </div>
      <div className={classNames('tableCell', styles.invoicesCell)}>
        {props.item.receipts}
      </div>
      <NavLink
        to={`/invoices/${props.item.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </div>
  );
}
