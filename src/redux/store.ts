import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import playbarReducer from "./playbarSlice";

const store = configureStore({
  reducer: {
    list: listReducer,
    playbar: playbarReducer,
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
