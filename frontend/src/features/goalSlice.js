import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [],
};

const goalSlice = createSlice({
  name: "goals",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
