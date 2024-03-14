import { combineReducers, legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import { authReducer } from './authReducer';
import { itemsReducer } from './cashItemReducer';
import { invoiceItemReducer } from './invoiceItemReducer';
import { invoicesReducer } from './invoicesReducer';
import { paymentItemReducer } from './paymentItemReducer';
import { paymentsReducer } from './paymentReducer';
import { expensesReducer } from './projectExpensesReducer';
import { projectItemReducer } from './projectItemReducer';
import { projectsReducer } from './projectsReducer';
import { publicationsReducer } from './publicationsReducer';
import { userItemReducer } from './userItemReducer';
import { usersReducer } from './usersReducer';

let reducers = combineReducers({
  auth: authReducer,
  users: usersReducer,
  userItem: userItemReducer,
  projects: projectsReducer,
  projectItem: projectItemReducer,
  cashItems: itemsReducer,
  invoices: invoicesReducer,
  invoiceItem: invoiceItemReducer,
  payments: paymentsReducer,
  paymentItem: paymentItemReducer,
  projectExpenses: expensesReducer,
  publications: publicationsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
