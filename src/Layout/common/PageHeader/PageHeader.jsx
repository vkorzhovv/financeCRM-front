import React from 'react';
import PageControls from '../PageControls/PageControls';
import styles from './pageheader.module.css';
import classNames from 'classnames';

export default function PageHeader(props) {

  return (
    <div className={classNames('flex', styles.pageHeader)}>
      <h1 className={classNames(styles.pageTitle)}>
        {props.title}
      </h1>
      <PageControls
        addBtnText={props.addBtnText}
        handleClickAdd={props.handleClickAdd}
        detail={props.detail}
        onDelete={props.onDelete}
      />
    </div>
  );
}
