import React from 'react';
import { useState } from 'react';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import styles from './projectheader.module.css';
import ProjectAddPopupContainer from '../ProjectAddPopup/ProjectAddPopupContainer';
import { useSelector } from 'react-redux';
import { selectMe } from '../../../../../redux/authSelectors';

export default function ProjectHeader(props) {

  const me = useSelector(selectMe);

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
      access={me.user_type === 's'}
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
