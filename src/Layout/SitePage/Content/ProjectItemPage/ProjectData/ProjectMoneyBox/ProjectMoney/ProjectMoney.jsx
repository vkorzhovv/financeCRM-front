import React from 'react';
import styles from './projectmoney.module.css';
import classNames from 'classnames';
import MoneyControls from '../MoneyControls/MoneyControls';

export default function ProjectMoney(props) {

  return (
    <tr className={styles.projectItem}>
      <td className={classNames(styles.moneyCell)}>
        {props.money.payer}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.date}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.summ}
      </td>
      <td className={classNames(styles.moneyCell)}>
        {props.money.purpose}
      </td>
      <td className={classNames(styles.moneyCell)}>
        <MoneyControls />
      </td>
    </tr>
  );
}
