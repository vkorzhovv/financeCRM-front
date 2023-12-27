import React from 'react';
import { useSelector } from 'react-redux';
import { selectProjects } from '../../../../redux/projectsSelector';
import ProjectContentContainer from './ProjectContent/ProjectContentContainer';
import ProjectHeader from './ProjectHeader/ProjectHeader';
import styles from './projects.module.css';

export default function Projects(props) {

  let projects = useSelector(selectProjects)

  return (
    <div className={styles.project}>
      <ProjectHeader />
      <ProjectContentContainer projects={projects}/>
    </div>
  );
}
