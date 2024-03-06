import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from '../services/user.service';

const initialState = {
  favoriteProducts: [],
};

export const getFavoriteProducts = createAsyncThunk(
  'getFavoriteProducts / GET',
  async (productId, { rejectedWithValue }) => {
    try {
      const getFavoriteProducts = await UsersService.getFavoriteProducts(productId);
      return getFavoriteProducts;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

const favortieProductsSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFavoriteProducts.fulfilled, (state, action) => {
      state.favoriteProducts = action.payload.data.favoritos;
    });
  },
});

// export const { setProductId, setProductToEdit } = favortieProductsSlice.actions;
const { reducer } = favortieProductsSlice;
export default reducer;
