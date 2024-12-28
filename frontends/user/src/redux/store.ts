import { configureStore } from '@reduxjs/toolkit';

import loginSignUpSlice from './features/loginSignup/loginSignUpSlice';
import addToCartSlice from './features/addToCart/addToCartSlice';

export const store = configureStore({
  reducer: {
    loginSignUp: loginSignUpSlice,
    addToCart: addToCartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
