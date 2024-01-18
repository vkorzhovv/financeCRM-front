import { invoicesAPI } from "../API/api";

const SET_INVOICES = 'SET_INVOICES'
const SET_UNAPPROVED_INVOICES = 'SET_UNAPPROVED_INVOICES'
const SET_PROJECT_INVOICES = 'SET_PROJECT_INVOICES'
const ADD_INVOICE = 'ADD_INVOICE'

let initialState = {
  invoices: [],
  unapprovedInvoices: [],
  projectInvoices: []
};

export const invoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.invoices
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
    default: return { ...state };
  }
}

const setInvoices = (invoices) => ({ type: SET_INVOICES, invoices });
const setUnapprovedInvoices = (unapprovedInvoices) => ({ type: SET_UNAPPROVED_INVOICES, unapprovedInvoices });
const setProjectInvoices = (projectInvoices) => ({ type: SET_PROJECT_INVOICES, projectInvoices });
const setAddInvoices = (newInvoice) => ({ type: ADD_INVOICE, newInvoice });

export const getInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getInvoices();
  dispatch(setInvoices(response.data));
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
export const getDebInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getDebInvoices();
  dispatch(setInvoices(response.data));
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
    const response = await invoicesAPI.addInvoice(comment,
      approved,
      type,
      subtype,
      payer,
      receiver,
      project,
      amount,
      date);
    if (response.status < 300) {
      dispatch(setAddInvoices(response.data))
    }
  }

export const deleteInvoice = (invoiceId) => async () => {
  await invoicesAPI.deleteInvoice(invoiceId);
}
