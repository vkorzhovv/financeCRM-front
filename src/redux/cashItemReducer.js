import { cashItemAPI } from "../API/api";

const SET_ITEMS = 'SET_ITEMS';
const SET_TYPES = 'SET_TYPES';
const SET_SUBTYPES = 'SET_SUBTYPES';
const ADD_ITEM = 'ADD_ITEM';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  items: [],
  types: [],
  subtypes: [],
  isFetching: false
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.items
      }
    case SET_TYPES:
      return {
        ...state,
        types: action.types
      }
    case SET_SUBTYPES:
      return {
        ...state,
        subtypes: action.subtypes
      }
    case ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, action.newItem]
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

const setItems = (items) => ({ type: SET_ITEMS, items });
const setTypes = (types) => ({ type: SET_TYPES, types });
const setSubtypes = (subtypes) => ({ type: SET_SUBTYPES, subtypes });
const setAddItem = (newItem) => ({ type: ADD_ITEM, newItem })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getItems = () => async (dispatch) => {
  await cashItemAPI.getItems()
  .then(response => dispatch(setItems(response.data)))
  .catch(err => console.log(err))
}

export const getPaymentTypes = () => async (dispatch) => {
  await cashItemAPI.getPaymentTypes()
  .then(response => dispatch(setTypes(response.data)))
  .catch(err => console.log(err))
}

export const getSubtypes = (type) => async (dispatch) => {
  await cashItemAPI.getSubtypes(type)
  .then(response => dispatch(setSubtypes(response.data)))
  .catch(err => console.log(err))
}

export const addItem = (type, name) => async (dispatch) => {
  dispatch(toggleIsFetching(true))

  await cashItemAPI.addItem(type, name)
    .then(response => {
      dispatch(setAddItem(response.data))
      dispatch(toggleIsFetching(false));
      return response;
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      throw err;
    })
}

export const editItem = (itemId, type, name) => async (dispatch) => {
  dispatch(toggleIsFetching(true))

  await cashItemAPI.editItem(itemId, type, name)
    .then(response => {
      dispatch(toggleIsFetching(false));
      return response;
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      throw err;
    })
}

export const deleteItem = (itemId) => async () => {
  await cashItemAPI.deleteItem(itemId);
}
