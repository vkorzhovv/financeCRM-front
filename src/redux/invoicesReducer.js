import { invoicesAPI } from "../API/api";

const SET_INVOICES = 'SET_INVOICES'
const ADD_INVOICE = 'ADD_INVOICE'

let initialState = {
  invoices: [],
};

export const invoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.invoices
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
const setAddInvoices = (newInvoice) => ({ type: ADD_INVOICE, newInvoice });

export const getInvoices = () => async (dispatch) => {
  const response = await invoicesAPI.getInvoices();
  dispatch(setInvoices(response.data));
}

export const addInvoice = (comment, approved, type, subtype, payer, receiver, project) => async (dispatch) => {
  const response = await invoicesAPI.addInvoice(comment, approved, type, subtype, payer, receiver, project);
  if (response.status < 300) {
    dispatch(setAddInvoices(response.data))
  }
}

export const deleteInvoice = (invoiceId) => async () => {
  await invoicesAPI.deleteInvoice(invoiceId);
}
