import React, { useState } from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import CashAddPopup from '../CashAddPopup/CashAddPopup';
// import { useState } from 'react';
// import StaffAddPopup from '../StaffAddPopup/StaffAddPopup';
import styles from './cashheader.module.css';
// import classNames from 'classnames';

export default function CashHeader(props) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleClickOpen = () => {
    console.log('open')
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={styles.staffheader}>
      <PageHeader
        title={'Статьи расходов/доходов'}
        addBtnText={'Добавить'}
        withoutCash={'without'}
        handleClickAdd={handleClickOpen}
      />
      {
        isOpenPopup && <CashAddPopup
          handleClickClose={handleClickClose}
          submitText={'Добавить'}
          popupHeader={'Добавить статью'}
          close={setIsOpenPopup}
        />
      }
    </div>
  );
}
