import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from '../services/user.service';
import Swal from 'sweetalert2';

const initialState = {
  user: undefined,
};

export const nuevoUsuario = createAsyncThunk(
  'createUser / post',
  async (newUserData, { rejectWithValue }) => {
    try {
      const newUser = await UsersService.registroUsuario(newUserData);
      return newUser;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const loginUsuario = createAsyncThunk(
  'loginUser / post',
  async (userData, { rejectWithValue }) => {
    try {
      const user = await UsersService.loginUsuarioActions(userData);
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(error.message);
    }
  }
);

export const obtenerDatosUsuario = createAsyncThunk(
  'getUserData / get',
  async (userId, { rejectWithValue }) => {
    console.log(userId);

    try {
      const user = await UsersService.obtenerDatosUsuario(userId);
      return user;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const editarDatosUsuario = createAsyncThunk(
  'editUserData / put',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const user = await UsersService.editarUsuario(data);
      return user;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const logOutUsuario = createAsyncThunk(
  'logOut / post',
  async (nombreUser, { rejectWithValue }) => {
    try {
      const isLogOut = await UsersService.logoutUsuario(nombreUser);
      console.log(isLogOut);
      return isLogOut;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const eliminarUsuario = createAsyncThunk(
  'removeUser / delete',
  async (id, { rejectWithValue }) => {
    try {
      const user = await UsersService.eliminarUsuario(id);
      return user;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

const usersSlices = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(nuevoUsuario.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El Usuario se ha creado Correctamente', 'success').then(function () {
          window.location = '/login';
        });
      }
      return action.payload;
    });
    builder.addCase(loginUsuario.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        sessionStorage.setItem('userName', action.payload.data.nombre);
        sessionStorage.setItem('userToken', action.payload.data.accessToken);
        sessionStorage.setItem('userId', action.payload.data.id);
      }
      return action.payload;
    });
    builder.addCase(loginUsuario.rejected, (state, action) => {
      if (action.payload.status !== 200) {
        Swal.fire('Error', 'Usuario o Contraseña Incorrectos', 'error').then(function () {
          window.location = '/login';
        });
      }
      return action.payload;
    });
    builder.addCase(obtenerDatosUsuario.fulfilled, (state, action) => {
      console.log(action.payload);
      return {
        user: action.payload.data,
      };
    });
    builder.addCase(editarDatosUsuario.fulfilled, (state, action) => {
      console.log(action.payload);
      sessionStorage.setItem('userName', action.payload.data.user.nombre);
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El Usuario se ha editado Correctamente', 'success').then(
          function () {
            window.location = '/';
          }
        );
      }
      return action.payload.data;
    });
    builder.addCase(logOutUsuario.fulfilled, (state, action) => {
      if (action.payload === true) {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userToken');
        window.location = '/productos?busqueda=ultimos_productos&page=0';
      }
      return action.payload;
    });
    builder.addCase(eliminarUsuario.fulfilled, (state, action) => {
      if (action.payload.status !== 200) {
        Swal.fire('Error', 'Usuario o Contraseña Incorrectos', 'error').then(function () {
          window.location = '/login';
        });
      }
      return action.payload;
    });
  },
});

/* export const {   } = usersSlices.actions; */
const { reducer } = usersSlices;
export default reducer;
