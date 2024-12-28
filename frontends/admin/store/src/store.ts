import { configureStore } from '@reduxjs/toolkit';
import userSlice from './slice/userSlice.ts';
import catalogSlice from './slice/catalogSlice.ts';
import mediaSlice from './features/media/mediaSlice.ts';
import productSlice from './features/catalog/product/productSlice.ts';
import attributeSlice from './features/catalog/attribute/attrSlice.ts';

export * from './slice/userSlice.ts';
export * from './slice/catalogSlice.ts';
export * from './features/media/mediaSlice.ts';
export * from './features/catalog/product/productSlice.ts';

export const store = configureStore({
  reducer: {
    user: userSlice,
    catalog: catalogSlice,
    media: mediaSlice,
    product: productSlice,
    attribute: attributeSlice,
  },
  // preloadedState: {user: {isLoading: false, user: {name: '', isSignedIn: false }, error: ''}},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export { setUser, clearUser, login, getAccessToken, getUserInfo };
