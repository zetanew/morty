import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  status: string;
  locationIds: string[];
}

const initialState: FiltersState = {
  status: '',
  locationIds: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setLocationFilter: (state, action: PayloadAction<string[]>) => {
      state.locationIds = action.payload;
    },
  },
});

export const { setStatusFilter, setLocationFilter } = filtersSlice.actions;

export default filtersSlice.reducer;