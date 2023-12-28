import React from 'react';
import styles from './userpopup.module.css';
import classNames from 'classnames';
import defaultAvatar from '../../../../../assets/images/defaultPhoto.png'
import { useRef } from 'react';
import { useEffect } from 'react';
import ExitIcon from '../../../../../svgIcons/exit';
import ProfileIcon from '../../../../../svgIcons/profile';

export default function UserPopup(props) {

  const refPopup = useRef(null)

  const exitHandle = () => {
    props.handleClick()
  }

  const outsideHandleClick = (e) => {
    if (refPopup.current && !refPopup.current.contains(e.target)) {
      props.closeUser(false);
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', outsideHandleClick);
    return () => { }
  }, [])

  return (
    <div className={styles.userPopup} ref={refPopup}>
      <div className={classNames('flex', styles.userData)}>
        <div className={classNames('imageBox', styles.avatarBox)}>
          <img src={defaultAvatar} alt="f" />
        </div>
        <div className={classNames('flex', styles.userInfo)}>
          <div className={classNames('flex', styles.userFullName)}>
            <p className={styles.name}>{props.firstName}</p>
            <p className={styles.name}>{props.lastName}</p>
          </div>
          <p className={styles.email}>
            email@email.com
          </p>
        </div>
      </div>
      <div className={classNames(styles.popupBtnBox, styles.cabinetBtnBox)}>
        <button
        className={classNames('flex', styles.popupBtn, styles.strokeSVG)}
        >
          <ProfileIcon />
          <span>Личный кабинет</span>
        </button>
      </div>
      <div className={classNames(styles.popupBtnBox, styles.exitBtnBox)}>
        <button
          className={classNames('logBtn', 'flex', styles.popupBtn, styles.fillSVG)}
          onClick={exitHandle}
        >
          <ExitIcon />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
}
