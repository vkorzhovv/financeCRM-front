import { projectsAPI } from "../API/api";

const SET_PROJECT_ITEM = 'SET_PROJECT_ITEM';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  projectItem: {},
  isFetching: false
}

export const projectItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT_ITEM:
      return {
        ...state,
        projectItem: action.projectItem
      }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default: return state;
  }
}

const setProjectItem = (projectItem) => ({ type: SET_PROJECT_ITEM, projectItem });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getProjectItem = (projectId) => async (dispatch) => {
  await projectsAPI.getProjectItem(projectId)
  .then(response => dispatch(setProjectItem(response.data)))
  .catch(err => console.log(err))
}

export const editProject = (
  projectId,
  name,
  description,
  start,
  end,
  price,
  active,
  manager,
  client,
  foreman) => async (dispatch) => {

    dispatch(toggleIsFetching(true));

    await projectsAPI.editProject(
      projectId,
      name,
      description,
      start,
      end,
      price,
      active,
      manager,
      client,
      foreman)
      .then(response => {
        dispatch(setProjectItem(response.data));
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })
  }
