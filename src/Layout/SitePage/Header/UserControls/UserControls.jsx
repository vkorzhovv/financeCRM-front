import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './usercontrols.module.css';
import classNames from 'classnames';
import { logout } from '../../../../redux/authReducer';

export default function UserControls(props) {

  const dispatch = useDispatch();

  const handleClick = (() => {
    dispatch(logout());
  })

  return (
    <div className={classNames('flex', styles.controls)}>
      <button className={classNames('btn', 'logBtn')} onClick={handleClick}>Выйти</button>
    </div>
  );
}
