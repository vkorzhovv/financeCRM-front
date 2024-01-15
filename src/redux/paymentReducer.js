import { paymentsAPI } from "../API/api";

const SET_PAYMENTS = 'SET_PAYMENTS';
const SET_PAYMENTS_IN_INVOICE = 'SET_PAYMENTS_IN_INVOICE';
const ADD_PAYMENT = 'ADD_PAYMENT';

let initialState = {
  payments: [],
  paymentsInInvoice: [],
};

export const paymentsReducer = (state = initialState, action) => { 
  switch (action.type) {
    case SET_PAYMENTS:
      return {
        ...state,
        payments: action.payments
      }
    case SET_PAYMENTS_IN_INVOICE:
      return {
        ...state,
        paymentsInInvoice: action.paymentsInInvoice
      }
    case ADD_PAYMENT:
      return {
        ...state,
        payments: [...state.payments, action.newPayment]
      }
    default: return { ...state };
  }
}

const setPayments = (payments) => ({ type: SET_PAYMENTS, payments });
const setPaymentsInInvoice = (paymentsInInvoice) => ({ type: SET_PAYMENTS_IN_INVOICE, paymentsInInvoice });
const setAddPayment = (newPayment) => ({ type: ADD_PAYMENT, newPayment });

export const getPayments = () => async (dispatch) => {
  const response = await paymentsAPI.getPayments();
  dispatch(setPayments(response.data));
}

export const getPaymentsInInvoice = (invoiceId) => async (dispatch) => {
  const response = await paymentsAPI.getPaymentsInInvoice(invoiceId);
  dispatch(setPaymentsInInvoice(response.data));
}

export const addPayment = (
  date,
  total,
  approved,
  invoice,
  comment,
  scans) => async (dispatch) => {
    const response = await paymentsAPI.addPayment(
      date,
      total,
      approved,
      invoice,
      comment,
      scans);
    if (response.status < 300) {
      dispatch(setAddPayment(response.data))
    }
  }

export const deletePayment = (paymentId) => async () => {
  await paymentsAPI.deletePayment(paymentId);
}
