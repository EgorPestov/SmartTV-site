import { configureStore } from '@reduxjs/toolkit';
import { bannerProcessSlice } from './banner-process/banner-process';

export const store = configureStore({
  reducer: bannerProcessSlice.reducer,
});
