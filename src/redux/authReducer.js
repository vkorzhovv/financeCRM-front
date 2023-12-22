import { authAPI } from "../API/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  userData: {
    isAuth: localStorage.getItem('isAuth') || false,
  }
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
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
  type: SET_USER_DATA, userData: { isAuth }
})

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
    if (err.response.data.non_field_errors) {
      setError('serverError', { type: 'response', message: err.response.data.non_field_errors[0] })
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
      dispatch(setAuth(false));
      localStorage.clear();
    }
  }
  catch (err) {
    console.log(err.message)
  }
}
