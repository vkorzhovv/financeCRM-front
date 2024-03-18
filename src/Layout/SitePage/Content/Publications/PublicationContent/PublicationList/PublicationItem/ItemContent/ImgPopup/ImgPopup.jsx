import classNames from "classnames";
import React from "react";
import { createPortal } from "react-dom";
import styles from './imgpopup.module.css';

export default function ImgPopup(props) {
  return createPortal((
    <div
      onClick={(e) => e.stopPropagation()}
      className={classNames('flex', 'popup', styles.imgPopup)}
    >
      <div className={classNames('flex', 'imageBox', styles.imageInPopup)}>
        <img src={props.file}/>
      </div>
      <button
        className={classNames(styles.deleteFileBtn)}
        onClick={props.handleClickClose}
      >
        <span className={classNames(styles.horLine, styles.line)}></span>
        <span className={classNames(styles.verLine, styles.line)}></span>
      </button>
    </div>
  ), document.getElementById('modal_root'))
}
