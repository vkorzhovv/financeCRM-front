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

export const editUser = (
  userId,
  name,
  surname,
  patronymic,
  login,
  // password,
  type,
  phone,
  superuser,
  descr,
  // setError
  ) => async (dispatch) => {
    let response;
    // try {
      response = await usersAPI.editUser(
        userId,
        name,
        surname,
        patronymic,
        login,
        // password,
        type,
        phone,
        superuser,
        descr);
      if (response.status < 300) {
        dispatch(setUserItem(response.data))
      }
    // }
    // catch (err) {
    //   if (err.response.data) {
    //     setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
    //   } else {
    //     console.log(err.message)
    //   }
    // }

    // const response = await usersAPI.editUser(
    //   userId,
    //   name,
    //   surname,
    //   patronymic,
    //   login,
    //   password,
    //   type,
    //   phone,
    //   superuser,
    //   descr);
    // if (response.status < 300) {
    //   dispatch(setUserItem(response.data))
    // }
  }
