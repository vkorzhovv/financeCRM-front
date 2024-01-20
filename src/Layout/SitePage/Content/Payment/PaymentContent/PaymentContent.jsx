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
      <div className={classNames('table')}>
        <div className={classNames('tableHeader', styles.titles)}>
          <div className={classNames('tableRow')}>
            {projectTh.map((item, index) =>
              <div
                key={item + index}
                className={classNames('tableCell', styles.titlesItem)}>
                {item}
              </div>
            )}
          </div>
        </div>
        <div className={classNames('tableBody')}>
          {props.payments && props.payments.map(item =>
            <PaymentItem
              key={item.id}
              item={item}
            />
          )}
        </div>
      </div>
    </div>
  );
}
