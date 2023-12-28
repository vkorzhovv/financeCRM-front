import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProjectItem } from '../../../../redux/projectItemReducer';
import { selectProjectItem } from '../../../../redux/projectItemSelector';
import { getProjects } from '../../../../redux/projectsReducer';
import { selectProjects } from '../../../../redux/projectsSelector';
import ProjectItemPage from './ProjectItemPage';

export default function ProjectItemPageContainer(props) {

  const dispatch = useDispatch();
  const project = useSelector(selectProjectItem);
  const allProjects = useSelector(selectProjects)

  let { projectId } = useParams();

  useEffect(() => {
    dispatch(getProjectItem(projectId))
    dispatch(getProjects())
  }, [dispatch, projectId])

  return (
    <ProjectItemPage project={project} allProjects={allProjects}/>
  );
}
