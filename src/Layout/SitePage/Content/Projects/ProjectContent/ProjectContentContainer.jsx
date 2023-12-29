import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../../../../redux/projectsReducer';
import { selectProjects } from '../../../../../redux/projectsSelector';
import ProjectContent from './ProjectContent';

export default function ProjectContentContainer(props) {

  const dispatch = useDispatch()
  const projects = useSelector(selectProjects)

  useEffect(() => {
    dispatch(getProjects())
  }, [dispatch])

  return (
    <ProjectContent
      projects={projects}
    />
  );
}
