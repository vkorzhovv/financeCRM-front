import React from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import styles from './cashheader.module.css';

export default function CashHeader(props) {

  return (
    <div className={styles.staffheader}>
      <PageHeader
        title={'Статьи расходов/доходов'}
        addBtnText={'Добавить'}
        withoutCash={'without'}
      />
    </div>
  );
}
