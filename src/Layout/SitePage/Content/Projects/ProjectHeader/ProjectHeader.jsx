import React from 'react';
import { useState } from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import styles from './projectheader.module.css';
// import ProjectAddPopup from '../ProjectAddPopup/ProjectAddPopup';
import ProjectAddPopupContainer from '../ProjectAddPopup/ProjectAddPopupContainer';
// import classNames from 'classnames';

export default function ProjectHeader(props) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  return (
    <div className={styles.projectheader}>
      <PageHeader
      title={'Проекты'}
      addBtnText = {'Добавить проект'}
      handleClickAdd={handleClickOpen}
      />
      {
        isOpenPopup && <ProjectAddPopupContainer
        handleClickClose={handleClickClose}
        submitText = {'Добавить'}
        popupHeader = {'Добавить проект'}
        close={setIsOpenPopup}
        />
      }
    </div>
  );
}
