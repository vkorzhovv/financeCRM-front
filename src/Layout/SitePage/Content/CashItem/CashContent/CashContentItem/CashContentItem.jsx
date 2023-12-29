import React from 'react';
import styles from './cashcontentitem.module.css';
import CashData from './CashData/CashData';
// import classNames from 'classnames';

export default function CashContentItem(props) {
  return (
    <div className={styles.cashItem}>
      <h2 className={styles.cashTitle}>
        {props.title}
      </h2>
      <div className={styles.cashWrapper}>
        {props.item.map(item =>
          <CashData
            name={item.name}
            type={item.type}
            isOpenPopup={props.isOpenPopup}
            handleClickClose={props.handleClickClose}
            handleClickOpen={props.handleClickOpen}
          />
        )}
      </div>
    </div>
  );
}
