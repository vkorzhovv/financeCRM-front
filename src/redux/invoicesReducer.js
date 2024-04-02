import { invoicesAPI } from "../API/api";

const SET_INVOICES = 'SET_INVOICES'
const SET_USER_INVOICES = 'SET_USER_INVOICES'
const SET_UNAPPROVED_INVOICES = 'SET_UNAPPROVED_INVOICES'
const SET_PROJECT_INVOICES = 'SET_PROJECT_INVOICES'
const SET_PROJECT_RECEIPTS = 'SET_PROJECT_RECEIPTS'
const SET_PROJECT_EXPENSES = 'SET_PROJECT_EXPENSES'
const ADD_INVOICE = 'ADD_INVOICE';
const SEARCH_INVOICE = 'SEARCH_INVOICE'
const FILTER_INVOICE = 'FILTER_INVOICE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
  invoices: [],
  filteredInvoices: [],
  filterDatas: {
    project: sessionStorage.getItem('invoiceProject') || '',
    payer: sessionStorage.getItem('invoicePayer') || '',
    receiver: sessionStorage.getItem('invoiceReceiver') || '',
    fromDate: sessionStorage.getItem('invoiceFromDate') || '',
    toDate: sessionStorage.getItem('invoiceToDate') || '',
    summMin: sessionStorage.getItem('invoiceSummMin') || 0,
    summMax: sessionStorage.getItem('invoiceSummMax') || 'Infinity',
    invoiceType: sessionStorage.getItem('invoiceType') || '',
    status: sessionStorage.getItem('invoiceStatus') || '',
  },
  searchInvoice: '',
  unapprovedInvoices: [],
  projectInvoices: [],
  projectReceipts: [],
  projectExpenses: [],
  isFetching: false
};

export const invoicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INVOICES:
      return {
        ...state,
        invoices: action.invoices
      }
    case SET_USER_INVOICES:
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
    case SET_PROJECT_RECEIPTS:
      return {
        ...state,
        projectReceipts: action.projectReceipts
      }
    case SET_PROJECT_EXPENSES:
      return {
        ...state,
        projectExpenses: action.projectExpenses
      }
    case ADD_INVOICE:
      return {
        ...state,
        invoices: [...state.invoices, action.newInvoice]
      }
    case SEARCH_INVOICE: {
      return {
        ...state,
        searchInvoice: action.searchInvoice,
        filteredInvoices: state.invoices.length
          ? [...state.invoices]
            .filter(item => (`${item.id + 10000}
                ${item.project?.name}
                ${item.project?.description}
                ${item.payer && item.payer.last_name} ${item.payer && item.payer.first_name} ${item.payer && item.payer.father_name}
                ${item.receiver && item.receiver.last_name} ${item.receiver && item.receiver.first_name} ${item.receiver && item.receiver.father_name}`
              .toLowerCase()).includes(action.searchInvoice))
          : [],
      }
    }
    case FILTER_INVOICE: {
      return {
        ...state,
        filterDatas: action.filterDatas,
        filteredInvoices: state.filteredInvoices?.length
          ? [...state.filteredInvoices]
            .filter(item => action.filterDatas.project === '' ? item : +action.filterDatas.project === +item.project?.id)
            .filter(item => action.filterDatas.payer === '' ? item : +action.filterDatas.payer === +item.payer.id)
            .filter(item => action.filterDatas.receiver === '' ? item : +action.filterDatas.receiver === +item.receiver.id)
            .filter(item => action.filterDatas.fromDate === '' ? item : new Date(action.filterDatas.fromDate).getTime() <= new Date(item.date).getTime())
            .filter(item => action.filterDatas.toDate === '' ? item : new Date(action.filterDatas.toDate).getTime() >= new Date(item.date).getTime())
            .filter(item => +item.amount >= +action.filterDatas.summMin && +item.amount <= +action.filterDatas.summMax)
            .filter(item => action.filterDatas.invoiceType === '' ? item : item.expense === Boolean(Number(action.filterDatas.invoiceType)))
            .filter(item => action.filterDatas.status === '' ? item : +item.status === +action.filterDatas.status)
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

const setInvoices = (invoices) => ({ type: SET_INVOICES, invoices });
const setUserInvoices = (invoices) => ({ type: SET_USER_INVOICES, invoices });
const setUnapprovedInvoices = (unapprovedInvoices) => ({ type: SET_UNAPPROVED_INVOICES, unapprovedInvoices });
const setProjectInvoices = (projectInvoices) => ({ type: SET_PROJECT_INVOICES, projectInvoices });
const setProjectReceipts = (projectReceipts) => ({ type: SET_PROJECT_RECEIPTS, projectReceipts });
const setProjectExpenses = (projectExpenses) => ({ type: SET_PROJECT_EXPENSES, projectExpenses });
const setAddInvoices = (newInvoice) => ({ type: ADD_INVOICE, newInvoice });
const setSearchInvoice = (searchInvoice) => ({ type: SEARCH_INVOICE, searchInvoice });
const setFilterInvoice = (
  project,
  payer,
  receiver,
  fromDate,
  toDate,
  minSumm,
  maxSumm,
  invoiceType,
  status,
) => ({
  type: FILTER_INVOICE,
  filterDatas: {
    project: project,
    payer: payer,
    receiver: receiver,
    fromDate: fromDate,
    toDate: toDate,
    summMin: minSumm,
    summMax: maxSumm,
    invoiceType: invoiceType,
    status: status,
  }
});
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

const filterFunctions = (dispatch) => {
  dispatch(setSearchInvoice(localStorage.getItem('searchInvoice') || ''));
  dispatch(setFilterInvoice(
    sessionStorage.getItem('invoiceProject') || '',
    sessionStorage.getItem('invoicePayer') || '',
    sessionStorage.getItem('invoiceReceiver') || '',
    sessionStorage.getItem('invoiceFromDate') || '',
    sessionStorage.getItem('invoiceToDate') || '',
    sessionStorage.getItem('invoiceSummMin') || 0,
    sessionStorage.getItem('invoiceSummMax') || 'Infinity',
    sessionStorage.getItem('invoiceType') || '',
    sessionStorage.getItem('invoiceStatus') || ''
  ));
}

export const getInvoices = () => async (dispatch) => {
  await invoicesAPI.getInvoices()
    .then(response => dispatch(setInvoices(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}
export const getUserInvoices = (userId) => async (dispatch) => {
  await invoicesAPI.getUserInvoices(userId)
    .then(response => dispatch(setUserInvoices(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}
export const getUnapprovedInvoices = () => async (dispatch) => {
  await invoicesAPI.getUnapprovedInvoices()
    .then(response => dispatch(setUnapprovedInvoices(response.data)))
    .catch(err => console.log(err))
}
export const getProjectReceipts = (projectId) => async (dispatch) => {
  await invoicesAPI.getProjectReceipts(projectId)
    .then(response => dispatch(setProjectReceipts(response.data)))
    .catch(err => console.log(err))
}
export const getProjectExpenses = (projectId) => async (dispatch) => {
  await invoicesAPI.getProjectExpenses(projectId)
    .then(response => dispatch(setProjectExpenses(response.data)))
    .catch(err => console.log(err))
}
export const getProjectInvoices = (projectId) => async (dispatch) => {
  await invoicesAPI.getProjectInvoices(projectId)
    .then(response => dispatch(setProjectInvoices(response.data)))
    .catch(err => console.log(err))
}
export const getUnpaidInvoices = () => async (dispatch) => {
  await invoicesAPI.getUnpaidInvoices()
    .then(response => dispatch(setInvoices(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}
export const getUserUnpaidInvoices = (userId) => async (dispatch) => {
  await invoicesAPI.getUserUnpaidInvoices(userId)
    .then(response => dispatch(setUserInvoices(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}
export const getDebInvoices = () => async (dispatch) => {
  await invoicesAPI.getDebInvoices()
    .then(response => dispatch(setInvoices(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
}
export const getUserDebInvoices = (userId) => async (dispatch) => {
  await invoicesAPI.getUserDebInvoices(userId)
    .then(response => dispatch(setUserInvoices(response.data)))
    .catch(err => console.log(err))

  filterFunctions(dispatch);
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
  date) => (dispatch) => {
    dispatch(toggleIsFetching(true))
    return invoicesAPI.addInvoice(comment,
      approved,
      type,
      subtype,
      payer,
      receiver,
      project,
      amount,
      date)
      .then(response => {
        dispatch(setAddInvoices(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })
  }

export const searchInvoice = (searchText) => (dispatch) => {
  let text = searchText.toLowerCase()
  localStorage.setItem('searchInvoice', text);
  dispatch(setSearchInvoice(text))
  dispatch(setFilterInvoice(
    sessionStorage.getItem('invoiceProject') || '',
    sessionStorage.getItem('invoicePayer') || '',
    sessionStorage.getItem('invoiceReceiver') || '',
    sessionStorage.getItem('invoiceFromDate') || '',
    sessionStorage.getItem('invoiceToDate') || '',
    sessionStorage.getItem('invoiceSummMin') || 0,
    sessionStorage.getItem('invoiceSummMax') || 'Infinity',
    sessionStorage.getItem('invoiceType') || '',
    sessionStorage.getItem('invoiceStatus') || ''
  ));
}

export const filterInvoice = (
  project,
  payer,
  receiver,
  fromDate,
  toDate,
  minSumm,
  maxSumm,
  invoiceType,
  status,
) => (dispatch) => {
  sessionStorage.setItem('invoiceProject', project)
  sessionStorage.setItem('invoicePayer', payer)
  sessionStorage.setItem('invoiceReceiver', receiver)
  sessionStorage.setItem('invoiceFromDate', fromDate)
  sessionStorage.setItem('invoiceToDate', toDate)
  sessionStorage.setItem('invoiceSummMin', minSumm)
  sessionStorage.setItem('invoiceSummMax', maxSumm)
  sessionStorage.setItem('invoiceType', invoiceType)
  sessionStorage.setItem('invoiceStatus', status)

  dispatch(setSearchInvoice(localStorage.getItem('searchInvoice') || ''));
  dispatch(setFilterInvoice(
    project,
    payer,
    receiver,
    fromDate,
    toDate,
    minSumm,
    maxSumm,
    invoiceType,
    status,
  ));
}

export const deleteInvoice = (invoiceId) => async () => {
  await invoicesAPI.deleteInvoice(invoiceId);
}
