import React from 'react';
import styles from './staffitem.module.css';
import StaffPerson from './StaffPerson/StaffPerson';
// import classNames from 'classnames';

export default function StaffItem(props) {
  debugger;
  return (
    <div className={styles.staffItem}>
      <h2 className={styles.staffTitle}>
        {props.title}
      </h2>
      <div className={styles.staffTableWrapper}>
        <table className={styles.staffTable}>
          <tbody>
            {props.people.map((item) =>
              <StaffPerson
                surname={item.surname}
                name={item.name}
                patronymic={item.patronymic}
                phone={item.phone}
                balance={item.balance}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
