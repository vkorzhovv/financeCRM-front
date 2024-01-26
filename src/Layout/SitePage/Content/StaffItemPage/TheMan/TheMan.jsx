import React from 'react';
import styles from './theman.module.css';
import classNames from 'classnames';

export default function TheMan(props) {
  return (
    <div className={styles.theMan}>
      <div className={classNames('flex', styles.theManHeader)}>
        <h2 className={styles.theManTitle}>
          {props.user.last_name} {props.user.first_name} {props.user.father_name}
        </h2>
        <div className={styles.cash}>
          {props.user.balance}&nbsp;&#8381;
        </div>
      </div>
      <div className={classNames('flex', styles.manDatas)}>
        <div className={styles.manInfo}>
          <div className={classNames('flex', styles.infoItem)}>
            <p className={styles.itemTitle}>Телефон</p>
            <p className={styles.itemData}>{props.user.phone}</p>
          </div>
          <div className={classNames('flex', styles.infoItem)}>
            <p className={styles.itemTitle}>Логин</p>
            <p className={styles.itemData}>{props.user.username}</p>
          </div>
          {/* <div className={classNames('flex', styles.infoItem)}>
            <p className={styles.itemTitle}>Пароль</p>
            <p className={styles.itemData}>veryhard</p>
          </div> */}
        </div>
        <div className={classNames('flex', styles.description)}>
          {/* <p className={styles.itemTitle}>Описание</p> */}
          <p className={styles.descriptionText}>{props.user.description}</p>
        </div>
      </div>
    </div>
  );
}
