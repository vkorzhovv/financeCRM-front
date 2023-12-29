import React, { useState } from 'react';
import styles from './cashdata.module.css';
import classNames from 'classnames';
import DeleteIcon from '../../../../../../../svgIcons/delete';
import EditIcon from '../../../../../../../svgIcons/edit';
import CashAddPopup from '../../../CashAddPopup/CashAddPopup';

export default function CashData(props) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleClickOpen = () => {
    console.log('open')
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={classNames('flex', styles.cashData)}>
      <p className={styles.type}>{props.type}</p>
      <p className={styles.name}>{props.name}</p>
      <div className={classNames('flex', styles.btnGroup)}>
        <button className={classNames('flex', styles.controlBtn, styles.fillSVG, styles.deleteBtn)}>
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
        isOpenPopup && <CashAddPopup
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
