import React from 'react';
import { setupInterceptor } from '../../API/api';
import Content from './Content/Content';
import Header from './Header/Header';
import styles from './sitepage.module.css';
import { store } from '../../redux/reduxStore';

export default function SitePage(props) {
  setupInterceptor(store)

  return (
    <div className={styles.sitePage}>
      <Header />
      <Content />
    </div>
  );
}
