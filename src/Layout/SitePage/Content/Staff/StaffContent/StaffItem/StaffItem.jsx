import React from 'react';
import styles from './staffitem.module.css';
import StaffPerson from './StaffPerson/StaffPerson';
// import classNames from 'classnames';

export default function StaffItem(props) {
  return (
    <div className={styles.staffItem}>
      <h2 className={styles.staffTitle}>
        {props.title}
      </h2>
      <div className={styles.staffTableWrapper}>
        <table className={styles.staffTable}>
          <tbody>
            {props.people.length &&
              props.people.map((item) =>
                <StaffPerson
                  key={item.id}
                  id={item.id}
                  surname={item.last_name}
                  name={item.first_name}
                  patronymic={item.father_name}
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
