import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from '../services/auth.service'

const initialState = { 
    datosUsuario: {}
} 

export const loginUsuario = createAsyncThunk (
    'loginUser/post ',
    async (loginData) => {
        console.log(loginData)
        const {email, password} = loginData
        try {
            const res = await AuthService.login(email, password)
            console.log(res)
            return res
        } catch (error) {
            return error.response
        }
    }
)

const authSlice = createSlice({
  name: 'datosUsuario',
  initialState,
  reducers: {
  },
  extraReducers:{ 
    [loginUsuario.fulfilled]: (state , action) => {
        console.log(action.payload)
        if(action.payload.status === 200) {
            console.log(action.payload);  
            sessionStorage.setItem("userName", JSON.stringify(action.payload.data.nombre));
            sessionStorage.setItem("userToken", JSON.stringify(action.payload.data.accessToken));
            sessionStorage.setItem("userId", action.payload.data.id);  
        }
    }
  }
})



const { reducer } = authSlice;

export default reducer