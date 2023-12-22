import React from 'react';
import styles from './logo.module.css';
import classNames from 'classnames';
import logo from '../../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';

export default function Logo(props) {
  return (
    <div className={classNames('imageBox', styles.logo)}>
      <img src={logo} alt="logo" />
      <NavLink to='' className="absoluteLink">ссылка</NavLink>
    </div >
  );
}
