import React from 'react';
import styles from './staffcontent.module.css';
import StaffItem from './StaffItem/StaffItem';

export default function StaffContent(props) {

  const staff = [
    {
      title: 'Клиенты',
      person: props.clients
    },
    {
      title: 'Подрядчики',
      person: props.contractors
    },
    {
      title: 'Сотрудники',
      person: props.employees
    },
  ]

  return (
    <div className={styles.staffContent}>
      {staff.map((item) =>
        <StaffItem
          key={item.title}
          title={item.title}
          people={item.person}
        />
      )}
    </div>
  );
}
