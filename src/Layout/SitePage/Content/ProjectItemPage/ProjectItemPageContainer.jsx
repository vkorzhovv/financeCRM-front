import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { selectMe } from '../../../../redux/authSelectors';
import { getProjectInvoices } from '../../../../redux/invoicesReducer';
import { selectProjectInvoices } from '../../../../redux/invoicesSelector';
import { getExpenses } from '../../../../redux/projectExpensesReducer';
import { selectExpenses } from '../../../../redux/projectExpensesSelector';
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
  const projectInvoices = useSelector(selectProjectInvoices);
  const projectExpenses = useSelector(selectExpenses)

  let { projectId } = useParams();

  useEffect(() => {
    dispatch(getProjectItem(projectId))
    dispatch(getProjectInvoices(projectId))
    dispatch(getExpenses(projectId))
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
