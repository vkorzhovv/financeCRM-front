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
import { userItemReducer } from './userItemReducer';
import { usersReducer } from './usersReducer';
// import { setAuth } from './authReducer';

// const authMiddleware = (store) => (next) => (action) => {
//   const { status } = action.payload || {};

//   // console.log(action.status);
//   console.log(action.payload);
//   console.log(status);
//   console.log(action);

//   // HTTP status code
//   if (status === 401) {
//     console.log('бла бла')
//     localStorage.clear();
//     store.dispatch(setAuth(false));
//   }
//   // else if (status === 403) {
//   //   toast.error('You lack enough privileges to perform the selected operation');
//   // }

//   return next(action);
// };

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
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

