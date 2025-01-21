import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCoinList = createAsyncThunk('coins/fetchList', async () => {
  const response = await axios.get('https://api.coincap.io/v2/assets');
  return response.data.data;
});

export const fetchCoinDetails = createAsyncThunk('coins/fetchDetails', async (coinId) => {
  const response = await axios.get(`https://api.coincap.io/v2/assets/${coinId}`);
  return response.data.data;
});

const coinSlice = createSlice({
  name: 'coins',
  initialState: {
    coins: [],
    selectedCoin: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    resetCoins(state) {
      state.coins = [];
      state.status = 'idle';
    },
    updateCoin(state, action) {
      const index = state.coins.findIndex(coin => coin.id === action.payload.id);
      if (index !== -1) {
        state.coins[index] = action.payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCoinList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCoinList.fulfilled, (state, action) => {
        state.status = 'success';
        state.coins = action.payload;
      })
      .addCase(fetchCoinList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCoinDetails.fulfilled, (state, action) => {
        state.selectedCoin = action.payload;
      });
  },
});

export const { resetCoins, updateCoin } = coinSlice.actions;
export default coinSlice.reducer;
