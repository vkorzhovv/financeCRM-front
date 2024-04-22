import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';
import CashAddPopupContainer from '../CashAddPopup/CashAddPopupContainer';
import TypeAddPopupContainer from '../TypeAddPopup/TypeAddPopupContainer';
import styles from './cashcontent.module.css';
import CashContentItem from './CashContentItem/CashContentItem';

export default function CashContent(props) {

  const [showTypesForm, setShowTypesForm] = useState(false);

  return (
    <div className={styles.cashContent}>
      <CashContentItem
        title={'Статьи'}
        items={props.items}
        isOpenPopup={props.isOpenPopup}
        handleClickClose={props.handleClickClose}
        handleClickOpen={props.handleClickOpen}
      />
      <div className={classNames('flex', styles.forms)}>
        <CashAddPopupContainer
          isStatic={'static'}
          submitText={'Добавить'}
          popupHeader={'Добавить статью'}
        />
        <button
          onClick={() => setShowTypesForm(!showTypesForm)}
          className={'btn'}
        >
          Управление типами
        </button>
        {
          showTypesForm &&
          <TypeAddPopupContainer
            isStatic={'static'}
            submitText={'Добавить'}
            popupHeader={'Добавить статью'}
          />
        }
      </div>
    </div>
  );
}
