import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../common/PageHeader/PageHeader';
import ProjectData from './ProjectData/ProjectData';
import styles from './projectitempage.module.css';
import ProjectsList from './ProjectsList/ProjectsList';
import { useNavigate } from "react-router-dom";
import { deleteProject } from '../../../../redux/projectsReducer';
import ProjectAddPopupContainer from '../Projects/ProjectAddPopup/ProjectAddPopupContainer';
import { selectMe } from '../../../../redux/authSelectors';

export default function ProjectItemPage(props) {

  const me = useSelector(selectMe);
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

  const onDelete = async () => {
    await dispatch(deleteProject(props.project.id))
      .then(() => {
        navigate("/projects");
        document.body.classList.remove('modal-show')
      })
  }

  const client = props.project.client && props.project.client.id;

  return (
    <div className={styles.projectItemPage}>
      <PageHeader
        title={'Проекты'}
        addBtnText={'Редактировать'}
        detail={'detail'}
        onDelete={onDelete}
        handleClickAdd={handleClickOpen}
        access={me.user_type === 's'}
        accessDelete={me.user_type === 's'}
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
          {props.allProjects && props.allProjects.map(item =>
            <ProjectsList key={item.id} projectItem={item} />
          )}
        </div>
        <ProjectData
          project={props.project}
          projectClient={client}
          projectId={props.project.id}
          projectInvoices={props.projectInvoices}
          projectExpenses={props.projectExpenses}
          coordinates={props.project.coordinates}
        />
      </div>
    </div>
  );
}
