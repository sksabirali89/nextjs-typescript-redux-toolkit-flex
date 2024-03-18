import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { IMPORTANT, TASKS, COMPLETED } from "./categories";

interface Category {
  [IMPORTANT]: string[];
  [TASKS]: string[];
  [COMPLETED]: string[];
}

interface TodoState extends Category {
  selectedCategory: keyof Category;
}

const initialState: TodoState = {
  selectedCategory: TASKS,
  [IMPORTANT]: [],
  [TASKS]: [],
  [COMPLETED]: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ category: keyof Category, todo: string }>) => {
      const { category, todo } = action.payload;
      state[category].push(todo);
    },
    changeSelectedCategory: (state, action:PayloadAction<keyof Category>) => {
      state.selectedCategory = action.payload;
    },
    changeTodoCategoryToComplete: (state, action: PayloadAction<{ category: keyof Category, todo: string }>) => {
      console.log(action.payload);
      const {  category,todo } = action.payload;
      state[TASKS] = state[TASKS].filter(item => item !== todo);
      state[category].push(todo);
    },
    changeTodoCategoryToTask: (state, action: PayloadAction<{ category: keyof Category, todo: string }>) => {
      console.log(action.payload);
      const {  category,todo } = action.payload;
      state[COMPLETED] = state[COMPLETED].filter(item => item !== todo);
      state[category].push(todo);
    },
  },
});

export const {
  addTodo,
  changeSelectedCategory,
  changeTodoCategoryToComplete,
  changeTodoCategoryToTask,
} = todoSlice.actions;
export default todoSlice.reducer;
