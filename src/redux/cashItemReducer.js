import { cashItemAPI } from "../API/api";
import { mapObj } from "../utils/objectHelpers";

const SET_ITEMS = 'SET_ITEMS';
const SET_TYPES = 'SET_TYPES';
const ADD_TYPE = 'ADD_TYPE';
const EDIT_TYPE = 'EDIT_TYPE';
const DELETE_TYPE = 'DELETE_TYPE';
const SET_SUBTYPES = 'SET_SUBTYPES';
const ADD_ITEM = 'ADD_ITEM';
const SET_SEARCH_ITEMS = 'SET_SEARCH_ITEMS';
const FILTER_ITEMS = 'FILTER_ITEMS;'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  items: [],
  filteredItems: [],
  searchItem: '',
  filterData: sessionStorage.getItem('filterItemsTypes') || [],
  types: [],
  subtypes: [],
  isFetching: false
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPES:
      return {
        ...state,
        types: action.types
      }
    case ADD_TYPE: {
      return {
        ...state,
        types: [...state.types, action.newType]
      }
    }
    case DELETE_TYPE: {
      return {
        ...state,
        types: state.types.filter((el) => el.id !== action.typeId)
      }
    }
    case EDIT_TYPE:
      return {
        ...state,
        types: mapObj(state.types, action.typeId, 'id', action.newObj)
      }
    case SET_SUBTYPES:
      return {
        ...state,
        subtypes: action.subtypes
      }
    case SET_ITEMS:
      return {
        ...state,
        items: action.items
      }
    case ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, action.newItem]
      }
    }
    case SET_SEARCH_ITEMS: {
      return {
        ...state,
        searchItem: action.searchItem,
        filteredItems: state.items.length
          ? [...state.items]
            .filter(item => (`${item.name}
              ${item.item_type?.name}`
              .toLowerCase()).includes(action.searchItem))
          : [],
      }
    }
    case FILTER_ITEMS: {
      return {
        ...state,
        filterData: action.types,
        filteredItems: state.filteredItems.length
          ? [...state.filteredItems]
            .filter(item =>
              action.types.length === 0 ?
                item :
                action.types.includes(+item.item_type?.id))
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

const setItems = (items) => ({ type: SET_ITEMS, items });
const setTypes = (types) => ({ type: SET_TYPES, types });
const setAddType = (newType) => ({ type: ADD_TYPE, newType });
const setDeleteType = (typeId) => ({ type: DELETE_TYPE, typeId });
const setEditType = (typeId, newObj) => ({ type: EDIT_TYPE, typeId, newObj });
const setSubtypes = (subtypes) => ({ type: SET_SUBTYPES, subtypes });
const setAddItem = (newItem) => ({ type: ADD_ITEM, newItem });

const setSearchItems = (searchItem) => ({ type: SET_SEARCH_ITEMS, searchItem });
const setFilterItems = (types) => ({ type: FILTER_ITEMS, types });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

const filterFunctions = (dispatch) => {
  dispatch(setSearchItems(localStorage.getItem('searchItem') || ''));
  dispatch(setFilterItems(sessionStorage.getItem('filterItemsTypes') || []));
}

export const getItems = () => async (dispatch) => {
  await cashItemAPI.getItems()
    .then(response => dispatch(setItems(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}

export const getPaymentTypes = () => async (dispatch) => {
  await cashItemAPI.getPaymentTypes()
    .then(response => dispatch(setTypes(response.data)))
    .catch(err => console.log(err))
}

export const addType = (name) => async (dispatch) => {
  dispatch(toggleIsFetching(true))

  await cashItemAPI.addType(name)
    .then(response => {
      dispatch(setAddType(response.data))
      dispatch(toggleIsFetching(false));
      return response;
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      throw err;
    })
}

export const deleteType = (typeId) => async (dispatch) => {
  dispatch(toggleIsFetching(true))
  await cashItemAPI.deleteType(typeId)
    .then(() => {
      dispatch(setDeleteType(typeId))
      dispatch(toggleIsFetching(false));
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      throw err;
    })
}

export const editType = (typeId, name) => async (dispatch) => {
  dispatch(toggleIsFetching(true))
  await cashItemAPI.editType(typeId, name)
    .then(response => {
      dispatch(setEditType(typeId, response.data))
      dispatch(toggleIsFetching(false));
      return response;
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      throw err;
    })
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

export const searchItem = (searchText) => (dispatch) => {
  let text = searchText.toLowerCase()
  localStorage.setItem('searchItem', text);
  dispatch(setSearchItems(text))
  dispatch(setFilterItems(sessionStorage.getItem('filterItemsTypes') || []));
}

export const filterItems = (types) => (dispatch) => {
  types.length > 0 ?
    sessionStorage.setItem('filterItemsTypes', types) :
    sessionStorage.removeItem('filterItemsTypes');

  dispatch(setSearchItems(localStorage.getItem('searchItem') || ''));
  dispatch(setFilterItems(types));
}

export const deleteItem = (itemId) => async () => {
  await cashItemAPI.deleteItem(itemId);
}
