/* //import Swal from 'sweetalert2';
import {    
    LOGIN_SUCCESS,
   // LOGIN_USER_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
    DESCARGA_DATOS_USUARIO_EXITO,
    EDITAR_DATOS_USUARIO_EXITO
  } from "./types";
  
  

  import AuthService from "../services/auth.service";
 import clienteAxios from "../config/axios";
 const user = JSON.parse(localStorage.getItem("userToken"));
 const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};


export const loginUsuarioActions = (email, password) => (dispatch) => {
  return AuthService.loginUsuario(email, password).then(
    (data) => {
      dispatch({        
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      window.location = "/productos?busqueda=ultimos_productos&page=0"
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: LOGIN_FAIL,       
      });
      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export function obtenerDatosUsuarioAction(id){  
  return async (dispatch) => {
    try{
      const datosUsuario = await clienteAxios.get(`/api/usuarios/${id.userId}`, data)
      dispatch(obtenerDatosUsuarioExito(datosUsuario.data))      
    }catch(error){
      console.log(error.response);  
    }    
  }
}


const obtenerDatosUsuarioExito = (datosUsuario)=>({
  type: DESCARGA_DATOS_USUARIO_EXITO,
  payload: datosUsuario

})


export function editarDatosUsuarioAction(datosUsuario){ 
  return async (dispatch) => {
    try{
      const editarDatosUsuario = await clienteAxios.put(`/api/usuarios/${id.userId}`, 
      datosUsuario,
      data)
      dispatch(editarDatosUsuarioExito(editarDatosUsuario))      
    }catch(error){
      console.log(error.response); 
    }
    
  }
}

const editarDatosUsuarioExito = (editarDatosUsuario)=>({
  type: EDITAR_DATOS_USUARIO_EXITO,
  payload: editarDatosUsuario
})
  
  export const logout = () => (dispatch) => {
    AuthService.logout();  
    dispatch({
      type: LOGOUT,
    });
  }; */