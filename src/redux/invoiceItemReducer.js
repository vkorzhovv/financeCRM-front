import { invoicesAPI } from "../API/api";

const SET_INVOICE_ITEM = 'SET_INVOICE_ITEM';

let initialState = {
  invoice: {},
}

export const invoiceItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICE_ITEM:
      return {
        ...state,
        invoice: action.invoice
      }
    default: return state;
  }
}

const setInvoiceItem = (invoice) => ({ type: SET_INVOICE_ITEM, invoice });

export const getInvoiceItem = (invoiceId) => async (dispatch) => {
  const response = await invoicesAPI.getInvoiceItem(invoiceId);
  dispatch(setInvoiceItem(response.data));
}

export const editInvoice = (invoiceId, comment, approved, type, subtype, payer, receiver, project) => async (dispatch) => {
  const response = await invoicesAPI.editInvoice(invoiceId, comment, approved, type, subtype, payer, receiver, project);
  if (response.status < 300) {
    dispatch(setInvoiceItem(response.data))
  }
}
