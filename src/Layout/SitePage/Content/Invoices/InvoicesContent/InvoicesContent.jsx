import classNames from 'classnames';
import React from 'react';
import styles from './invoicescontent.module.css';
import InvoicesItem from './InvoicesItem/InvoicesItem';

export default function InvoicesContent(props) {

  const projectTh = [
    'Номер счета',
    'Проект',
    'Получатель',
    'Плательщик',
    'Дата выставления',
    'Статус оплаты',
    'Сумма счета',
    'Поступления',
  ]

  return (
    <div className={styles.invoicesContent}>
      <table className={classNames('table')}>
        <thead className={styles.titles}>
          <tr>
            {projectTh.map(item =>
              <th key={item} className={styles.titlesItem}>{item}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {props.invoices && props.invoices.map(item =>
            <InvoicesItem
              key={item.id}
              item={item}
            />
          )}
        </tbody>
      </table>
    </div>
  );
}
