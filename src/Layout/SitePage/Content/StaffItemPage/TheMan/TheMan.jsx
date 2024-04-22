import React from 'react';
import styles from './theman.module.css';
import classNames from 'classnames';
import UserPayments from './UserPayments/UserPayments';

export default function TheMan(props) {
  return (
    <div>
      <div className={styles.theMan}>
        <div className={classNames('flex', styles.theManHeader)}>
          <h2 className={styles.theManTitle}>
            {props.user.last_name} {props.user.first_name} {props.user.father_name}
          </h2>
          {
            props.user.countBalance &&
            <div className={styles.cash}>
              {props.user.balance}&nbsp;&#8381;
            </div>
          }
        </div>
        <div className={classNames('flex', styles.manDatas)}>
          <div className={styles.manInfo}>
            <div className={classNames('flex', styles.infoItem)}>
              <p className={styles.itemTitle}>Телефон</p>
              <p className={styles.itemData}>{props.user.phone}</p>
            </div>
            {props.user.isRegister &&
              <div className={classNames('flex', styles.infoItem)}>
                <p className={styles.itemTitle}>Логин</p>
                <p className={styles.itemData}>{props.user.username}</p>
              </div>
            }
          </div>
          <div className={classNames('flex', styles.description)}>
            <p className={styles.descriptionText}>{props.user.description}</p>
          </div>
        </div>
      </div>
      {
        (props.me.user_type === 's' || props.me.id === props.user.id) &&
        <div className={styles.userPayments}>
          <UserPayments
            userPayments={props.userPayments}
          />
        </div>
      }

    </div >
  );
}
