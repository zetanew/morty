import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import filtersReducer from './filterSlice';
export const store = configureStore({
  reducer: {
    locations : locationReducer,
    filters: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;