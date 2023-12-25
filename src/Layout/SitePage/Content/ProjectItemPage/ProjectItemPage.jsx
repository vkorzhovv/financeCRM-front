import React, { useState } from 'react';
import PageHeader from '../../../common/PageHeader/PageHeader';
import ProjectAddPopup from '../Projects/ProjectAddPopup/ProjectAddPopup';
import ProjectData from './ProjectData/ProjectData';
import styles from './projectitempage.module.css';
import ProjectsList from './ProjectsList/ProjectsList';
// import classNames from 'classnames';

export default function ProjectItemPage(props) {

  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const handleClickOpen = () => {
    setIsOpenPopup(true)
    document.body.classList.add('modal-show');
  }
  const handleClickClose = () => {
    setIsOpenPopup(false)
    document.body.classList.remove('modal-show');
  }

  const project = {
    name: 'Главный проект',
    manager: 'Петров Петр Петрович',
    client: 'Сидоров Сидор Сидорович',
    foreman: 'Николаев Николай Николаевич',
    start: '01.02.2022',
    end: '01.02.2024',
    summ: '1 000 000 р',
    balance: '500 000 р',
    expend: '5,3 л',
    status: 'Активен',
    description: 'Описание. Стены из гипсокартона под покраску или обои. Несмотря на высокую стоимость материалов и сложность подготовки стен, это самый популярный вид отделки жилых домов.'
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
        handleClickAdd={handleClickOpen}
      />

      {
        isOpenPopup && <ProjectAddPopup
          handleClickClose={handleClickClose}
          submitText={'Готово'}
          popupHeader={'Редактировать проект'}
        />
      }

      <div className ={styles.projectItemContent}>
        <div className={styles.projectsList}>
          <p className={styles.projectListTitle}>Название проекта</p>
          {list.map(item =>
            <ProjectsList projectItem={item} />
          )}
        </div>
        <ProjectData
          project={project}
          costs={costs}
          payments={payments}
        />
      </div>

    </div>
  );
}
