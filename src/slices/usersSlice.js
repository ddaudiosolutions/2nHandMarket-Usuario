import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from '../services/users.service';

const initialState = [];

export const createUser = createAsyncThunk (
    "user/create",
    async (userData) => {        
        const res = await UsersService.create(userData);
        return res.data
    }
);

export const getUser = createAsyncThunk (
    "user/create",
    async (userData) => {        
        const res = await UsersService.getUser(userData);
        console.log(res.data);
        return res.data
    }
);

const userSlice = createSlice ({
    name: 'user',
    initialState,
    extraReducers: {
        [createUser.fulfilled]: (state, action) => {
           state.push(action.payload);
        }
    }
});

const { reducer } = userSlice;
export default reducer;