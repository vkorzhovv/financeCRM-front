import React from 'react';
import styles from './header.module.css';
import classNames from 'classnames';
import Logo from '../../common/Logo/Logo';
import Navigation from './Navigation/Navigation';
import UserControlsContainer from './UserControls/UserControlsContainer';

export default function Header(props) {

  return (
    <header className={classNames('flex', styles.header)}>
      <Logo />
      <Navigation />
      <UserControlsContainer />
    </header>
  );
}
