// reducer.js
import { createSlice } from "@reduxjs/toolkit";

let initialState = JSON.parse(localStorage.getItem("todos")) || [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos: (state, action) => {
      state.push(action.payload);
    },
    removeTodos: (state, action) => {
      const updatedState = state.filter((item) => item.id !== action.payload);

      localStorage.setItem("todos", JSON.stringify(updatedState));
      return updatedState;
    },
    updateTodos: (state, action) => {
      const updatedState = state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            item: action.payload.item,
          };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedState));
      return updatedState;
    },
    completeTodos: (state, action) => {
      const updatedState = state.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });

      localStorage.setItem("todos", JSON.stringify(updatedState));
      return updatedState;
    },
    clearTodos: (state) => {
      return [];
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
  clearTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
