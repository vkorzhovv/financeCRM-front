import { projectExpensesAPI } from "../API/api";

const SET_EXPENSES = 'SET_EXPENSES'
const ADD_EXPENSES = 'ADD_EXPENSES';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

let initialState = {
  expenses: [],
  isFetching: false
};

export const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EXPENSES:
      return {
        ...state,
        expenses: action.expenses
      }
    case ADD_EXPENSES:
      return {
        ...state,
        expenses: [...state.expenses, action.newExpense]
      }
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((item) => (
          item.id === action.expense.id
            ? { ...item }
            : item
        ))
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

const setExpenses = (expenses) => ({ type: SET_EXPENSES, expenses });
const setAddExpense = (newExpense) => ({ type: ADD_EXPENSES, newExpense });
const setEditExpense = (expense) => ({ type: EDIT_EXPENSE, expense });
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching });

export const getExpenses = (projectId) => async (dispatch) => {
  await projectExpensesAPI.getProjectsExpenses(projectId)
  .then(response => dispatch(setExpenses(response.data)))
  .catch(err => console.log(err))
}

export const addExpense = (
  payment_type,
  subtype,
  date,
  amount,
  payer,
  project) => async (dispatch) => {
    dispatch(toggleIsFetching(true))

    await projectExpensesAPI.addProjectExpenses(
      payment_type,
      subtype,
      date,
      amount,
      payer,
      project)
      .then(response => {
        dispatch(setAddExpense(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })

  }
export const editExpense = (
  expenseId,
  payment_type,
  subtype,
  date,
  amount,
  payer,
  project) => async (dispatch) => {
    dispatch(toggleIsFetching(true))

    await projectExpensesAPI.editProjectExpenses(
      expenseId,
      payment_type,
      subtype,
      date,
      amount,
      payer,
      project)
      .then(response => {
        dispatch(setEditExpense(response.data))
        dispatch(toggleIsFetching(false));
        return response;
      })
      .catch((err) => {
        dispatch(toggleIsFetching(false));
        throw err;
      })
  }

export const deleteExpense = (expenseId) => async () => {
  await projectExpensesAPI.deleteProjectExpense(expenseId);
}
