import React from 'react';
import styles from './staffperson.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function StaffPerson(props) {

  return (
    <tr className={classNames(styles.staffPerson)}>
      <td>
        <p>
          {props.surname} {props.name} {props.patronymic}
        </p>
      </td>
      <td>
        <p className={styles.phone}>{props.phone}</p>
      </td>
      <td>
        <p>{props.balance}</p>
      </td>
      <NavLink
        to='/staff/id'
        className={'absoluteLink'}
      >
      </NavLink>
    </tr>
  );
}
