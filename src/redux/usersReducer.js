import { usersAPI } from "../API/api";

const SET_ALL_USERS = 'SET_AUTH';
const SET_CLIENTS = 'SET_CLIENTS';
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const SET_CONTRACTORS = 'SET_CONTRACTORS';
const ADD_USER = 'ADD_USER';

let initialState = {
  allUsers: [],
  clients: [],
  employees: [],
  contractors: [],
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
    default: return {...state};
  }
}

const setAddUser = (newUser) => ({type: ADD_USER, newUser})
const setUsers = (allUsers) => ({ type: SET_ALL_USERS, allUsers });
const setClients = (clients) => ({ type: SET_CLIENTS, clients });
const setEmployees = (employees) => ({ type: SET_EMPLOYEES, employees });
const setContractors = (contractors) => ({ type: SET_CONTRACTORS, contractors });

export const getUsers = () => async (dispatch) => {
  const response = await usersAPI.getAllUsers();
  dispatch(setUsers(response.data));
}

export const getClients = () => async (dispatch) => {
  const response = await usersAPI.getClients();
  dispatch(setClients(response.data));
}

export const getEmployees = () => async (dispatch) => {
  const response = await usersAPI.getEmployees();
  dispatch(setEmployees(response.data));
}

export const getContractors = () => async (dispatch) => {
  const response = await usersAPI.getContractors();
  dispatch(setContractors(response.data));
}

export const addUser = (name, surname, patronymic, login, password, type, phone, finance, descr) => async (dispatch) => {
  const response = await usersAPI.addUser(name, surname, patronymic, login, password, type, phone, finance, descr);
  if (response.status < 300) {
    dispatch(setAddUser(response.data))
  }
}

export const deleteUser = (userId) => async () => {
  await usersAPI.deleteUser(userId);
}
