import React from 'react';
import styles from './cashcontent.module.css';
import CashContentItem from './CashContentItem/CashContentItem';
// import classNames from 'classnames';

export default function CashContent(props) {

  const cash = [
    {
      title: 'Статьи доходов',
      item: [
        {
          type: 'тип1',
          name: 'название 1'
        },
        {
          type: 'тип2',
          name: 'название 2'
        }
      ]
    },
    {
      title: 'Статьи расходов',
      item: [
        {
          type: 'тип4',
          name: 'название 4'
        },
        {
          type: 'тип5',
          name: 'название 5'
        },
        {
          type: 'тип3',
          name: 'название 3'
        }
      ]
    },
  ]

  return (
    <div className={styles.cashContent}>
      {cash.map(item =>
        <CashContentItem
          title={item.title}
          item={item.item}
          isOpenPopup={props.isOpenPopup}
          handleClickClose={props.handleClickClose}
          handleClickOpen={props.handleClickOpen}
        />
      )}
    </div>
  );
}
