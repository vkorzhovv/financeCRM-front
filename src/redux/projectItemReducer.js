import { projectsAPI } from "../API/api";

const SET_PROJECT_ITEM = 'SET_PROJECT_ITEM';

let initialState = {
  projectItem: {},
}

export const projectItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_ITEM:
      return {
        ...state,
        projectItem: action.projectItem
      }
    default: return state;
  }
}

const setProjectItem = (projectItem) => ({ type: SET_PROJECT_ITEM, projectItem });

export const getProjectItem = (projectId) => async (dispatch) => {
  const response = await projectsAPI.getProjectItem(projectId);
  dispatch(setProjectItem(response.data));
}

export const editProject = (projectId, name, description, start, end, price, active, manager, client, foreman) => async (dispatch) => {
  const response = await projectsAPI.editProject(projectId, name, description, start, end, price, active, manager, client, foreman);
  if (response.status < 300) {
    dispatch(setProjectItem(response.data))
  }
}
