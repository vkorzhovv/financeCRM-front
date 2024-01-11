import { paymentsAPI } from "../API/api";

const SET_PAYMENT_ITEM = 'SET_PAYMENT_ITEM';

let initialState = {
  payment: {
    invoice: {}
  },
}

export const paymentItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_ITEM:
      return {
        ...state,
        payment: action.payment
      }
    default: return state;
  }
}

const setPaymentItem = (payment) => ({ type: SET_PAYMENT_ITEM, payment });

export const getPaymentItem = (paymentId) => async (dispatch) => {
  const response = await paymentsAPI.getPaymentItem(paymentId);
  dispatch(setPaymentItem(response.data));
}

export const editPayment = (
  paymentId,
  date,
  total,
  approved,
  invoice,
  project,
  subtype,) => async (dispatch) => {
    const response = await paymentsAPI.editPayment(
      paymentId,
      date,
      total,
      approved,
      invoice,
      project,
      subtype);
    if (response.status < 300) {
      dispatch(setPaymentItem(response.data))
    }
  }
