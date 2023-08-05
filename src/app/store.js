import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/usersSlice';
import productsReducer from '../slices/productSlice';
import buscoPostsReducer from '../slices/buscoPostSlice';
import authReducer from '../slices/authSlice';
import favoriteProductsReducer from '../slices/favoriteProductsSlice';

const reducer = {
  users: userReducer,
  products: productsReducer,
  buscoPosts: buscoPostsReducer,
  auth: authReducer,
  favoriteProducts: favoriteProductsReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
