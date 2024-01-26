import React from 'react';
import ProjectContentContainer from './ProjectContent/ProjectContentContainer';
import ProjectHeader from './ProjectHeader/ProjectHeader';
import styles from './projects.module.css';

export default function Projects(props) {

  return (
    <div className={styles.project}>
      <ProjectHeader />
      <ProjectContentContainer />
    </div>
  );
}
