import React from 'react';
import styles from './projectmoney.module.css';
import classNames from 'classnames';
import { editName } from '../../../../../../../utils/nameEditor';
import { editDate } from '../../../../../../../utils/dateEditor';
import { NavLink } from 'react-router-dom';
import MoneyControlsContainer from './MoneyControlsContainer';

export default function ProjectMoney(props) {

  const payer = `${props.money.payer.last_name}\u00A0${editName(props.money.payer.first_name)}\u00A0${editName(props.money.payer.father_name)}`
  const date = editDate(props.money.date)
  const summ = props.receipts ? props.money.receipts : props.money.amount
  const purpose = props.money.subtype

  return (
    <div className={classNames('tableRow', styles.projectItem)}>
      <div className={classNames('tableCell', styles.moneyCell)}>
        {payer}
      </div>
      <div className={classNames('tableCell', styles.moneyCell)}>
        {date}
      </div>
      <div className={classNames('tableCell', styles.moneyCell)}>
        {summ}
      </div>
      <div className={classNames('tableCell', styles.moneyCell)}>
        {purpose}
      </div>
      <div className={classNames('tableCell', styles.moneyCell, styles.controls)}>
        <MoneyControlsContainer
          money={props.money}
          receipts={props.receipts}
          projectId={props.projectId}
        />
      </div>
      {props.receipts &&
        <NavLink
          to={`/invoices/${props.money.id}`}
          className={'absoluteLink'}
        >
        </NavLink>
      }
    </div>
  );
}
