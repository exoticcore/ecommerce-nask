import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  actived: false,
};

export const loginSignupSlice = createSlice({
  name: 'loginSignup',
  initialState,
  reducers: {
    setActived: (state, { payload }) => {
      state.actived = !state.actived;
    },
  },
  extraReducers: (builder) => {},
});

export const { setActived } = loginSignupSlice.actions;

export default loginSignupSlice.reducer;
