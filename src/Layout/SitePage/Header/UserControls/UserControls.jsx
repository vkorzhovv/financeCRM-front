import React from 'react';
import styles from './usercontrols.module.css';
import classNames from 'classnames';
import { useState } from 'react';
import UserPopup from './UserPopup/UserPopup';
import Avatar from './Avatar/Avatar';

export default function UserControls(props) {

  const [isOpenUser, setIsOpenUser] = useState(false)

  const handleClickOpen = () => {
    setIsOpenUser(true)
  }

  return (
    <div className={classNames('flex', styles.controls)}>
      <Avatar />
      <button
        className={classNames('flex', styles.userBtn)}
        onClick={handleClickOpen}
      >
        <p className={styles.name}>{props.firstName}</p>
        <p className={styles.name}>{props.lastName}</p>
      </button>
        {isOpenUser &&
          <UserPopup
            lastName={props.lastName}
            firstName={props.firstName}
            closeUser={setIsOpenUser}
            handleClick={props.handleClick}
            isOpen={isOpenUser}
          />
        }
    </div>
  );
}
