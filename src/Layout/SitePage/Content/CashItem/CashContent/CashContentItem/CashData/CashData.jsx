import React, { useState } from 'react';
import styles from './cashdata.module.css';
import classNames from 'classnames';
import DeleteIcon from '../../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../../svgIcons/edit';
import CashAddPopupContainer from '../../../CashAddPopup/CashAddPopupContainer';
import { useDispatch } from 'react-redux';
import { deleteItem, getItems } from '../../../../../../../redux/cashItemReducer';

export default function CashData(props) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    console.log('open')
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  const handleDelete = async () => {
    await dispatch(deleteItem(props.id))
      .then(() => dispatch(getItems()));
  }

  return (
    <div className={classNames('flex', styles.cashData)}>
      <p className={styles.type}>{
        props.type === 'p' ?
          "Поступление" :
          props.type === 'o' ?
            "Операционные" :
            props.type === 's' ?
              "Стройматериалы" :
              props.type === 'n' ?
                "Налоги" :
                props.type === 'z' ?
                  "Зарплата" : "Другие"
      }
      </p>
      <p className={styles.name}>{props.name}</p>
      <div className={classNames('flex', styles.btnGroup)}>
        <button
          className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </button>
        <button
          onClick={handleClickOpen}
          className={classNames('flex', styles.controlBtn, styles.strokeSVG)}
        >
          <EditIcon />
        </button>
      </div>
      {
        isOpenPopup && <CashAddPopupContainer
          id={props.id}
          name={props.name}
          type={props.type}

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
