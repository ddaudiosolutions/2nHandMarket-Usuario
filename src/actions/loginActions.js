//import Swal from 'sweetalert2';
import {
  LOGIN_SUCCESS,
  // LOGIN_USER_SUCCESS,
  //LOGIN_FAIL,
  LOGOUT,
  //SET_MESSAGE,
  DESCARGA_DATOS_USUARIO_EXITO,
  OBTENER_USUARIO_EDITAR,
  EDITAR_DATOS_USUARIO_EXITO,
  OBTENER_AVATAR_EXITO
} from "./types";

import AuthService from "../services/auth.service";
import clienteAxios from "../config/axios";
const user = JSON.parse(localStorage.getItem("user"));
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};

export function loginUsuarioActions(email, password) {
  console.log(email, password);
  return async (dispatch) => {
    try {
      const loginUsuario = await clienteAxios.post("/api/auth", {
        email,
        password,
      });

      dispatch(loginExito(loginUsuario.data));
      console.log(loginUsuario.data);
      if (loginUsuario.data) {
        localStorage.setItem("userN", JSON.stringify(loginUsuario.data.nombre));
        localStorage.setItem("user", JSON.stringify(loginUsuario.data.token));
        localStorage.setItem("userId", loginUsuario.data.id);
      }
      //obtenerDatosUsuarioAction(loginUsuario.data.id);
      window.location = "/productos?busqueda=ultimos_productos&page=0";
    } catch (error) {}
  };
}

const loginExito = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

//CARGAR DATOS DE USUARIO DESDE LA BB DE DATOS
export function obtenerDatosUsuarioAction(id) {
  console.log(id.userId);
  return async (dispatch) => {
    try {
      const datosUsuario = await clienteAxios.get(
        `/api/usuarios/${id.userId}`,
        data
      );
      dispatch(obtenerDatosUsuarioExito(datosUsuario.data));
      console.log(datosUsuario.data);
    } catch (error) {
      console.log(error.response);
    }
  };
}

const obtenerDatosUsuarioExito = (datosUsuario) => ({
  type: DESCARGA_DATOS_USUARIO_EXITO,
  payload: datosUsuario,
});

//COLOCAR DATOS DE USUARIO EN EDICION
export function obtenerDatosUsuarioEditarAction(usuario){ 
  return (dispatch) => {
    dispatch(obtnerDatosUsuarioEditarExito(usuario))
    console.log(usuario.datosUsuario)
  }
}

const obtnerDatosUsuarioEditarExito = (usuario) => ({
  type:  OBTENER_USUARIO_EDITAR,
  payload: usuario
})



//EDITAR USUARIO

export function editarDatosUsuarioAction(datosUsuario){
  //const userEditId = datosUsuario.getAll('id')
  console.log(datosUsuario)
  return async (dispatch) => {
    try{
      const editarDatosUsuario = await clienteAxios.put(`/api/usuarios/editar/${datosUsuario._id}`, 
      datosUsuario, data
      )
      dispatch(editarDatosUsuarioExito(editarDatosUsuario))      
    }catch(error){
      console.log(error.response); 
    }
    
  }
}

const editarDatosUsuarioExito = (usuarioEditado) => ({
  type:  EDITAR_DATOS_USUARIO_EXITO,
  payload: usuarioEditado
})

//OBTENER AVATAR
// export function obtenerAvatarAction (id) {
//   console.log(id)
//   return async (dispatch) =>{
//     const obtenerAvatar = await clienteAxios.get(`/api/usuarios/avatar/${id}`, data)
//     console.log(obtenerAvatar.data.avatarId[0])
//     dispatch(obtenerAvatarExito(obtenerAvatar.data.avatarId[0]))

//   }
// }

// const obtenerAvatarExito = (avatar) => ({
//   type: OBTENER_AVATAR_EXITO,
//   payload: avatar
// })


//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};
