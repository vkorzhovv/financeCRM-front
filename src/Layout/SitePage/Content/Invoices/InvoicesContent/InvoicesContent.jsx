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
          {props.invoices.length ?
            props.invoices.map(item =>
              <InvoicesItem
                key={item.id}
                item={item}
              />
            )
            :
            "Счета отсутсвуют"
          }
        </div>
      </div>
    </div>
  );
}
