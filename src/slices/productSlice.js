import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../services/product.service';

const initialState = {
    productos: []
}

export const obtenerProductos = createAsyncThunk(
    'getProducts / GET',
    async (pageAndData, {rejectedWithValue}) => {
        try {
            const products = await ProductService.obtenerCategoriaActions(pageAndData); 
            return products;
        } catch (error) {
            throw rejectedWithValue(error.message);
        }
    }
);

export const crearNuevoProducto = createAsyncThunk(
    'newProduct / POST',
    async (productData, {rejectedWithValue}) => {
        try {
            const products = await ProductService.crearNuevoProductoAction(productData); 
            return products;
        } catch (error) {
            throw rejectedWithValue(error.message);
        }
    }
);

const productsSlices = createSlice ({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(obtenerProductos.fulfilled, (state, action) => {
            return action.payload.data
        });
        builder.addCase(crearNuevoProducto.fulfilled, (state, action) => {
            return action.payload
        })
    }
})

const { reducer } = productsSlices;
export default reducer