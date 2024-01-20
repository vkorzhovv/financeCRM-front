import React, { useState } from 'react';
import styles from './moneycontrols.module.css';
import classNames from 'classnames';
import DeleteIcon from '../../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../../svgIcons/edit';
import ConfirmDelete from '../../../../../../common/ConfirmDelete/ConfirmDelete';
import ProjectExpensesAddPopupContainer from '../../../ProjectExpensesAddPopup/ProjectExpensesAddPopupContainer';
import InvoicesAddPopupContainer from '../../../../Invoices/InvoicesAddPopup/InvoicesAddPopupContainer';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../../../../../../redux/projectsReducer';
// import CheckIcon from '../../../../../../../svgIcons/check';

export default function MoneyControls(props) {

  const dispatch = useDispatch()

  const [isOpenPopupInvoices, setIsOpenPopupInvoices] = useState(false);
  const [isOpenPopupExpenses, setIsOpenPopupExpenses] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleClickOpenDelete = () => {
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

  const handleClickOpen = () => {
    props.receipts ? setIsOpenPopupInvoices(true) : setIsOpenPopupExpenses(true);
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    props.receipts ? setIsOpenPopupInvoices(false) : closeExpenses();
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={classNames('flex', styles.moneyControls)}>
      <button
        onClick={handleClickOpenDelete}
        className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={handleClickOpen}
        className={classNames('flex', styles.controlBtn, styles.strokeSVG)}
      >
        <EditIcon />
      </button>
      {/* <button className={classNames('flex', styles.controlBtn, styles.fillSVG)}>
        <CheckIcon />
      </button> */}

      {
        isOpenDelete && <ConfirmDelete
          onDelete={props.onDelete}
          closeDelete={handleClickCloseDelete}
        />
      }

      {isOpenPopupExpenses &&
        <ProjectExpensesAddPopupContainer
          projectId={props.projectId}
          handleClickClose={handleClickClose}
          expense={props.money}
          submitText={"Готово"}
          popupHeader={"Редактировать расход"}
          detail={"detail"}
        />
      }
      {isOpenPopupInvoices &&
        <InvoicesAddPopupContainer
          invoice={props.money}
          projectId={props.projectId}
          handleClickClose={handleClickClose}
          close={handleClickClose}
          submitText={"Готово"}
          detail={"detail"}
        />
      }
    </div>
  );
}
