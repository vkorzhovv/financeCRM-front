import classNames from 'classnames';
import React from 'react';
import styles from './paymentcontent.module.css';
import PaymentItem from './PaymentItem/PaymentItem';

export default function PaymentContent(props) {

  const projectTh = [
    'Номер платежа',
    'Номер счета',
    'Проект',
    'Получатель',
    'Плательщик',
    'Дата начисления',
    'Статус платежа',
    'Сумма счета',
    'Сумма оплачено',
  ]

  return (
    <div className={styles.paymentContent}>
      <table className={classNames('table')}>
        <thead className={styles.titles}>
          <tr>
            {projectTh.map(item =>
              <th className={styles.titlesItem}>{item}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.payments && props.payments.map(item =>
            <PaymentItem
              key={item.id}
              item={item}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
