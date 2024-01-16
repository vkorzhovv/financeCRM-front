import React from 'react';
import styles from './invoicemoneycontrols.module.css';
import classNames from 'classnames';
import DeleteIcon from '../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../svgIcons/edit';
import CheckIcon from '../../../../../../svgIcons/check';
import { useState } from 'react';
import PaymentAddPopupContainer from '../../../Payment/PaymentAddPopup/PaymentAddPopupContainer';
import ConfirmDelete from '../../../../../common/ConfirmDelete/ConfirmDelete';

export default function InvoiceMoneyControls(props) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
    setIsOpenDelete(true)
    document.body.classList.add('modal-show');
  }

  const handleClickCloseDelete = () => {
    setIsOpenDelete(false)
    document.body.classList.remove('modal-show');
  }

  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={classNames('flex', styles.moneyControls)}>
      <button
        onClick={handleClickOpenDelete}
        className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}>
        <DeleteIcon />
      </button>
      <button
        onClick={handleClickOpen}
        className={classNames('flex', styles.controlBtn, styles.strokeSVG)}
      >
        <EditIcon />
      </button>
      <button
        onClick={props.onApproved}
        className={classNames('flex', styles.controlBtn, styles.fillSVG)}>
        <CheckIcon />
      </button>
      {
        isOpenPopup && <PaymentAddPopupContainer
          invoicePage={'invoicePage'}
          invoice={props.invoice}
          payment={props.payment}
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={`Платеж номер`}
          detail={'detail'}
          close={setIsOpenPopup}
        />
      }
      {
        isOpenDelete && <ConfirmDelete
          onDelete={props.onDelete}
          closeDelete={handleClickCloseDelete}
        />
      }
    </div>
  );
}
