import { paymentsAPI } from "../API/api";

const SET_PAYMENTS = 'SET_PAYMENTS';
const SET_USER_PAYMENTS = 'SET_USER_PAYMENTS';
const SET_PAYMENTS_IN_INVOICE = 'SET_PAYMENTS_IN_INVOICE';
const ADD_PAYMENT = 'ADD_PAYMENT';
const SEARCH_PAYMENT = 'SEARCH_PAYMENT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  payments: [],
  filteredPayments: [],
  searchPayment: '',
  userPayments: [],
  paymentsInInvoice: [],
  isFetching: false
};

export const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PAYMENTS:
      return {
        ...state,
        payments: action.payments
      }
    case SET_USER_PAYMENTS:
      return {
        ...state,
        // userPayments: action.userPayments
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
    case SEARCH_PAYMENT: {
      return {
        ...state,
        searchPayment: action.searchPayment,
        filteredPayments: state.payments.length
          ? [...state.payments]
            .filter(item => (`${item.id + 10000}
                ${item.invoice.id + 10000}
                ${item.invoice.payer && item.invoice.payer.last_name} ${item.invoice.payer && item.invoice.payer.first_name} ${item.invoice.payer && item.invoice.payer.father_name}
                ${item.invoice.receiver && item.invoice.receiver.last_name} ${item.invoice.receiver && item.invoice.receiver.first_name} ${item.invoice.receiver && item.invoice.receiver.father_name}`
              .toLowerCase()).includes(action.searchPayment))
          : [],
      }
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

const setPayments = (payments) => ({ type: SET_PAYMENTS, payments });
// const setUserPayments = (userPayments) => ({ type: SET_USER_PAYMENTS, userPayments });
const setUserPayments = (payments) => ({ type: SET_USER_PAYMENTS, payments });
const setPaymentsInInvoice = (paymentsInInvoice) => ({ type: SET_PAYMENTS_IN_INVOICE, paymentsInInvoice });
const setAddPayment = (newPayment) => ({ type: ADD_PAYMENT, newPayment });
const setSearchPayment = (searchPayment) => ({ type: SEARCH_PAYMENT, searchPayment });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getPayments = () => async (dispatch) => {
  await paymentsAPI.getPayments()
    .then(response => dispatch(setPayments(response.data)))
    .catch(err => console.log(err))

  dispatch(setSearchPayment(localStorage.getItem('searchPayment') || ''));
}

export const getUserPayments = (userId) => async (dispatch) => {
  await paymentsAPI.getUserPayments(userId)
    .then(response => dispatch(setUserPayments(response.data)))
    .catch(err => console.log(err))

  dispatch(setSearchPayment(localStorage.getItem('searchPayment') || ''));
}

export const getPaymentsInInvoice = (invoiceId) => async (dispatch) => {
  await paymentsAPI.getPaymentsInInvoice(invoiceId)
    .then(response => dispatch(setPaymentsInInvoice(response.data)))
    .catch(err => console.log(err))
}

export const addPayment = (
  date,
  total,
  approved,
  invoice,
  comment,
  scans) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    await paymentsAPI.addPayment(
      date,
      total,
      approved,
      invoice,
      comment,
      scans)
      .then(response => {
        dispatch(setAddPayment(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })

    dispatch(setSearchPayment(localStorage.getItem('searchPayment') || ''));
  }

export const searchPayment = (searchText) => (dispatch) => {
  let text = searchText.toLowerCase()
  localStorage.setItem('searchPayment', text);
  setTimeout(() => dispatch(setSearchPayment(text)), 300)
}

export const deletePayment = (paymentId) => async () => {
  await paymentsAPI.deletePayment(paymentId);
}
