import React from 'react';
import CashAddPopupContainer from '../CashAddPopup/CashAddPopupContainer';
import styles from './cashcontent.module.css';
import CashContentItem from './CashContentItem/CashContentItem';

export default function CashContent(props) {
  return (
    <div className={styles.cashContent}>
      <CashContentItem
        title={'Статьи'}
        items={props.items}
        isOpenPopup={props.isOpenPopup}
        handleClickClose={props.handleClickClose}
        handleClickOpen={props.handleClickOpen}
      />
      <CashAddPopupContainer
        isStatic={'static'}
        submitText={'Добавить'}
        popupHeader={'Добавить статью'}
      />
    </div>
  );
}
