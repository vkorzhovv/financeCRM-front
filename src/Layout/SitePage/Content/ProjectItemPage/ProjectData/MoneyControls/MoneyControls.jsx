import React from 'react';
import styles from './moneycontrols.module.css';
import classNames from 'classnames';

export default function MoneyControls(props) {

  return (
    <div className={classNames('flex', styles.moneyControls)}>
      <div className={styles.controlBtn}>
        у
      </div>
      <div className={styles.controlBtn}>
        р
      </div>
      <div className={styles.controlBtn}>
        Г
      </div>
    </div>
  );
}
