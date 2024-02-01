import { projectsAPI } from "../API/api";

const SET_PROJECTS = 'SET_PROJECTS';
const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
const ADD_PROJECTS = 'ADD_PROJECTS';
const SEARCH_PROJECT = 'SEARCH_PROJECT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  projects: [],
  filteredProjects: [],
  searchProject: '',
  isFetching: false
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.projects
      }
    case SET_USER_PROJECTS:
      return {
        ...state,
        projects: action.projects
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
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getProjects = () => async (dispatch) => {
  await projectsAPI.getProjects()
    .then(response => dispatch(setProjects(response.data)))
    .catch(err => console.log(err))

  dispatch(setSearchProject(''));
}

export const getUserProjects = (userId) => async (dispatch) => {
  await projectsAPI.getUserProjects(userId)
    .then(response => dispatch(setUserProjects(response.data)))
    .catch(err => console.log(err))

  dispatch(setSearchProject(''));
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
  foreman) => async (dispatch) => {

    dispatch(toggleIsFetching(true))

    await projectsAPI.addProject(name,
      description,
      start,
      end,
      price,
      active,
      manager,
      client,
      foreman)
      .then(response => {
        dispatch(setAddProjects(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })

    dispatch(setSearchProject(''));
  }

export const searchProject = (searchText) => (dispatch) => {
  let text = searchText.toLowerCase()

  setTimeout(() => dispatch(setSearchProject(text)), 300)
}

export const deleteProject = (projectId) => async () => {
  await projectsAPI.deleteProject(projectId);
}
