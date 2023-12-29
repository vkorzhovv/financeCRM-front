import React from 'react';
import styles from './invoices.module.css';
import InvoicesContentContainer from './InvoicesContent/InvoicesContentContainer';
import InvoicesHeader from './InvoicesHeader/InvoicesHeader';
// import classNames from 'classnames';

export default function Invoices(props) {

  return (
    <div className={styles.invoices}>
      <InvoicesHeader />
      <InvoicesContentContainer />
    </div>
  );
}
