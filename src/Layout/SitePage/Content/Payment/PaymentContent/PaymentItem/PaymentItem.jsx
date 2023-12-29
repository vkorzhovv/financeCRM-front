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
        {props.item.number_payment}
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        {props.item.number_check}
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.project
        }
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.recipient
            ?
            `${props.item.recipient.last_name} ${editName(props.item.recipient.first_name)} ${editName(props.item.recipient.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames(styles.paymentCell, styles.cellWidth, styles.centerCell)}>
        {
          props.item.payer
            ?
            `${props.item.payer.last_name} ${editName(props.item.payer.first_name)} ${editName(props.item.payer.father_name)}`
            :
            'Не выбран'
        }
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
        {editDate(props.item.date)}
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
        {props.item.status ? <span className={styles.statusTrue}>Подтвержден</span> : <span className={styles.statusFalse}>Не подтвержден</span>}
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
        {props.item.summ_plus}
      </td>
      <td className={classNames(styles.paymentCell, styles.centerCell)}>
      {props.item.summ_minus}
      </td>
      <NavLink
        to={`/payment/${props.item.id}`}
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
