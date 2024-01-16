import React from 'react';
import { useState } from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import InvoicesAddPopupContainer from '../InvoicesAddPopup/InvoicesAddPopupContainer';
import styles from './invoicesheader.module.css';

export default function InvoicesHeader(props) {

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
        title={'Начисления'}
        addBtnText={'Добавить'}
        withInvoices={'withInvoices'}
        handleClickAdd={handleClickOpen}
      />
      {
        isOpenPopup && <InvoicesAddPopupContainer
        handleClickClose={handleClickClose}
        submitText = {'Добавить'}
        popupHeader = {'Добавить счет'}
        close={setIsOpenPopup}
        />
      }
    </div>
  );
}