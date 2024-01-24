import React, { useState } from 'react';
import PageHeader from '../../../common/PageHeader/PageHeader';
import PaymentData from './PaymentData/PaymentData';
import styles from './paymentitempage.module.css';
import PaymentAddPopupContainer from '../Payment/PaymentAddPopup/PaymentAddPopupContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePayment } from '../../../../redux/paymentReducer';
import PaymentListContainer from './PaymentList/PaymentListContainer';
import { selectMe } from '../../../../redux/authSelectors';

export default function PaymentItemPage(props) {

  const me = useSelector(selectMe);

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
    await dispatch(deletePayment(props.payment.id))
      .then(() => {
        navigate("/payment");
        document.body.classList.remove('modal-show');
      })
  }

  return (
    <div className={styles.paymentItemPage}>
      <PageHeader
        isApprovedInvoiceForPayment={props.payment.invoice.approved}
        title={'Платежи'}
        addBtnText={'Редактировать'}
        detail={'detail'}
        onDelete={onDelete}
        handleClickAdd={handleClickOpen}
        access={me.user_type === 'k' || 's' || 'p'}
        accessDelete={me.user_type === 's'}
      />

      {
        isOpenPopup && <PaymentAddPopupContainer
          payment={props.payment}
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={`Платеж № ${props.payment.id + 10000}`}
          detail={'detail'}
          close={setIsOpenPopup}
        />
      }

      <div className={styles.paymentItemContent}>
        <div className={styles.paymentList}>
          <p className={styles.paymentListTitle}>Номер платежа</p>
          <PaymentListContainer payment={props.payment} />
        </div>
        <PaymentData
          payment={props.payment}
        />
      </div>
    </div>
  );
}
