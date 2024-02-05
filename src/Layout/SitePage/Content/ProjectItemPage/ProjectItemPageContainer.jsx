import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { selectMe } from '../../../../redux/authSelectors';
import { getProjectExpenses, getProjectReceipts } from '../../../../redux/invoicesReducer';
import { selectProjectExpenses, selectProjectReceipts } from '../../../../redux/invoicesSelector';
import { getProjectItem } from '../../../../redux/projectItemReducer';
import { selectProjectItem } from '../../../../redux/projectItemSelector';
import { getProjects, getUserProjects } from '../../../../redux/projectsReducer';
import { selectProjects } from '../../../../redux/projectsSelector';
import ProjectItemPage from './ProjectItemPage';

export default function ProjectItemPageContainer(props) {

  const me = useSelector(selectMe);

  const dispatch = useDispatch();
  const project = useSelector(selectProjectItem);
  const allProjects = useSelector(selectProjects);
  const projectInvoices = useSelector(selectProjectReceipts);
  const projectExpenses = useSelector(selectProjectExpenses)

  let { projectId } = useParams();

  useEffect(() => {
    dispatch(getProjectItem(projectId))
    dispatch(getProjectReceipts(projectId))
    dispatch(getProjectExpenses(projectId))
    me.user_type && me.user_type === 's' && dispatch(getProjects());
    me.user_type && me.user_type !== 's' && dispatch(getUserProjects(me.id));
  }, [dispatch, projectId, me.user_type])

  return (
    <ProjectItemPage
      projectExpenses={projectExpenses}
      project={project}
      projectInvoices={projectInvoices}
      allProjects={allProjects}
    />
  );
}
