import React from 'react';
import { useState } from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import InvoicesAddPopupContainer from '../InvoicesAddPopup/InvoicesAddPopupContainer';
import styles from './invoicesheader.module.css';
import { useSelector } from 'react-redux';
import { selectMe } from '../../../../../redux/authSelectors';
import { selectFilteredInvoices } from '../../../../../redux/invoicesSelector';

export default function InvoicesHeader(props) {

  const me = useSelector(selectMe);
  const invoices = useSelector(selectFilteredInvoices);

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  const navigateFunc = () => {
    setTimeout(() => console.log(invoices), 2000);
  }

  return (
    <div className={styles.staffheader}>
      <PageHeader
        title={'Начисления'}
        addBtnText={'Добавить'}
        withInvoices={'withInvoices'}
        handleClickAdd={handleClickOpen}
        access={me.user_type === 's'}

        invoicesFilter={true}
        invoiceSearch={true}
        searchPlaceholder={'Счет, Проект, Ф.И.О'}
      />
      {
        isOpenPopup && <InvoicesAddPopupContainer
          handleClickClose={handleClickClose}
          submitText={'Добавить'}
          popupHeader={'Добавить счет'}
          close={setIsOpenPopup}
          navigateFunc={navigateFunc}
        />
      }
    </div>
  );
}
