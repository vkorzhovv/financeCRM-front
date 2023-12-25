import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './projectslist.module.css';

export default function ProjectsList(props) {

  return (
    <NavLink
      to={`/projects/${props.projectItem.id}`}
      className={styles.projectLink}
    >
      {props.projectItem.name}
    </NavLink>
  );
}
