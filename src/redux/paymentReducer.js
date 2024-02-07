import { paymentsAPI } from "../API/api";

const SET_PAYMENTS = 'SET_PAYMENTS';
const SET_USER_PAYMENTS = 'SET_USER_PAYMENTS';
const SET_PAYMENTS_IN_INVOICE = 'SET_PAYMENTS_IN_INVOICE';
const ADD_PAYMENT = 'ADD_PAYMENT';
const SEARCH_PAYMENT = 'SEARCH_PAYMENT';
const FILTER_PAYMENT = 'FILTER_PAYMENT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  payments: [],
  filteredPayments: [],
  filterDatas: {
    project: sessionStorage.getItem('paymentProject') || '',
    payer: sessionStorage.getItem('paymentPayer') || '',
    receiver: sessionStorage.getItem('paymentReceiver') || '',
    fromDate: sessionStorage.getItem('paymentFromDate') || '',
    toDate: sessionStorage.getItem('paymentToDate') || '',
    summMin: sessionStorage.getItem('paymentSummMin') || 0,
    summMax: sessionStorage.getItem('paymentSummMax') || 'Infinity',
    status: sessionStorage.getItem('paymentStatus') || '',
  },
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
    case FILTER_PAYMENT: {
      return {
        ...state,
        filterDatas: action.filterDatas,
        filteredPayments: state.filteredPayments.length
          ? [...state.filteredPayments]
            .filter(item => action.filterDatas.project === '' ? item : +action.filterDatas.project === +item.invoice.project.id)
            .filter(item => action.filterDatas.payer === '' ? item : +action.filterDatas.payer === +item.invoice.payer.id)
            .filter(item => action.filterDatas.receiver === '' ? item : +action.filterDatas.receiver === +item.invoice.receiver.id)
            .filter(item => action.filterDatas.fromDate === '' ? item : new Date(action.filterDatas.fromDate).getTime() <= new Date(item.date).getTime())
            .filter(item => action.filterDatas.toDate === '' ? item : new Date(action.filterDatas.toDate).getTime() >= new Date(item.date).getTime())
            .filter(item => +item.total >= +action.filterDatas.summMin && +item.total <= +action.filterDatas.summMax)
            .filter(item => action.filterDatas.status === '' ? item : item.approved === Boolean(Number(action.filterDatas.status)))
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
const setUserPayments = (payments) => ({ type: SET_USER_PAYMENTS, payments });
const setPaymentsInInvoice = (paymentsInInvoice) => ({ type: SET_PAYMENTS_IN_INVOICE, paymentsInInvoice });
const setAddPayment = (newPayment) => ({ type: ADD_PAYMENT, newPayment });
const setSearchPayment = (searchPayment) => ({ type: SEARCH_PAYMENT, searchPayment });
const setFilterPayment = (
  project,
  payer,
  receiver,
  fromDate,
  toDate,
  minSumm,
  maxSumm,
  status,
) => ({
  type: FILTER_PAYMENT,
  filterDatas: {
    project: project,
    payer: payer,
    receiver: receiver,
    fromDate: fromDate,
    toDate: toDate,
    summMin: minSumm,
    summMax: maxSumm,
    status: status,
  }
});
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

const filterFunctions = (dispatch) => {
  dispatch(setSearchPayment(localStorage.getItem('searchPayment') || ''))
  dispatch(setFilterPayment(
    sessionStorage.getItem('paymentProject') || '',
    sessionStorage.getItem('paymentPayer') || '',
    sessionStorage.getItem('paymentReceiver') || '',
    sessionStorage.getItem('paymentFromDate') || '',
    sessionStorage.getItem('paymentToDate') || '',
    sessionStorage.getItem('paymentSummMin') || 0,
    sessionStorage.getItem('paymentSummMax') || 'Infinity',
    sessionStorage.getItem('paymentStatus') || ''
  ))
}

export const getPayments = () => async (dispatch) => {
  await paymentsAPI.getPayments()
    .then(response => dispatch(setPayments(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}

export const getUserPayments = (userId) => async (dispatch) => {
  await paymentsAPI.getUserPayments(userId)
    .then(response => dispatch(setUserPayments(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
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
  }

export const searchPayment = (searchText) => (dispatch) => {
  let text = searchText.toLowerCase()
  localStorage.setItem('searchPayment', text);
  dispatch(setSearchPayment(text))
  dispatch(setFilterPayment(
    sessionStorage.getItem('paymentProject') || '',
    sessionStorage.getItem('paymentPayer') || '',
    sessionStorage.getItem('paymentReceiver') || '',
    sessionStorage.getItem('paymentFromDate') || '',
    sessionStorage.getItem('paymentToDate') || '',
    sessionStorage.getItem('paymentSummMin') || 0,
    sessionStorage.getItem('paymentSummMax') || 'Infinity',
    sessionStorage.getItem('paymentStatus') || ''
  ));
}

export const filterPayment = (
  project,
  payer,
  receiver,
  fromDate,
  toDate,
  minSumm,
  maxSumm,
  status,
) => (dispatch) => {
  sessionStorage.setItem('paymentProject', project)
  sessionStorage.setItem('paymentPayer', payer)
  sessionStorage.setItem('paymentReceiver', receiver)
  sessionStorage.setItem('paymentFromDate', fromDate)
  sessionStorage.setItem('paymentToDate', toDate)
  sessionStorage.setItem('paymentSummMin', minSumm)
  sessionStorage.setItem('paymentSummMax', maxSumm)
  sessionStorage.setItem('paymentStatus', status)

  dispatch(setSearchPayment(localStorage.getItem('searchPayment') || ''));
  dispatch(setFilterPayment(
    project,
    payer,
    receiver,
    fromDate,
    toDate,
    minSumm,
    maxSumm,
    status,
  ));
}

export const deletePayment = (paymentId) => async () => {
  await paymentsAPI.deletePayment(paymentId);
}
