import React from 'react';
import styles from './usercontrols.module.css';
import classNames from 'classnames';

export default function UserControls(props) {

  return (
    <div className={classNames('flex', styles.controls)}>
      <p className={styles.name}>{props.firstName}</p>
      <p className={styles.name}>{props.lastName}</p>
      <button className={classNames('btn', 'logBtn')} onClick={props.handleClick}>Выйти</button>
    </div>
  );
}
