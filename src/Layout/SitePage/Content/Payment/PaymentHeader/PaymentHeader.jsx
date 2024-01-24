import React from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import { useState } from 'react';
import styles from './paymentheader.module.css';
import PaymentAddPopupContainer from '../PaymentAddPopup/PaymentAddPopupContainer';
import { useSelector } from 'react-redux';
import { selectMe } from '../../../../../redux/authSelectors';

export default function PaymentHeader(props) {

  const me = useSelector(selectMe);

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
        access={me.user_type === 's'}
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
