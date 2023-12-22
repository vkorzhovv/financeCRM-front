import React from 'react';
import styles from './header.module.css';
import classNames from 'classnames';
import Logo from '../../common/Logo/Logo';
import Navigation from './Navigation/Navigation';
import UserControls from './UserControls/UserControls';

export default function Header(props) {

  return (
    <header className={classNames('flex', styles.header)}>
      <Logo />
      <Navigation />
      <UserControls />
    </header>
  );
}
