import React, { useState } from 'react';
import styles from './moneycontrols.module.css';
import classNames from 'classnames';
import DeleteIcon from '../../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../../svgIcons/edit';
import ConfirmDelete from '../../../../../../common/ConfirmDelete/ConfirmDelete';
import InvoicesAddPopupContainer from '../../../../Invoices/InvoicesAddPopup/InvoicesAddPopupContainer';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../../../../../../redux/projectsReducer';

export default function MoneyControls(props) {

  const dispatch = useDispatch()

  const [isOpenPopupInvoices, setIsOpenPopupInvoices] = useState(false);
  const [isOpenPopupExpenses, setIsOpenPopupExpenses] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleClickOpenDelete = (e) => {
    setIsOpenDelete(true)
    document.body.classList.add('modal-show');
  }

  const handleClickCloseDelete = () => {
    setIsOpenDelete(false)
    document.body.classList.remove('modal-show');
  }

  const closeExpenses = () => {
    setIsOpenPopupExpenses(false)
    dispatch(getProjects())
  }

  const handleClickOpen = (e) => {
    props.receipts ? setIsOpenPopupInvoices(true) : setIsOpenPopupExpenses(true);
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    props.receipts ? setIsOpenPopupInvoices(false) : closeExpenses();
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={classNames('flex', styles.moneyControls)}>
      {(props.me.user_type === 's' && !props.money.payments) &&
        <button
          onClick={handleClickOpenDelete}
          className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}
        >
          <DeleteIcon />
        </button>
      }
      {props.acceptToInvoice &&
        <button
          onClick={handleClickOpen}
          className={classNames('flex', styles.controlBtn, styles.strokeSVG)}
        >
          <EditIcon />
        </button>
      }
      {
        isOpenDelete &&
        <div
          onClick={e => {
            e.stopPropagation();
          }}>
          <ConfirmDelete
            onDelete={props.onDelete}
            closeDelete={handleClickCloseDelete}
          />
        </div>
      }

      {isOpenPopupExpenses &&
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <InvoicesAddPopupContainer
            projectExpense={true}
            projectId={props.projectId}
            projectClient={props.projectClient}
            handleClickClose={handleClickClose}
            close={handleClickClose}
            invoice={props.money}
            submitText={"Готово"}
            popupHeader={`Редактировать счет № ${props.money.id + 10000}`}
            detail={"detail"}
          />
        </div>
      }
      {isOpenPopupInvoices &&
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <InvoicesAddPopupContainer
            projectReceipt={true}
            invoice={props.money}
            projectId={props.projectId}
            projectClient={props.projectClient}
            handleClickClose={handleClickClose}
            close={handleClickClose}
            submitText={"Готово"}
            popupHeader={`Редактировать счет № ${props.money.id + 10000}`}
            detail={"detail"}
          />
        </div>
      }
    </div>
  );
}
