import React from 'react';
import styles from './staffperson.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMe } from '../../../../../../../redux/authSelectors';

export default function StaffPerson(props) {

  const me = useSelector(selectMe)

  return (
    <NavLink
      to={`/staff/${props.id}`}
      className={classNames('tableRow', 'tableRowHov', styles.staffPerson)}
    >
      <div className={classNames('tableCell', 'leftCell', styles.tableCellStaff)}>
        <p>
          {props.surname} {props.name} {props.patronymic}
        </p>
      </div>
      <div className={classNames('tableCell', styles.tableCellStaff)}>
        <p className={styles.phone}>{props.phone}</p>
      </div>
      {
        (props.type === 's' && me.user_type === 's') &&
        <div className={classNames('tableCell', styles.tableCellStaff)}>
          <p>{props.balance}&nbsp;&#8381;</p>
        </div>
      }
    </NavLink>
  );
}
