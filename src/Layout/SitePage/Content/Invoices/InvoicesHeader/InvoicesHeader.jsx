import React from 'react';
import { useState } from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import InvoicesAddPopup from '../InvoicesAddPopup/InvoicesAddPopup';
// import { useState } from 'react';
// import StaffAddPopup from '../StaffAddPopup/StaffAddPopup';
import styles from './invoicesheader.module.css';
// import classNames from 'classnames';

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
        title={'Счета на оплату'}
        addBtnText={'Добавить'}
        withInvoices={'withInvoices'}
        handleClickAdd={handleClickOpen}
      />
      {
        isOpenPopup && <InvoicesAddPopup
        handleClickClose={handleClickClose}
        submitText = {'Добавить'}
        popupHeader = {'Добавить счет'}
        close={setIsOpenPopup}
        />
      }
    </div>
  );
}
