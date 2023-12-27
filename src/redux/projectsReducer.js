import { projectsAPI } from "../API/api";

const SET_PROJECTS = 'SET_AUTH';
const ADD_PROJECTS = 'ADD_PROJECTS';

let initialState = {
  projects: [],
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.projects
      }
    case ADD_PROJECTS:
      return {
        ...state,
        projects: [...state.projects, action.newProject]
      }
    default: return { ...state };
  }
}

const setProjects = (projects) => ({ type: SET_PROJECTS, projects });
const setAddProjects = (newProject) => ({ type: ADD_PROJECTS, newProject });

export const getProjects = () => async (dispatch) => {
  const response = await projectsAPI.getProjects();
  dispatch(setProjects(response.data));
}

export const addProject = (name, description, start, end, price, active, manager, client, foreman) => async (dispatch) => {
  const response = await projectsAPI.addProject(name, description, start, end, price, active, manager, client, foreman);
  if (response.status < 300) {
    dispatch(setAddProjects(response.data))
  }
}

export const deleteProject = (projectId) => async () => {
  await projectsAPI.deleteProject(projectId);
}
