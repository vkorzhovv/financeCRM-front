import React from 'react';
import styles from './paymentitem.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { editName } from '../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../utils/dateEditor';

export default function PaymentItem(props) {

  return (
    <tr className={styles.paymentItem}>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        Платеж № {props.item.id + 10000}
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        Счет № {props.item.invoice.id + 10000}
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.invoice.project && props.item.invoice.project.name
        }
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.invoice.receiver
            ?
            `${props.item.invoice.receiver.last_name} ${editName(props.item.invoice.receiver.first_name)} ${editName(props.item.invoice.receiver.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.invoice.payer
            ?
            `${props.item.invoice.payer.last_name} ${editName(props.item.invoice.payer.first_name)} ${editName(props.item.invoice.payer.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
        {editDate(props.item.date)}
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
        {props.item.approved ? <span className={styles.statusTrue}>Подтвержден</span> : <span className={styles.statusFalse}>Не подтвержден</span>}
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
        {props.item.total}
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
        {props.item.total}
      </td>
      <NavLink
        to={`/payment/${props.item.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
