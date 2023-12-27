import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../../redux/usersReducer';
import PageHeader from '../../../common/PageHeader/PageHeader';
import StaffAddPopup from '../Staff/StaffAddPopup/StaffAddPopup';
import StaffItem from '../Staff/StaffContent/StaffItem/StaffItem';
import styles from './staffitempage.module.css';
import TheMan from './TheMan/TheMan';
import { useNavigate } from "react-router-dom";

export default function StaffItemPage(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }

  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  const onDelete = () => {
    dispatch(deleteUser(props.user.id));
    navigate("/staff");
  }

  const staff =
  {
    title: 'Клиенты',
    person: [
      {
        surname: 'Дмитриев',
        name: 'Дмитрий',
        patronymic: 'Дмитриевич',
        phone: '+7 (999) 222 22 22',
        balance: 'баланс'
      },
      {
        surname: 'Игорев',
        name: 'Игорь',
        patronymic: 'Игоревич',
        phone: '+7 (000) 000 00 00',
        balance: 'баланс'
      },
      {
        surname: 'Васильев',
        name: 'Василий',
        patronymic: 'Васильевич',
        phone: '+7 (000) 070 60 00',
        balance: 'баланс'
      },
    ]
  }

  return (
    <div className={styles.staffItemPage}>
      <PageHeader
        title={'Сотрудники и подрядчики'}
        addBtnText={'Редактировать'}
        detail={'detail'}
        handleClickAdd={handleClickOpen}
        onDelete={onDelete}
      />
      {
        isOpenPopup && <StaffAddPopup
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={'Редактировать пользователя'}
          detail={'detail'}
          user={props.user}
          close={setIsOpenPopup}
        />
      }
      <div className={styles.staffItemContent}>
        <StaffItem
          title={staff.title}
          people={staff.person}
        />
        <TheMan user={props.user} />
      </div>
    </div>
  );
}
