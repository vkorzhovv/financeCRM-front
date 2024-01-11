import React from 'react';
import styles from './navigation.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function Navigation(props) {

  const navItems = [
    {
      key: 'staff',
      itemName: 'Сотрудники и подрядчики',
      linkUrl: '/staff',
    },
    {
      key: 'projects',
      itemName: 'Проекты',
      linkUrl: '/projects',
    },
    {
      key: 'money',
      itemName: 'Статьи расходов/доходов',
      linkUrl: '/money',
    },
    {
      key: 'invoices',
      itemName: 'Начисления',
      linkUrl: '/invoices',
    },
    {
      key: 'payment',
      itemName: 'Платежи',
      linkUrl: '/payment',
    },
  ]

  return (
    <div className={classNames('flex', styles.navigation)}>
      {
        navItems.map((item) =>
          <NavLink
            key={item.key}
            to={item.linkUrl}
            className={styles.navLink}
          >
            {item.itemName}
          </NavLink>
        )
      }
    </div>
  );
}
