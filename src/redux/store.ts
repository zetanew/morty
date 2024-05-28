import { configureStore } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import filtersReducer from './filterSlice';
import charsReducer from './charSlice';
export const store = configureStore({
  reducer: {
    locations : locationReducer,
    filters: filtersReducer,
    chars : charsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;