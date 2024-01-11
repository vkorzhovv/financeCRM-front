import { cashItemAPI } from "../API/api";

const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM'

let initialState = {
  items: [],
}

export const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default: return { ...state };
  }
}

const setItems = (items) => ({ type: SET_ITEMS, items });
const setAddItem = (newItem) => ({ type: ADD_ITEM, newItem })

export const getItems = () => async (dispatch) => {
  const response = await cashItemAPI.getItems();
  dispatch(setItems(response.data));
}

export const addItem = (type, name) => async (dispatch) => {
  const response = await cashItemAPI.addItem(type, name);
  if (response.status < 300) {
    dispatch(setAddItem(response.data))
  }
}

export const editItem = (itemId, type, name) => async () => {
  await cashItemAPI.editItem(itemId, type, name);
}

export const deleteItem = (itemId) => async () => {
  await cashItemAPI.deleteItem(itemId);
}
