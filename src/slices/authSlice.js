import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from '../services/auth.service';

const initialState = [];

export const loginUser = createAsyncThunk (
    "user/login",
    async (userData) => {        
        const res = await AuthServices.checkAuth(userData);  
        console.log(res)      
        if (res.data) {
            localStorage.setItem("userName", JSON.stringify(res.data.userName));
            localStorage.setItem("email", JSON.stringify(res.data.email));
            localStorage.setItem("userToken", JSON.stringify(res.data.accessToken));            
          } 
        return res
    }
);

export const logOutUser = createAsyncThunk (
    "user/logOut",
    async () => {
        const res = await AuthServices.logOutUser(); 
        console.log(res)
        return res
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {             
            return action.payload
        }
    }
})

const { reducer } = authSlice;
export default reducer;