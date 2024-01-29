import { invoicesAPI } from "../API/api";

const SET_INVOICES = 'SET_INVOICES'
const SET_USER_INVOICES = 'SET_USER_INVOICES'
const SET_UNAPPROVED_INVOICES = 'SET_UNAPPROVED_INVOICES'
const SET_PROJECT_INVOICES = 'SET_PROJECT_INVOICES'
const ADD_INVOICE = 'ADD_INVOICE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  invoices: [],
  userInvoices: [],
  unapprovedInvoices: [],
  projectInvoices: [],
  isFetching: false
};

export const invoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.invoices
      }
    case SET_USER_INVOICES:
      return {
        ...state,
        userInvoices: action.userInvoices
      }
    case SET_UNAPPROVED_INVOICES:
      return {
        ...state,
        unapprovedInvoices: action.unapprovedInvoices
      }
    case SET_PROJECT_INVOICES:
      return {
        ...state,
        projectInvoices: action.projectInvoices
      }
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.newInvoice]
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

const setInvoices = (invoices) => ({ type: SET_INVOICES, invoices });
const setUserInvoices = (userInvoices) => ({ type: SET_USER_INVOICES, userInvoices });
const setUnapprovedInvoices = (unapprovedInvoices) => ({ type: SET_UNAPPROVED_INVOICES, unapprovedInvoices });
const setProjectInvoices = (projectInvoices) => ({ type: SET_PROJECT_INVOICES, projectInvoices });
const setAddInvoices = (newInvoice) => ({ type: ADD_INVOICE, newInvoice });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getInvoices = () => async (dispatch) => {
  await invoicesAPI.getInvoices()
    .then(response => dispatch(setInvoices(response.data)))
    .catch(err => console.log(err))
}
export const getUserInvoices = (userId) => async (dispatch) => {
  await invoicesAPI.getUserInvoices(userId)
    .then(response => dispatch(setUserInvoices(response.data)))
    .catch(err => console.log(err))
}
export const getUnapprovedInvoices = () => async (dispatch) => {
  await invoicesAPI.getUnapprovedInvoices()
    .then(response => dispatch(setUnapprovedInvoices(response.data)))
    .catch(err => console.log(err))
}
export const getProjectInvoices = (projectId) => async (dispatch) => {
  await invoicesAPI.getProjectInvoices(projectId)
    .then(response => dispatch(setProjectInvoices(response.data)))
    .catch(err => console.log(err))
}
export const getUnpaidInvoices = () => async (dispatch) => {
  await invoicesAPI.getUnpaidInvoices()
    .then(response => dispatch(setInvoices(response.data)))
    .catch(err => console.log(err))
}
export const getUserUnpaidInvoices = (userId) => async (dispatch) => {
  await invoicesAPI.getUserUnpaidInvoices(userId)
  .then(response => dispatch(setUserInvoices(response.data)))
  .catch(err => console.log(err))
}
export const getDebInvoices = () => async (dispatch) => {
  await invoicesAPI.getDebInvoices()
  .then(response => dispatch(setInvoices(response.data)))
  .catch(err => console.log(err))
}
export const getUserDebInvoices = (userId) => async (dispatch) => {
  await invoicesAPI.getUserDebInvoices(userId)
    .then(response => dispatch(setUserInvoices(response.data)))
    .catch(err => console.log(err))
}

export const addInvoice = (
  comment,
  approved,
  type,
  subtype,
  payer,
  receiver,
  project,
  amount,
  date) => async (dispatch) => {

    dispatch(toggleIsFetching(true))
    await invoicesAPI.addInvoice(comment,
      approved,
      type,
      subtype,
      payer,
      receiver,
      project,
      amount,
      date)
      .then(response => {
        dispatch(setAddInvoices(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })
  }

export const deleteInvoice = (invoiceId) => async () => {
  await invoicesAPI.deleteInvoice(invoiceId);
}
