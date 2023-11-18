// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Task Slice
export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    listData: [],
    formState: {
      date: '',
      icon: '',
      title: '',
      description: [],
      totalTimeSpend: 0,
      id: Date.now(),
    },
    selectedData: null,
  },
  reducers: {
    setListData: (state, action) => {
      state.listData = action.payload;
    },
    setFormState: (state, action) => {
      state.formState = action.payload;
    },
    resetFormState: (state) => {
      state.formState = {
        date: '',
        icon: '',
        title: '',
        description: [],
        totalTimeSpend: 0,
        id: Date.now(),
      };
    },
    setSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
    resetSelectedData: (state) => {
      state.selectedData = null;
    },
  },
});

export const {
  setListData,
  setFormState,
  resetFormState,
  setSelectedData,
  resetSelectedData,
} = taskSlice.actions;

export const selectListData = (state) => state.task.listData;
export const selectFormState = (state) => state.task.formState;
export const selectSelectedData = (state) => state.task.selectedData;

// Timer Slice
export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    timerCount: 0,
    timerPlay: false,
  },
  reducers: {
    setTimerCount: (state, action) => {
      state.timerCount = action.payload;
    },
    setTimerPlay: (state, action) => {
      state.timerPlay = action.payload;
    },
  },
});

export const { setTimerCount, setTimerPlay } = timerSlice.actions;
export const selectTimerCount = (state) => state.timer.timerCount;

// Combine all slices
export const rootReducer = {
  task: taskSlice.reducer,
  timer: timerSlice.reducer,
};

export default configureStore({
  reducer: rootReducer,
});
