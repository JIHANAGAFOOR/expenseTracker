import { createSlice } from "@reduxjs/toolkit";
const counterSlice = createSlice({
  name: "counter",
  initialState: {
 
    users: [],
    userLogin: null,
    expense: [],
  },
  reducers: {
    usersRegistered(state, action) {
      state.users = [...state.users, action.payload];
    },
    userLoginSelected(state, action) {
      state.userLogin = action.payload;
    },
    userLogoutSelected(state, action) {
      state.userLogin = null;
    },
    addExpenseSelected(state, action) {
      state.expense = [...state.expense, action.payload];
    },
    deleteExpenseSelected(state, action) {
      state.expense = state.expense.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export const expenseActions = counterSlice.actions;
export default counterSlice;
