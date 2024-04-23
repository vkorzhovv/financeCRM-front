import React, { useState } from 'react';
import styles from './cashdata.module.css';
import classNames from 'classnames';
import DeleteIcon from '../../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../../svgIcons/edit';
import CashAddPopupContainer from '../../../CashAddPopup/CashAddPopupContainer';
import { useDispatch } from 'react-redux';
import { deleteItem, getItems } from '../../../../../../../redux/cashItemReducer';
import ConfirmDelete from '../../../../../../common/ConfirmDelete/ConfirmDelete';

export default function CashData(props) {

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
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }

  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  const handleDelete = async () => {
    await dispatch(deleteItem(props.id))
      .then(() => dispatch(getItems()))
      .then(() => document.body.classList.remove('modal-show'))
  }

  return (
    <div className={classNames('flex', styles.cashData)}>
      <p className={styles.type}>{props.type_name}
      </p>
      <p className={styles.name}>{props.name}</p>
      <div className={classNames('flex', styles.btnGroup)}>
        <button
          className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}
          onClick={handleClickOpenDelete}
        >
          <DeleteIcon />
        </button>
        <button
          onClick={handleClickOpen}
          className={classNames('flex', styles.controlBtn, styles.strokeSVG)}
        >
          <EditIcon />
        </button>
        {
          isOpenDelete && <ConfirmDelete
            closeDelete={handleClickCloseDelete}
            onDelete={handleDelete}
          />
        }
      </div>
      {
        isOpenPopup && <CashAddPopupContainer
          id={props.id}
          name={props.name}
          type={props.typeId}
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={'Редактировать статью'}
          close={setIsOpenPopup}
          detail={'detail'}
        />
      }
    </div>
  );
}
