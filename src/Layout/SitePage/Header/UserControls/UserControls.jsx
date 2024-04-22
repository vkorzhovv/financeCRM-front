import React from 'react';
import styles from './usercontrols.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import UserPopup from './UserPopup/UserPopup';
import MoreIcon from '../../../../svgIcons/more';

export default function UserControls(props) {

  const [isOpenUser, setIsOpenUser] = useState(false)

  const handleClickOpen = () => {
    setIsOpenUser(true)
  }

  return (
    <div className={classNames('flex', styles.controls)}>
      <button
        className={classNames('flex', styles.userBtn)}
        onClick={handleClickOpen}
      >
        <p className={styles.name}>{props.me.first_name}</p>
        <p className={styles.name}>{props.me.last_name}</p>
        <MoreIcon />
      </button>
      {
        props.me.user_type === 's' && props.me.countBalance &&
        <p className={styles.balance}>Баланс&nbsp;{props.me.balance}&nbsp;&#8381;</p>
      }
      {isOpenUser &&
        <UserPopup
          me={props.me}
          closeUser={setIsOpenUser}
          handleClick={props.handleClick}
          isOpen={isOpenUser}
        />
      }
    </div>
  );
}
