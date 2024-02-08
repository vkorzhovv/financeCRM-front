import React from 'react';
import styles from './userpayments.module.css';
import classNames from 'classnames';
import UserPaymentItem from './UserPaymentItem/UserPaymentItem';

export default function UserPayments(props) {
  return (
    <div className={classNames(styles.invoiceMoney)}>
      <div className={classNames('flex', styles.moneyHeader)}>
        <h3 className={classNames(styles.moneyHeaderText)}>Платежи пользователя</h3>
      </div>
      <div className={styles.tableWrapper}>
        <div className={classNames('table', styles.moneyTable)}>
          {props.userPayments && props.userPayments.length ?
            props.userPayments.map(item =>
              <UserPaymentItem
                key={item.id}
                item={item}
              />
            )
            :
            <p>Нет платежей</p>
          }
        </div>
      </div>
    </div>
  );
}
