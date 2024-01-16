import React, { useState } from 'react';
import styles from './navigation.module.css';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export default function Navigation(props) {

  const [isOpenNav, setIsOpenNav] = useState(window.innerWidth < 1025 ? false : true);

  const handleOpenNav = () => {
    isOpenNav ? setIsOpenNav(false) : setIsOpenNav(true);
    isOpenNav ? document.body.classList.remove('modal-show') : document.body.classList.add('modal-show');
  }

  const navItems = [
    {
      key: 'staff',
      itemName: 'Сотрудники и\u00A0подрядчики',
      linkUrl: '/staff',
    },
    {
      key: 'projects',
      itemName: 'Проекты',
      linkUrl: '/projects',
    },
    {
      key: 'money',
      itemName: 'Статьи расходов\u00A0/\u00A0доходов',
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
    <div>
      <div className={styles.burgerContainer}>
        <button
          onClick={handleOpenNav}
          className={classNames('flex', styles.burger)}
        >
          <span className={classNames(styles.burgerLine, isOpenNav && styles.topLine)}></span>
          <span className={classNames(styles.burgerLine, isOpenNav && styles.middleLine)}></span>
          <span className={classNames(styles.burgerLine, isOpenNav && styles.bottomLine)}></span>
        </button>
      </div>

      <div className={classNames('flex', styles.navigation, isOpenNav && styles.opened)}>
        {
          navItems.map((item) =>
            <NavLink
              onClick={window.innerWidth < 1025 && handleOpenNav}
              key={item.key}
              to={item.linkUrl}
              className={styles.navLink}
            >
              {item.itemName}
            </NavLink>
          )
        }
      </div>

    </div>
  );
}
