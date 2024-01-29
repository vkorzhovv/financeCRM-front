import { projectsAPI } from "../API/api";

const SET_PROJECTS = 'SET_PROJECTS';
const SET_USER_PROJECTS = 'SET_USER_PROJECTS';
const ADD_PROJECTS = 'ADD_PROJECTS';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  projects: [],
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
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getProjects = () => async (dispatch) => {
  await projectsAPI.getProjects()
    .then(response => dispatch(setProjects(response.data)))
    .catch(err => console.log(err))
}

export const getUserProjects = (userId) => async (dispatch) => {
  await projectsAPI.getUserProjects(userId)
    .then(response => dispatch(setUserProjects(response.data)))
    .catch(err => console.log(err))
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
  }

export const deleteProject = (projectId) => async () => {
  await projectsAPI.deleteProject(projectId);
}
