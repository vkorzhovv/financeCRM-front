import React, { useState } from 'react';
import PageHeader from '../../../common/PageHeader/PageHeader';
import InvoicesAddPopup from '../Invoices/InvoicesAddPopup/InvoicesAddPopup';
import InvoiceData from './InvoiceData/InvoiceData';
import styles from './invoicesitempage.module.css';
import InvoicesList from './InvoicesList/InvoicesList';

export default function InvoicesItemPage(props) {

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

  const costs = [
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      status: false,
    },
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      status: true,
    },
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      status: true,
    },
  ]

  return (
    <div className={styles.invoiceItemPage}>
      <PageHeader
        title={'Счета на оплату'}
        addBtnText={'Редактировать'}
        detail={'detail'}
        // onDelete={onDelete}
        handleClickAdd={handleClickOpen}
      />

      {
        isOpenPopup && <InvoicesAddPopup
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={'Номер счета'}
          detail={'detail'}
          close={setIsOpenPopup}
        />
      }

      <div className={styles.invoiceItemContent}>
        <div className={styles.invoicesList}>
          <p className={styles.invoicesListTitle}>Номер счета</p>
          {props.allInvoices.map(item =>
            <InvoicesList
            // key={item.id}
            invoiceItem={item}
            />
          )}
        </div>
        <InvoiceData
          invoice={props.invoice}
          costs={costs}
        />
      </div>

    </div>
  );
}
