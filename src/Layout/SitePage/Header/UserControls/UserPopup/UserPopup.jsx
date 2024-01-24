import React from 'react';
import styles from './userpopup.module.css';
import classNames from 'classnames';
import { useRef } from 'react';
import { useEffect } from 'react';
import ExitIcon from '../../../../../svgIcons/exit';
import ProfileIcon from '../../../../../svgIcons/profile';
import { NavLink } from 'react-router-dom';

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
        <div className={classNames('flex', styles.userInfo)}>
          <div className={classNames('flex', styles.userFullName)}>
            <p className={styles.name}>{props.me.first_name}</p>
            <p className={styles.name}>{props.me.last_name}</p>
          </div>
          <p className={styles.email}>
            {props.me.username}
          </p>
        </div>
      </div>
      <div className={classNames(styles.popupBtnBox, styles.cabinetBtnBox)}>
        <NavLink
          className={classNames('flex', styles.popupBtn, styles.strokeSVG)}
          to={`/staff/${props.me.id}`}
        >

          <ProfileIcon />
          <span>Личный кабинет</span>
        </NavLink>
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
