import { usersAPI } from "../API/api";

const SET_ALL_USERS = 'SET_ALL_USERS';
const SET_CLIENTS = 'SET_CLIENTS';
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const SET_CONTRACTORS = 'SET_CONTRACTORS';
const ADD_USER = 'ADD_USER';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  allUsers: [],
  clients: [],
  employees: [],
  contractors: [],
  isFetching: false
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.allUsers
      }
    case SET_CLIENTS:
      return {
        ...state,
        clients: action.clients
      }
    case SET_EMPLOYEES:
      return {
        ...state,
        employees: action.employees
      }
    case SET_CONTRACTORS:
      return {
        ...state,
        contractors: action.contractors
      }
    case ADD_USER: {
      return {
        ...state,
        allUsers: [...state.allUsers, action.newUser],
        contractors: [...state.contractors],
        employees: [...state.employees],
        clients: [...state.clients]
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

const setAddUser = (newUser) => ({ type: ADD_USER, newUser })
const setUsers = (allUsers) => ({ type: SET_ALL_USERS, allUsers });
const setClients = (clients) => ({ type: SET_CLIENTS, clients });
const setEmployees = (employees) => ({ type: SET_EMPLOYEES, employees });
const setContractors = (contractors) => ({ type: SET_CONTRACTORS, contractors });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getUsers = () => async (dispatch) => {
  await usersAPI.getAllUsers()
    .then(response => dispatch(setUsers(response.data)))
    .catch(err => console.log(err))
}

export const getClients = () => async (dispatch) => {
  await usersAPI.getClients()
    .then(response => dispatch(setClients(response.data)))
    .catch(err => console.log(err))
}

export const getEmployees = () => async (dispatch) => {
  await usersAPI.getEmployees()
    .then(response => dispatch(setEmployees(response.data)))
    .catch(err => console.log(err))
}

export const getContractors = () => async (dispatch) => {
  await usersAPI.getContractors()
    .then(response => dispatch(setContractors(response.data)))
    .catch(err => console.log(err))
}

export const addUser = (
  name,
  surname,
  patronymic,
  login,
  password,
  type,
  phone,
  superuser,
  descr,
) => async (dispatch) => {

  dispatch(toggleIsFetching(true))

  await usersAPI.addUser(
    name,
    surname,
    patronymic,
    login,
    password,
    type,
    phone,
    superuser,
    descr)
    .then(response => {
      dispatch(setAddUser(response.data))
      dispatch(toggleIsFetching(false));
      return response;
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      throw err;
    })
}

export const deleteUser = (userId) => async () => {
  await usersAPI.deleteUser(userId);
}
