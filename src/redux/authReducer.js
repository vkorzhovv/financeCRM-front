import { authAPI } from "../API/api";

const SET_AUTH = 'SET_AUTH';
const SET_ME_DATA = 'SET_ME_DATA';

let initialState = {
  userData: {},
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

export const setAuth = (isAuth) => ({ type: SET_AUTH, isAuth })
const setMe = (userData) => ({ type: SET_ME_DATA, userData })

export const getMe = () => async (dispatch) => {
  await authAPI.me()
    .then(response => dispatch(setMe(response.data)))
    .catch(err => console.log(err))
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
