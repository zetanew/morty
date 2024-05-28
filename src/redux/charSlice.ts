import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

interface CharState {
  characters: any[];
  isLoading: boolean;
  error: string | null;
}

interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: string[];
    url: string;
    created: string;
  }

const initialState: CharState = {
  characters: [],
  isLoading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk('chars/fetchCharacters', async (_, { getState }) => {
  const { filters } = getState() as RootState;
  let url = 'https://rickandmortyapi.com/api/character';
  if (filters.status) {
    url += `?status=${filters.status}`;
  }

  const response = await axios.get(url);
  const totalPages = response.data.info.pages;

  const pagePromises = [];
  for (let i = 2; i <= totalPages; i++) {
    pagePromises.push(axios.get(`${url}&page=${i}`));
  }

  const pageResponses = await Promise.all(pagePromises);

  let characters = response.data.results.concat(
    ...pageResponses.map(res => res.data.results)
  );

  if (filters.locationIds.length > 0) {
    characters = characters.filter((character: Character) => 
      filters.locationIds.includes(character.location.url.split('/').pop() ?? '')
    );
  }

  return characters;
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