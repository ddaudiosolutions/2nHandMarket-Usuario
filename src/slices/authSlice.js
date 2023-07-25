import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from '../services/auth.service';
import Swal from 'sweetalert2';

const initialState = [];

/* export const loginUser = createAsyncThunk(
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

export const logOutUser = createAsyncThunk(
  "user/logOut",
  async () => {
    const res = await AuthServices.logOutUser();
    console.log(res)
    return res
  }
); */

export const resetPassword = createAsyncThunk(
  "user/reset-password",
  async (email, { rejectedWithValue }) => {
    try {
      const res = await AuthServices.resetPassword(email);
      return res
    } catch (e) {
      throw rejectedWithValue(e.message);
    }
  }
);

export const changePasswordUser = createAsyncThunk(
  "user/changePasswordUser",
  async (data) => {
    const res = await AuthServices.changePasswordUser(data);
    console.log(res)
    return res;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    /* builder.addCase(loginUser.fulfilled, (state, action) => {
      return action.payload
    }); */
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      console.log('resetPass', action.payload)
      if (action.payload.status === 200) {
        Swal.fire(
          'Correcto',
          'Hemos enviado un email con las instrucciones',
          'success'
        ).then(function () {
          window.location = "/login"
        })
      }
      return action.payload
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      console.log('rejected', action.payload)
      Swal.fire(
        'Vuelve a introducir el correo',
        'El correo no es correcto o no está registrado en WindyMarket. ',
        'error'
      ).then(function () {
        window.location = "/forgotpassword"
      })

      return action.payload
    });
    builder.addCase(changePasswordUser.fulfilled, (state, action) => {
      console.log('changePass', action.payload)
      if (action.payload.status === 200) {
        Swal.fire(
          'Correcto',
          'La Contraseña se ha cambiado con éxito, ya puedes acceder a WindyMarket',
          'success'
        ).then(function () {
          window.location = "/login"
        })
      }
      return action.payload
    });
  }



})

const { reducer } = authSlice;
export default reducer;