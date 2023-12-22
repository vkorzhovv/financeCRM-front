import React from 'react';
import styles from './staffcontent.module.css';
import StaffItem from './StaffItem/StaffItem';
// import classNames from 'classnames';

export default function StaffContent(props) {

  const staff = [
    {
      title: 'Клиенты',
      person: [
        {
          surname: 'Дмитриев',
          name: 'Дмитрий',
          patronymic: 'Дмитриевич',
          phone: '+7 (999) 222 22 22',
          balance: 'баланс'
        },
        {
          surname: 'Игорев',
          name: 'Игорь',
          patronymic: 'Игоревич',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Васильев',
          name: 'Василий',
          patronymic: 'Васильевич',
          phone: '+7 (000) 070 60 00',
          balance: 'баланс'
        },
      ]
    },
    {
      title: 'Подрядчики',
      person: [
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
      ]
    },
    {
      title: 'Сотрудники',
      person: [
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
        {
          surname: 'Фамилия',
          name: 'Имя',
          patronymic: 'Отчество',
          phone: '+7 (000) 000 00 00',
          balance: 'баланс'
        },
      ]
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
