import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PlaybarState = {
  currentTime: number;
};

const initialState: PlaybarState = {
  currentTime: 0,
};

export const playbarSlice = createSlice({
  name: "playbar",
  initialState,
  reducers: {
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

export const { setCurrentTime } = playbarSlice.actions;

export default playbarSlice.reducer;
