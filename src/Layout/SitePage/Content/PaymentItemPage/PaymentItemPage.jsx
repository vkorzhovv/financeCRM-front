import React, { useState } from 'react';
import PageHeader from '../../../common/PageHeader/PageHeader';
import PaymentData from './PaymentData/PaymentData';
import PaymentAddPopup from '../Payment/PaymentAddPopup/PaymentAddPopup';
import styles from './paymentitempage.module.css';
import PaymentList from './PaymentList/PaymentList';

export default function PaymentItemPage(props) {

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  // const onDelete = () => {
  //   dispatch(deleteProject(props.project.id));
  //   navigate("/projects");
  // }

  return (
    <div className={styles.paymentItemPage}>
      <PageHeader
        title={'Оплата'}
        addBtnText={'Редактировать'}
        detail={'detail'}
      // onDelete={onDelete}
      handleClickAdd={handleClickOpen}
      />

      {
        isOpenPopup && <PaymentAddPopup
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={'Номер платежа'}
          detail={'detail'}
          project={props.project}
          close={setIsOpenPopup}
        />
      }

      <div className={styles.paymentItemContent}>
        <div className={styles.paymentList}>
          <p className={styles.paymentListTitle}>Номер платежа</p>
          {props.allPayment.map(item =>
            <PaymentList
              // key={item.id}
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
