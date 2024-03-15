import { publicationsAPI } from "../API/api";
import { mapObj } from "../utils/objectHelpers";

const SET_PUBLICATIONS = 'SET_PUBLICATIONS';
const ADD_PUBLICATION = 'ADD_PUBLICATION';
const EDIT_PUBLICATION = 'EDIT_PUBLICATION';
const DELETE_PUBLICATION = 'DELETE_PUBLICATION';
const FILTER_PUBLICATION = 'FILTER_PUBLICATION';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  publications: [],
  filteredPublications: [],
  filterDatas: {
    publicationProject: sessionStorage.getItem('publicationProject') || [],
  },
  isFetching: false
};

export const publicationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PUBLICATIONS:
      return {
        ...state,
        publications: action.publications,
      }
    case ADD_PUBLICATION:
      return {
        ...state,
        publications: [...state.publications, action.newItem],
      }
    case EDIT_PUBLICATION:
      return {
        ...state,
        publications: mapObj(state.publications, action.publicationId, 'id', action.newObj)
      }
    case DELETE_PUBLICATION:
      return {
        ...state,
        publications: state.publications.filter((el) => el.id !== action.publicationId)
      }
    case FILTER_PUBLICATION:
      return {
        ...state,
        filterDatas: action.filterDatas,
        filteredPublications: state.publications.length
          ? [...state.publications]
            .filter(item => action.filterDatas.publicationProject?.length === 0 ? item : action.filterDatas.publicationProject.includes(+item.project?.id))
          : [],
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

const setPublications = (publications) => ({ type: SET_PUBLICATIONS, publications });
const setAddPublication = (newItem) => ({ type: ADD_PUBLICATION, newItem });
const setEditPublication = (publicationId, newObj) => ({ type: EDIT_PUBLICATION, publicationId, newObj });
const setDeletePublication = (publicationId) => ({ type: DELETE_PUBLICATION, publicationId });
const setFilterPublications = (projects) => ({ type: FILTER_PUBLICATION, filterDatas: { publicationProject: projects } });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

const filterFunctions = (dispatch) => {
  dispatch(setFilterPublications(sessionStorage.getItem('publicationProject') || []));
}

export const getPublications = () => async (dispatch) => {
  await publicationsAPI.getPublications()
    .then(response => dispatch(setPublications(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch)
}
export const addPublication = (
  {
    author: author,
    project: project,
    text: text,
    files: files,
    date: date,
  }
) => async (dispatch) => {
  await publicationsAPI.addPublication(
    {
      author: author,
      project: project,
      text: text,
      files: files,
      date: date,
    }
  )
    .then(response => dispatch(setAddPublication(response.data)))
    .catch(err => console.log(err))
}
export const editPublication = (
  {
    id: id,
    author: author,
    project: project,
    text: text,
    files: files,
    date: date,
  }
) => async (dispatch) => {
  await publicationsAPI.editPublication(
    {
      id: id,
      author: author,
      project: project,
      text: text,
      files: files,
      date: date,
    }
  )
    .then(response => dispatch(setEditPublication(id, response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch)
}

export const filterPublication = (projects) => (dispatch) => {
  sessionStorage.setItem('publicationProject', projects)
  dispatch(setFilterPublications(projects));
}

export const deletePublication = (id) => async (dispatch) => {
  await publicationsAPI.deletePublication(id)
    .then(() => dispatch(setDeletePublication(id)))

  filterFunctions(dispatch)
}
