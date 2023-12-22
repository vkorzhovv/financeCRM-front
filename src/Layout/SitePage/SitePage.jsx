import React from 'react';
import Content from './Content/Content';
import Header from './Header/Header';
import styles from './sitepage.module.css';
// import classNames from 'classnames';

export default function SitePage(props) {

  return (
    <div className={styles.sitePage}>
      <Header />
      <Content />
    </div>
  );
}
