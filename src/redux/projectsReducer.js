import { projectsAPI } from "../API/api";

const SET_PROJECTS = 'SET_PROJECTS';
const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
const ADD_PROJECTS = 'ADD_PROJECTS';
const SEARCH_PROJECT = 'SEARCH_PROJECT';
const FILTER_PROJECT = 'FILTER_PROJECT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  projects: [],
  filteredProjects: [],
  filterDatas: {
    manager: sessionStorage.getItem('projectManager') || '',
    foreman: sessionStorage.getItem('projectForeman') || '',
    client: sessionStorage.getItem('projectClient') || '',
    projectStartDate: sessionStorage.getItem('projectStartDate') || '',
    projectEndDate: sessionStorage.getItem('projectEndDate') || '',
    summMin: sessionStorage.getItem('projectSummMin') || '0',
    summMax: sessionStorage.getItem('projectSummMax') || 'Infinity',
    balanceMin: sessionStorage.getItem('projectBalanceMin') || '-Infinity',
    balanceMax: sessionStorage.getItem('projectBalanceMax') || 'Infinity',
    expensesMin: sessionStorage.getItem('projectExpensesMin') || '-Infinity',
    expensesMax: sessionStorage.getItem('projectExpensesMax') || 'Infinity',
    status: sessionStorage.getItem('projectStatus') || '',
  },
  searchProject: '',
  isFetching: false
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.projects,

      }
    case SET_USER_PROJECTS:
      return {
        ...state,
        projects: action.projects,
      }
    case ADD_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, action.newProject]
      }
    case SEARCH_PROJECT: {
      return {
        ...state,
        searchProject: action.searchProject,
        filteredProjects: state.projects.length
          ? [...state.projects]
            .filter(item => (`${item.name}
              ${item.description}
              ${item.project_manager && item.project_manager.last_name} ${item.project_manager && item.project_manager.first_name} ${item.project_manager && item.project_manager.father_name}
              ${item.client && item.client.last_name} ${item.client && item.client.first_name} ${item.client && item.client.father_name}
              ${item.foreman && item.foreman.last_name} ${item.foreman && item.foreman.first_name} ${item.foreman && item.foreman.father_name}`
              .toLowerCase()).includes(action.searchProject))
          : [],
      }
    }
    case FILTER_PROJECT: {
      return {
        ...state,
        filterDatas: action.filterDatas,
        filteredProjects: state.filteredProjects.length
          ? [...state.filteredProjects]
            .filter(item => action.filterDatas.manager === '' ? item : +action.filterDatas.manager === +item.project_manager.id)
            .filter(item => action.filterDatas.foreman === '' ? item : +action.filterDatas.foreman === +item.foreman.id)
            .filter(item => action.filterDatas.client === '' ? item : +action.filterDatas.client === +item.client.id)
            .filter(item => action.filterDatas.projectStartDate === '' ? item : new Date(action.filterDatas.projectStartDate).getTime() <= new Date(item.start_date).getTime())
            .filter(item => action.filterDatas.projectEndDate === '' ? item : new Date(action.filterDatas.projectEndDate).getTime() >= new Date(item.end_date).getTime())
            .filter(item => +item.price >= +action.filterDatas.summMin && +item.price <= +action.filterDatas.summMax)
            .filter(item => +item.balance >= +action.filterDatas.balanceMin && +item.balance <= +action.filterDatas.balanceMax)
            .filter(item => +item.expenses >= +action.filterDatas.expensesMin && +item.expenses <= +action.filterDatas.expensesMax)
            .filter(item => action.filterDatas.status === '' ? item : item.active === Boolean(Number(action.filterDatas.status)))
          : [],
      }
    }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default: return { ...state };
  }
}

const setProjects = (projects) => ({ type: SET_PROJECTS, projects });
const setUserProjects = (projects) => ({ type: SET_USER_PROJECTS, projects });
const setAddProjects = (newProject) => ({ type: ADD_PROJECTS, newProject });
const setSearchProject = (searchProject) => ({ type: SEARCH_PROJECT, searchProject });
const setFilterProject = (
  manager,
  foreman,
  client,
  start,
  end,
  minSumm,
  maxSumm,
  minBalance,
  maxBalance,
  minExpense,
  maxExpense,
  status,
) => ({
  type: FILTER_PROJECT,
  filterDatas: {
    manager: manager,
    foreman: foreman,
    client: client,
    projectStartDate: start,
    projectEndDate: end,
    summMin: minSumm,
    summMax: maxSumm,
    balanceMin: minBalance,
    balanceMax: maxBalance,
    expensesMin: minExpense,
    expensesMax: maxExpense,
    status: status
  }
});
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

const filterFunctions = (dispatch) => {
  dispatch(setSearchProject(localStorage.getItem('searchProject')) || '');
  dispatch(setFilterProject(
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
  ));
}

export const getProjects = () => async (dispatch) => {
  await projectsAPI.getProjects()
    .then(response => dispatch(setProjects(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}

export const getUserProjects = (userId) => async (dispatch) => {
  await projectsAPI.getUserProjects(userId)
    .then(response => dispatch(setUserProjects(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}

export const addProject = (
  name,
  description,
  start,
  end,
  price,
  active,
  manager,
  client,
  foreman,
  coordinates) => async (dispatch) => {

    dispatch(toggleIsFetching(true))

    await projectsAPI.addProject(name,
      description,
      start,
      end,
      price,
      active,
      manager,
      client,
      foreman,
      coordinates)
      .then(response => {
        dispatch(setAddProjects(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })

    filterFunctions(dispatch);
  }

export const searchProject = (searchText) => (dispatch) => {
  let text = searchText.toLowerCase()
  localStorage.setItem('searchProject', text);
  dispatch(setSearchProject(text));
  dispatch(setFilterProject(
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
  ));
}

export const filterProject = (
  manager,
  foreman,
  client,
  start,
  end,
  minSumm,
  maxSumm,
  minBalance,
  maxBalance,
  minExpense,
  maxExpense,
  status
) => (dispatch) => {
  sessionStorage.setItem('projectManager', manager)
  sessionStorage.setItem('projectForeman', foreman)
  sessionStorage.setItem('projectClient', client)
  sessionStorage.setItem('projectStartDate', start)
  sessionStorage.setItem('projectEndDate', end)
  sessionStorage.setItem('projectSummMin', minSumm)
  sessionStorage.setItem('projectSummMax', maxSumm)
  sessionStorage.setItem('projectBalanceMin', minBalance)
  sessionStorage.setItem('projectBalanceMax', maxBalance)
  sessionStorage.setItem('projectExpensesMin', minExpense)
  sessionStorage.setItem('projectExpensesMax', maxExpense)
  sessionStorage.setItem('projectStatus', status)

  dispatch(setSearchProject(localStorage.getItem('searchProject')) || '');
  dispatch(setFilterProject(
    manager,
    foreman,
    client,
    start,
    end,
    minSumm,
    maxSumm,
    minBalance,
    maxBalance,
    minExpense,
    maxExpense,
    status
  ));
}

export const deleteProject = (projectId) => async () => {
  await projectsAPI.deleteProject(projectId);
}
