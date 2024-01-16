import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteInvoice } from '../../../../redux/invoicesReducer';
import PageHeader from '../../../common/PageHeader/PageHeader';
import InvoicesAddPopupContainer from '../Invoices/InvoicesAddPopup/InvoicesAddPopupContainer';
import InvoiceData from './InvoiceData/InvoiceData';
import styles from './invoicesitempage.module.css';

export default function InvoicesItemPage(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  const onDelete = async () => {
    await dispatch(deleteInvoice(props.invoice.id))
      .then(() => {
        navigate("/invoices");
        document.body.classList.remove('modal-show');
      })
  }

  const remainder = (parseFloat(props.invoice.amount) - parseFloat(props.invoice.receipts)).toFixed(2);

  return (
    <div className={styles.invoiceItemPage}>
      <PageHeader
        approved={props.invoice.approved}
        title={'Начисления'}
        addBtnText={'Редактировать'}
        detail={'detail'}
        onDelete={onDelete}
        handleClickAdd={handleClickOpen}
      />

      {
        isOpenPopup && <InvoicesAddPopupContainer
          invoice={props.invoice}
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          remainder={remainder}

          popupHeader={`Счет № ${props.invoice.id + 10000}`}
          detail={'detail'}

          close={setIsOpenPopup}
        />
      }

      <InvoiceData
        paymentsInInvoice={props.paymentsInInvoice}
        remainder={remainder}
        invoice={props.invoice}
      />
    </div>
  );
}
