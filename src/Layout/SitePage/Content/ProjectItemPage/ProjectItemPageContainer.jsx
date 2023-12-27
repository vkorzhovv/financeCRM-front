import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { getProjectItem } from '../../../../redux/projectItemReducer';
import { selectProjectItem } from '../../../../redux/projectItemSelector';
import ProjectItemPage from './ProjectItemPage';

export default function ProjectItemPageContainer(props) {

  const dispatch = useDispatch();
  const project = useSelector(selectProjectItem);

  let { projectId } = useParams();

  useEffect(() => {
    dispatch(getProjectItem(projectId))
  }, [dispatch, projectId])

  return (
    <ProjectItemPage project={project} />
  );
}
