import { usersAPI } from "../API/api";

const SET_ALL_USERS = 'SET_ALL_USERS';
const SET_CLIENTS = 'SET_CLIENTS';
const SET_EMPLOYEES = 'SET_EMPLOYEES';
const SET_CONTRACTORS = 'SET_CONTRACTORS';
const ADD_USER = 'ADD_USER';
const SEARCH_USER = 'SEARCH_USER';
const FILTER_USER = 'FILTER_USER';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  allUsers: [],
  clients: [],
  employees: [],
  contractors: [],
  balanceStart: sessionStorage.getItem('userBalanceStart') || '-Infinity',
  balanceEnd: sessionStorage.getItem('userBalanceEnd') || 'Infinity',
  searchUser: '',
  filteredClients: [],
  filteredEmployees: [],
  filteredContractors: [],
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
    case SEARCH_USER: {
      return {
        ...state,
        searchUser: action.searchUser,
        filteredContractors: state.contractors.length
          ? [...state.contractors]
            .filter(item => (`${item.last_name} ${item.first_name} ${item.father_name}`.toLowerCase()).includes(action.searchUser))
          : [],
        filteredEmployees: state.employees.length
          ? [...state.employees]
            .filter(item => (`${item.last_name} ${item.first_name} ${item.father_name}`.toLowerCase()).includes(action.searchUser))
          : [],
        filteredClients: state.clients.length
          ? [...state.clients]
            .filter(item => (`${item.last_name} ${item.first_name} ${item.father_name}`.toLowerCase()).includes(action.searchUser))
          : [],
      }
    }
    case FILTER_USER: {
      return {
        ...state,
        balanceStart: action.balanceStart,
        balanceEnd: action.balanceEnd,

        filteredEmployees: state.filteredEmployees.length
          ? [...state.filteredEmployees]
            .filter(item => (+item.balance >= +action.balanceStart && +item.balance <= +action.balanceEnd))
          : [],

        filteredContractors: state.filteredContractors.length
          ? [...state.filteredContractors]
            .filter(item => (+item.balance >= +action.balanceStart && +item.balance <= +action.balanceEnd))
          : [],

        filteredClients: state.filteredClients.length
          ? [...state.filteredClients]
            .filter(item => (+item.balance >= +action.balanceStart && +item.balance <= +action.balanceEnd))
          : [],
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
const setSearchUser = (searchUser) => ({ type: SEARCH_USER, searchUser });
const setFilterUser = (balanceStart, balanceEnd) => ({ type: FILTER_USER, balanceStart, balanceEnd });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

const filterFunctions = (dispatch) => {
  dispatch(setSearchUser(localStorage.getItem('searchUser') || ''));
  dispatch(setFilterUser(
    sessionStorage.getItem('userBalanceStart') || '-Infinity',
    sessionStorage.getItem('userBalanceEnd') || 'Infinity'));
}

export const getUsers = () => async (dispatch) => {
  await usersAPI.getAllUsers()
    .then(response => dispatch(setUsers(response.data)))
    .catch(err => console.log(err))
}

export const getClients = () => async (dispatch) => {
  await usersAPI.getClients()
    .then(response => dispatch(setClients(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}

export const getEmployees = () => async (dispatch) => {
  await usersAPI.getEmployees()
    .then(response => dispatch(setEmployees(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}

export const getContractors = () => async (dispatch) => {
  await usersAPI.getContractors()
    .then(response => dispatch(setContractors(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
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
  start_balance
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
    descr,
    start_balance)
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

export const searchUser = (searchText) => (dispatch) => {
  let text = searchText.toLowerCase();
  localStorage.setItem('searchUser', text);
  dispatch(setSearchUser(text));
  dispatch(setFilterUser(
    sessionStorage.getItem('userBalanceStart') || '-Infinity',
    sessionStorage.getItem('userBalanceEnd') || 'Infinity'));
}

export const filterUser = (start, end) => (dispatch) => {
  sessionStorage.setItem('userBalanceStart', start);
  sessionStorage.setItem('userBalanceEnd', end);

  dispatch(setSearchUser(localStorage.getItem('searchUser') || ''));
  dispatch(setFilterUser(start, end));
}

export const deleteUser = (userId) => async () => {
  await usersAPI.deleteUser(userId);
}
