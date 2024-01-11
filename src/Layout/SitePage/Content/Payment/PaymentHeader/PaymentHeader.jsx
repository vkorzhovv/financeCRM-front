import React from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import { useState } from 'react';
import styles from './paymentheader.module.css';
import PaymentAddPopupContainer from '../PaymentAddPopup/PaymentAddPopupContainer';
// import classNames from 'classnames';

export default function PaymentHeader(props) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClickOpen = () => {
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
        title={'Платежи'}
        addBtnText={'Добавить'}
        handleClickAdd={handleClickOpen}
      />
      {
        isOpenPopup && <PaymentAddPopupContainer
          handleClickClose={handleClickClose}
          submitText={'Добавить'}
          popupHeader={'Добавить платеж'}
          close={setIsOpenPopup}
        />
      }
    </div>
  );
}
