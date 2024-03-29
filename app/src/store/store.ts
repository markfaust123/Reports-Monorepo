import { configureStore } from "@reduxjs/toolkit";
import reportsReducer from "./reports";
import userReducer from "./user";

export const store = configureStore({
  reducer: {
    reportsState: reportsReducer,
    userState: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
