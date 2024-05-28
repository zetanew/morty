import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllLocations, Location } from '../api/http'; // location interface burda da lazim olacak

export const fetchAllLocationsThunk = createAsyncThunk(
  'locations/fetchAll',
  async () => {
    const locations = await fetchAllLocations();
    return locations;
  }
);

const locationsSlice = createSlice({
  name: 'locations',
  initialState: [] as Location[],
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllLocationsThunk.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(fetchAllLocationsThunk.rejected, (state, action) => {
        console.error('Lokasyonlari cekerken hata', action.error);
        return state;
      });
  }
});

export default locationsSlice.reducer;