import React from 'react';
import styles from './projectmoneybox.module.css';
import classNames from 'classnames';
import ProjectMoney from './ProjectMoney/ProjectMoney';

export default function ProjectMoneyBox(props) {
  return (
    <div className={classNames(styles.projectMoney)}>
      <div className={classNames('flex', styles.moneyHeader)}>
        <h3 className={classNames(styles.moneyHeaderText)}>{props.title}</h3>
        <div className={classNames('flex')}>
          <p className={classNames(styles.moneyHeaderText, styles.moneyHeaderSumm)}>Общая сумма</p>
          <button className={classNames('flex', styles.addPayBtn)}>
            <span className={classNames(styles.horLine, styles.line)}></span>
            <span className={classNames(styles.verLine, styles.line)}></span>
          </button>
        </div>
      </div>
      <table className={styles.moneyTable}>
        <tbody>
          {props.cash.map(item =>
            <ProjectMoney money={item} />
          )}
        </tbody>
      </table>
    </div>
  );
}
