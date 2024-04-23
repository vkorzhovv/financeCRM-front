import classNames from 'classnames';
import React from 'react';
import CashFilter from '../../../../../common/PageHeader/FilterPopup/CashFilter/CashFilter';
import styles from './cashcontentitem.module.css';
import CashData from './CashData/CashData';


export default function CashContentItem(props) {

  return (
    <div className={styles.cashItem}>
      <div className={classNames(styles.cashTitle, 'flex')}>
        <h2 className={styles.cashTitleText}>{props.title}</h2>
        <div className={classNames('flex', styles.filterBox)}>
          Фильтр по типу статьи:
          <CashFilter />
        </div>
      </div>
      <div className={classNames(styles.cashWrapper)}>
        <div className={classNames('flex', styles.dataWrapper)}>
          {props.items.length ?
            props.items.map((item, index) =>
              <CashData
                key={item.id ? item.id : item.type + index}
                id={item.id}
                name={item.name}
                type_name={item.item_type?.name}
                typeId={item.item_type?.id}
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
