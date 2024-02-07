import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMe } from '../../../../../redux/authSelectors';
import PageHeader from '../../../../common/PageHeader/PageHeader';
import StaffAddPopup from '../StaffAddPopup/StaffAddPopup';
import styles from './staffheader.module.css';

export default function StaffHeader(props) {

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
    <div className={styles.staffheader}>
      <PageHeader
        title={'Сотрудники и подрядчики'}
        addBtnText={'Добавить'}
        handleClickAdd={handleClickOpen}
        access={me.user_type === 's'}

        usersFilter={true}
        usersSearch={true}
        searchPlaceholder="Ф.И.О."
      />
      {
        isOpenPopup && <StaffAddPopup
        handleClickClose={handleClickClose}
        submitText = {'Добавить'}
        popupHeader = {'Добавить пользователя'}
        close={setIsOpenPopup}
        />
      }
    </div>
  );
}
