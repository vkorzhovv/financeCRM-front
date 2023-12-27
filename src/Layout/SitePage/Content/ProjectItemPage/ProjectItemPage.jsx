import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PageHeader from '../../../common/PageHeader/PageHeader';
import ProjectData from './ProjectData/ProjectData';
import styles from './projectitempage.module.css';
import ProjectsList from './ProjectsList/ProjectsList';
import { useNavigate } from "react-router-dom";
import { deleteProject } from '../../../../redux/projectsReducer';
import ProjectAddPopupContainer from '../Projects/ProjectAddPopup/ProjectAddPopupContainer';

export default function ProjectItemPage(props) {

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
    dispatch(deleteProject(props.project.id));
    navigate("/projects");
  }

  const payments = [
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      purpose: 'Назначение'
    },
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      purpose: 'Назначение'
    },
  ]

  const costs = [
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      purpose: 'Назначение'
    },
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      purpose: 'Назначение'
    },
    {
      payer: 'Плательщик',
      date: 'дд.мм.гггг',
      summ: 'сумма',
      purpose: 'Назначение'
    },
  ]

  const list = [
    {
      name: 'Главный проект',
      id: 'id'
    },
    {
      name: 'Главный проект',
      id: 'id'
    },
    {
      name: 'Главный проект',
      id: 'id'
    },
  ]

  return (
    <div className={styles.projectItemPage}>
      <PageHeader
        title={'Проекты'}
        addBtnText={'Редактировать'}
        detail={'detail'}
        onDelete={onDelete}
        handleClickAdd={handleClickOpen}
      />

      {
        isOpenPopup && <ProjectAddPopupContainer
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={'Редактировать проект'}
          detail={'detail'}
          project={props.project}
          close={setIsOpenPopup}
        />
      }

      <div className={styles.projectItemContent}>
        <div className={styles.projectsList}>
          <p className={styles.projectListTitle}>Название проекта</p>
          {list.map(item =>
            <ProjectsList projectItem={item} />
          )}
        </div>
        <ProjectData
          project={props.project}
          costs={costs}
          payments={payments}
        />
      </div>

    </div>
  );
}
