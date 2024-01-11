import React, { useState } from 'react';
import PageHeader from '../../../common/PageHeader/PageHeader';
import PaymentData from './PaymentData/PaymentData';
import styles from './paymentitempage.module.css';
import PaymentList from './PaymentList/PaymentList';
import PaymentAddPopupContainer from '../Payment/PaymentAddPopup/PaymentAddPopupContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePayment } from '../../../../redux/paymentReducer';

export default function PaymentItemPage(props) {

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
      .then(navigate("/payment"))
  }

  return (
    <div className={styles.paymentItemPage}>
      <PageHeader
        title={'Платежи'}
        addBtnText={'Редактировать'}
        detail={'detail'}
        onDelete={onDelete}
        handleClickAdd={handleClickOpen}
      />

      {
        isOpenPopup && <PaymentAddPopupContainer
          payment={props.payment}
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={'Номер платежа'}
          detail={'detail'}
          close={setIsOpenPopup}
        />
      }

      <div className={styles.paymentItemContent}>
        <div className={styles.paymentList}>
          <p className={styles.paymentListTitle}>Номер платежа</p>
          {props.allPayment.map(item =>
            <PaymentList
              key={item.name}
              paymentItem={item}
            />
          )}
        </div>
        <PaymentData
          payment={props.payment}
        />
      </div>
    </div>
  );
}
