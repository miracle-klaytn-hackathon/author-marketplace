import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    accountName: "",
    authorities: [],
    email: "",
  },
};

export interface UserInfo {
  accountName: string;
  authorities: [];
  email: string;
}

const signIn = createSlice({
  name: "sign-in",
  initialState,
  reducers: {
    setInfoUser: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setInfoUser } = signIn.actions;

export default signIn.reducer;
