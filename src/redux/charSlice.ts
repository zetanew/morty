import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface CharState {
  characters: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CharState = {
  characters: [],
  isLoading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk('chars/fetchCharacters', async (_, { getState }) => {
  const { filters } = getState() as RootState;
  let url = 'https://rickandmortyapi.com/api/character';
  if (filters.status || filters.locationIds.length > 0) {
    url += `?status=${filters.status}&location=${filters.locationIds.join(',')}`;
  }
  const response = await axios.get(url);
  return response.data.results;
});

const charsSlice = createSlice({
  name: 'chars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action: PayloadAction<unknown, string, unknown, SerializedError>) => {
        state.isLoading = false;
        state.error = action.error.message || null;
      });
  },
});

export default charsSlice.reducer;