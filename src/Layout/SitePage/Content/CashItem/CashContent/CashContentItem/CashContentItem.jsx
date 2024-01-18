import React from 'react';
import styles from './cashcontentitem.module.css';
import CashData from './CashData/CashData';

export default function CashContentItem(props) {
  return (
    <div className={styles.cashItem}>
      <h2 className={styles.cashTitle}>
        {props.title}
      </h2>
      <div className={styles.cashWrapper}>
        {props.items.map(item =>
          <CashData
            key={item.id}
            id={item.id}
            name={item.name}
            type_name={item.item_type_name}
            type={item.item_type}
            isOpenPopup={props.isOpenPopup}
            handleClickClose={props.handleClickClose}
            handleClickOpen={props.handleClickOpen}
          />
        )}
      </div>
    </div>
  );
}
