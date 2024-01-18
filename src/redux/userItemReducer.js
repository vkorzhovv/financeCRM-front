import { usersAPI } from "../API/api";

const SET_USER_ITEM = 'SET_USER_ITEM';

let initialState = {
  userItem: {},
}

export const userItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ITEM:
      return {
        ...state,
        userItem: action.userItem
      }
    default: return state;
  }
}

const setUserItem = (userItem) => ({ type: SET_USER_ITEM, userItem });

export const getUserItem = (userId) => async (dispatch) => {
  const response = await usersAPI.getUserItem(userId);
  dispatch(setUserItem(response.data));
}

export const editUser = (userId, name, surname, patronymic, login, password, type, phone, superuser, descr) => async (dispatch) => {
  const response = await usersAPI.editUser(userId, name, surname, patronymic, login, password, type, phone, superuser, descr);
  if (response.status < 300) {
    dispatch(setUserItem(response.data))
  }
}
