import React from "react";
import { createPortal } from "react-dom";
import styles from './confirmdelete.module.css';
import classNames from "classnames";

export default function ConfirmDelete(props) {

  return (
    createPortal((
      <div className={classNames('flex', 'popup', styles.deletePopup)}>
        <div className={classNames('flex', 'popupWindow', styles.deletePopupWindow)}>
          <h2 className={styles.deleteHeader}>Подтвердите удаление</h2>
          <div>
            <button
              className={classNames('btn', 'btnTransparent', styles.deleteBtn)}
              onClick={props.onDelete}
            >
              Удалить
            </button>
            <button
              className={classNames('btn', styles.addBtn)}
              onClick={props.closeDelete}
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    ), document.getElementById('modal_root'))
  )
}
