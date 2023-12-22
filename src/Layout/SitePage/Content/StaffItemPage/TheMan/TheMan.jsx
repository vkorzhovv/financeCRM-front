import React from 'react';
import styles from './theman.module.css';
import classNames from 'classnames';

export default function TheMan(props) {
  debugger;
  return (
    <div className={styles.theMan}>
      <div className={classNames('flex',styles.theManHeader)}>
        <h2 className={styles.theManTitle}>Фамилия Имя Отчество</h2>
        <div className={styles.cash}>
          100 000 р
        </div>
      </div>
      <div className={classNames('flex', styles.manDatas)}>
        <div className={styles.manInfo}>
          <div className={classNames('flex', styles.infoItem)}>
            <p className={styles.itemTitle}>Телефон</p>
            <p className={styles.itemData}>+654654654</p>
          </div>
          <div className={classNames('flex', styles.infoItem)}>
            <p className={styles.itemTitle}>Логин</p>
            <p className={styles.itemData}>Vaska</p>
          </div>
          <div className={classNames('flex', styles.infoItem)}>
            <p className={styles.itemTitle}>Пароль</p>
            <p className={styles.itemData}>veryhard</p>
          </div>
        </div>
        <div className={classNames('flex', styles.description)}>
          <p className={styles.itemTitle}>Описание</p>
          <p className={styles.descriptionText}>Очень много текста</p>
        </div>
      </div>
    </div>
  );
}
