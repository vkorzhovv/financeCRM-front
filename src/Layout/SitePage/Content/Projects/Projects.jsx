import React from 'react';
import ProjectContent from './ProjectContent/ProjectContent';
import ProjectHeader from './ProjectHeader/ProjectHeader';
import styles from './projects.module.css';
// import classNames from 'classnames';

export default function Projects(props) {

  return (
    <div className={styles.project}>
      <ProjectHeader />
      <ProjectContent />
    </div>
  );
}
