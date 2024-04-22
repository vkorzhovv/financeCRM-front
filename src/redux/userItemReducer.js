import { usersAPI } from "../API/api";

const SET_USER_ITEM = 'SET_USER_ITEM';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  userItem: {},
  isFetching: false
}

export const userItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ITEM:
      return {
        ...state,
        userItem: action.userItem
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

const setUserItem = (userItem) => ({ type: SET_USER_ITEM, userItem });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getUserItem = (userId) => async (dispatch) => {
  await usersAPI.getUserItem(userId)
    .then(response => dispatch(setUserItem(response.data)))
    .catch(err => console.log(err))
}

export const editUser = (
  {
    userId: userId,
    name: name,
    surname: surname,
    patronymic: patronymic,
    login: login,
    password: password,
    type: type,
    phone: phone,
    superuser: superuser,
    descr: descr,
    start_balance: start_balance,
    countBalance: countBalance,
    isRegister: isRegister,
  }
) => async (dispatch) => {
  dispatch(toggleIsFetching(true))

  await usersAPI.editUser(
    {
      userId: userId,
      name: name,
      surname: surname,
      patronymic: patronymic,
      login: login,
      password: password,
      type: type,
      phone: phone,
      superuser: superuser,
      descr: descr,
      start_balance: start_balance,
      countBalance: countBalance,
      isRegister: isRegister,
    }
  )
    .then(response => {
      dispatch(setUserItem(response.data))
      dispatch(toggleIsFetching(false));
      return response;
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      throw err;
    })
}
