import type { User } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const setUser = userSlice.actions.setUser;
export const clearUser = userSlice.actions.clearUser;
export default userSlice.reducer;
