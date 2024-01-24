import { invoicesAPI } from "../API/api";

const SET_INVOICE_ITEM = 'SET_INVOICE_ITEM';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  invoice: {},
  isFetching: false
}

export const invoiceItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICE_ITEM:
      return {
        ...state,
        invoice: action.invoice
      }
    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    default: return state;
  }
}

const setInvoiceItem = (invoice) => ({ type: SET_INVOICE_ITEM, invoice });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getInvoiceItem = (invoiceId) => async (dispatch) => {
  const response = await invoicesAPI.getInvoiceItem(invoiceId);
  dispatch(setInvoiceItem(response.data));
}

export const editInvoice = (
  invoiceId,
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

    await invoicesAPI.editInvoice(
      invoiceId,
      comment,
      approved,
      type,
      subtype,
      payer,
      receiver,
      project,
      amount,
      date)
      .then(response => {
        dispatch(setInvoiceItem(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })
  }
