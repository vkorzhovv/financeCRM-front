import React from 'react';
import styles from './avatar.module.css';
import classNames from 'classnames';
import defaultAvatar from '../../../../../assets/images/defaultPhoto.png'


export default function Avatar(props) {

  return (
    <div className={classNames('imageBox', styles.avatarBox)}>
      <img src={defaultAvatar} alt="f" />
    </div>
  );
}
