import { paymentsAPI } from "../API/api";

const SET_PAYMENT_ITEM = 'SET_PAYMENT_ITEM';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  payment: {
    invoice: {},
    isFetching: false
  },
}

export const paymentItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENT_ITEM:
      return {
        ...state,
        payment: action.payment
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

const setPaymentItem = (payment) => ({ type: SET_PAYMENT_ITEM, payment });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getPaymentItem = (paymentId) => async (dispatch) => {
  await paymentsAPI.getPaymentItem(paymentId)
  .then(response => dispatch(setPaymentItem(response.data)))
  .catch(err => console.log(err))
}

export const editPayment = (
  paymentId,
  date,
  total,
  approved,
  invoice,
  comment,
  scans) => async (dispatch) => {

    dispatch(toggleIsFetching(true))
    await paymentsAPI.editPayment(
      paymentId,
      date,
      total,
      approved,
      invoice,
      comment,
      scans)
      .then(response => {
        dispatch(setPaymentItem(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })
  }
