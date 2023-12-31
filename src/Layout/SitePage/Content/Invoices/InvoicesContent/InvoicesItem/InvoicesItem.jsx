import React from 'react';
import styles from './invoicesitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { editName } from '../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../utils/dateEditor';

export default function InvoicesItem(props) {

  return (
    <tr className={styles.invoicesItem}>
      <td className={classNames(styles.invoicesCell, styles.cellWidth, styles.centerCell)}>
        {props.item.name}
      </td>
      <td className={classNames(styles.invoicesCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.project
        }
      </td>
      <td className={classNames(styles.invoicesCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.recipient
            ?
            `${props.item.recipient.last_name} ${editName(props.item.recipient.first_name)} ${editName(props.item.recipient.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames(styles.invoicesCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.payer
            ?
            `${props.item.payer.last_name} ${editName(props.item.payer.first_name)} ${editName(props.item.payer.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames(styles.invoicesCell, styles.centerCell)}>
        {editDate(props.item.date)}
      </td>
      <td className={classNames(styles.invoicesCell, styles.centerCell)}>
        {props.item.status ? <span className={styles.statusTrue}>Оплачено</span> : <span className={styles.statusFalse}>Не оплачено</span>}
      </td>
      <td className={classNames(styles.invoicesCell, styles.centerCell)}>
        {props.item.summ}
      </td>
      <td className={classNames(styles.invoicesCell, styles.centerCell)}>
        {props.item.receipt}
      </td>
      <NavLink
        to={`/invoices/${props.item.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
