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
  const response = await invoicesAPI.getInvoices();
  dispatch(setInvoices(response.data));
}
export const getUserInvoices = (userId) => async (dispatch) => {
  const response = await invoicesAPI.getUserInvoices(userId);
  dispatch(setUserInvoices(response.data));
}
export const getUnapprovedInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getUnapprovedInvoices();
  dispatch(setUnapprovedInvoices(response.data));
}
export const getProjectInvoices = (projectId) => async (dispatch) => {
  const response = await invoicesAPI.getProjectInvoices(projectId);
  dispatch(setProjectInvoices(response.data));
}
export const getUnpaidInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getUnpaidInvoices();
  dispatch(setInvoices(response.data));
}
export const getUserUnpaidInvoices = (userId) => async (dispatch) => {
  const response = await invoicesAPI.getUserUnpaidInvoices(userId);
  dispatch(setUserInvoices(response.data));
}
export const getDebInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getDebInvoices();
  dispatch(setInvoices(response.data));
}
export const getUserDebInvoices = (userId) => async (dispatch) => {
  const response = await invoicesAPI.getUserDebInvoices(userId);
  dispatch(setUserInvoices(response.data));
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
