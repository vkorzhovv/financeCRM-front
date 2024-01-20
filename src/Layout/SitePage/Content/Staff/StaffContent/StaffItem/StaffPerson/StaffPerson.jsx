import React from 'react';
import styles from './staffperson.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function StaffPerson(props) {

  return (
    <div className={classNames('tableRow', styles.staffPerson)}>
      <div className={classNames('tableCell', 'leftCell', styles.tableCellStaff)}>
        <p>
          {props.surname} {props.name} {props.patronymic}
        </p>
      </div>
      <div className={classNames('tableCell', styles.tableCellStaff)}>
        <p className={styles.phone}>{props.phone}</p>
      </div>
      <div className={classNames('tableCell', styles.tableCellStaff)}>
        <p>{props.balance}</p>
      </div>
      <NavLink
        to={`/staff/${props.id}`}
        className={classNames('absoluteLink', styles.link)}
      >
      </NavLink>
    </div>
  );
}
