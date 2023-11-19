import { createSlice } from "@reduxjs/toolkit";

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