import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMe } from '../../../../../redux/authSelectors';
import { filterProject, getProjects, getUserProjects } from '../../../../../redux/projectsReducer';
import { selectFilteredProjects } from '../../../../../redux/projectsSelector';
import ProjectContent from './ProjectContent';

export default function ProjectContentContainer(props) {

  const dispatch = useDispatch();
  const me = useSelector(selectMe);
  const projects = useSelector(selectFilteredProjects);

  useEffect(() => {
    Promise.all([
      me.user_type && me.user_type === 's' && dispatch(getProjects()),
      me.user_type && me.user_type !== 's' && dispatch(getUserProjects(me.id))
    ])
    .then(()=> {
      dispatch(filterProject(
        sessionStorage.getItem('projectManager') || '',
        sessionStorage.getItem('projectForeman') || '',
        sessionStorage.getItem('projectClient') || '',
        sessionStorage.getItem('projectStartDate') || '',
        sessionStorage.getItem('projectEndDate') || '',
        sessionStorage.getItem('projectSummMin') || 0,
        sessionStorage.getItem('projectSummMax') || 'Infinity',
        sessionStorage.getItem('projectBalanceMin') || '-Infinity',
        sessionStorage.getItem('projectBalanceMax') || 'Infinity',
        sessionStorage.getItem('projectExpensesMin') || '-Infinity',
        sessionStorage.getItem('projectExpensesMax') || 'Infinity',
        sessionStorage.getItem('projectStatus') || ''
      ))
    })


  }, [dispatch, me])

  return (
    <ProjectContent
      projects={projects}
    />
  );
}
