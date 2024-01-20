import { authAPI } from "../API/api";

const SET_AUTH = 'SET_AUTH';
const SET_ME_DATA = 'SET_ME_DATA';

let initialState = {
  userData: {
    userId: null,
    firstName: null,
    lastName: null,
    username: null,
    userType: null,
  },
  isAuth: localStorage.getItem('isAuth') || false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth
      }
    case SET_ME_DATA:
      return {
        ...state,
        userData: {
          ...action.userData,
        }
      }
    default: return state;
  }
}

const setAuth = (isAuth) => ({
  type: SET_AUTH, isAuth
})

const setMe = (userId, firstName, lastName, username, userType) => ({
  type: SET_ME_DATA, userData: { userId, firstName, lastName, username, userType }
})

export const getMe = () => async (dispatch) => {
  const response = await authAPI.me();
  if (response.status === 200) {
    const res = response.data;
    dispatch(setMe(res.id, res.first_name, res.last_name, res.username, res.user_type_value))
  }
}

export const login = (name, password, setError) => async (dispatch) => {
  let response;
  try {
    response = await authAPI.login(name, password);
    if (response.status === 200) {
      localStorage.setItem('token', response.data.auth_token);
      dispatch(setAuth(true))
      localStorage.setItem('isAuth', true);
    }
  }
  catch (err) {
    if (err.response.data) {
      setError('serverError', { type: 'response', message: Object.values(err.response.data).map(item => item) })
    } else {
      console.log(err.message)
    }
  }
}

export const logout = () => async (dispatch) => {
  let response;
  try {
    response = await authAPI.logout();
    if (response.status < 300) {
      localStorage.clear();
      dispatch(setAuth(false));
    }
  }
  catch (err) {
    console.log(err.message)
  }
}
