import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../../../../../redux/authSelectors';
import { getProjects, getUserProjects } from '../../../../../redux/projectsReducer';
import { selectFilteredProjects } from '../../../../../redux/projectsSelector';
import ProjectContent from './ProjectContent';

export default function ProjectContentContainer(props) {

  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const projects = useSelector(selectFilteredProjects);

  useEffect(() => {
    me.user_type && me.user_type === 's' && dispatch(getProjects());
    me.user_type && me.user_type !== 's' && dispatch(getUserProjects(me.id));
  }, [dispatch, me])

  return (
    <ProjectContent
      projects={projects}
    />
  );
}
