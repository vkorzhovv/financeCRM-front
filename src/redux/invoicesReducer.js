import { invoicesAPI } from "../API/api";

const SET_INVOICES = 'SET_INVOICES'
const SET_UNAPPROVED_INVOICES = 'SET_UNAPPROVED_INVOICES'
const ADD_INVOICE = 'ADD_INVOICE'
const SET_TYPES = 'SET_TYPES';
const SET_SUBTYPES = 'SET_SUBTYPES';

let initialState = {
  invoices: [],
  types: [],
  subtypes: [],
  unapprovedInvoices: []
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
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.newInvoice]
      }
    case SET_TYPES:
      return {
        ...state,
        types: action.types
      }
    case SET_SUBTYPES:
      return {
        ...state,
        subtypes: action.subtypes
      }
    default: return { ...state };
  }
}

const setInvoices = (invoices) => ({ type: SET_INVOICES, invoices });
const setUnapprovedInvoices = (unapprovedInvoices) => ({ type: SET_UNAPPROVED_INVOICES, unapprovedInvoices });
const setAddInvoices = (newInvoice) => ({ type: ADD_INVOICE, newInvoice });
const setTypes = (types) => ({ type: SET_TYPES, types });
const setSubtypes = (subtypes) => ({ type: SET_SUBTYPES, subtypes });

export const getInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getInvoices();
  dispatch(setInvoices(response.data));
}
export const getUnapprovedInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getUnapprovedInvoices();
  dispatch(setUnapprovedInvoices(response.data));
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

export const getTypes = () => async (dispatch) => {
  const response = await invoicesAPI.getTypes();
  dispatch(setTypes(response.data));
}

export const getSubtypes = (typeId) => async (dispatch) => {
  const response = await invoicesAPI.getSubtypes(typeId);
  dispatch(setSubtypes(response.data));
}
