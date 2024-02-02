import classNames from 'classnames';
import React from 'react';
import styles from './cashcontentitem.module.css';
import CashData from './CashData/CashData';

export default function CashContentItem(props) {
  return (
    <div className={styles.cashItem}>
      <h2 className={styles.cashTitle}>
        {props.title}
      </h2>
      <div className={classNames(styles.cashWrapper)}>
        <div className={classNames('flex', styles.dataWrapper)}>
          {props.items.length ?
            props.items.map((item, index) =>
              <CashData
                key={item.id ? item.id : item.type + index}
                id={item.id}
                name={item.name}
                type_name={item.item_type_name}
                type={item.item_type}
                isOpenPopup={props.isOpenPopup}
                handleClickClose={props.handleClickClose}
                handleClickOpen={props.handleClickOpen}
              />
            )
            :
            "Статьи отсутсвуют"
          }
        </div>
      </div>
    </div>
  );
}
