import { projectExpensesAPI } from "../API/api";

const SET_EXPENSES = 'SET_EXPENSES'
const ADD_EXPENSES = 'ADD_EXPENSES';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

let initialState = {
  expenses: [],
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
    default: return { ...state };
  }
}

const setExpenses = (expenses) => ({ type: SET_EXPENSES, expenses });
const setAddExpense = (newExpense) => ({ type: ADD_EXPENSES, newExpense });
const setEditExpense = (expense) => ({ type: EDIT_EXPENSE, expense });

export const getExpenses = (projectId) => async (dispatch) => {
  const response = await projectExpensesAPI.getProjectsExpenses(projectId);
  dispatch(setExpenses(response.data));
}

export const addExpense = (
  payment_type,
  subtype,
  date,
  amount,
  payer,
  project) => async (dispatch) => {
    const response = await projectExpensesAPI.addProjectExpenses(
      payment_type,
      subtype,
      date,
      amount,
      payer,
      project);
    if (response.status < 300) {
      dispatch(setAddExpense(response.data))
    }
  }
export const editExpense = (
  expenseId,
  payment_type,
  subtype,
  date,
  amount,
  payer,
  project) => async (dispatch) => {
    const response = await projectExpensesAPI.editProjectExpenses(
      expenseId,
      payment_type,
      subtype,
      date,
      amount,
      payer,
      project);
    if (response.status < 300) {
      dispatch(setEditExpense(response.data))
    }
  }

export const deleteExpense = (expenseId) => async () => {
  await projectExpensesAPI.deleteProjectExpense(expenseId);
}
