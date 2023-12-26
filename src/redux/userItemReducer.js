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

// "id": 0,
//   "user_type_value": "string",
//   "balance": "2982480",
//   "phone": "string",
//   "first_name": "string",
//   "last_name": "string",
//   "father_name": "string",
//   "username": "1ddCW4IBhzY2xgovsl98F4fA69l@w.s6uynvOjouuVBJ1.wLhy",
//   "description": "string",
//   "financial_accounting": true
