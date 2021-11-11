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
  USUARIO_ELIMINADO_EXITO

  //OBTENER_AVATAR_EXITO
} from "./types";

import AuthService from "../services/auth.service";
import clienteAxios from "../config/axios";
import Swal from 'sweetalert2';


const user = JSON.parse(localStorage.getItem("userToken"));
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
        localStorage.setItem("userName", JSON.stringify(loginUsuario.data.nombre));
        localStorage.setItem("userToken", JSON.stringify(loginUsuario.data.accessToken));
        localStorage.setItem("userId", loginUsuario.data.id);
      }
      //obtenerDatosUsuarioAction(loginUsuario.data.id);
      window.location = "/productos?busqueda=ultimos_productos&page=0";
    } catch (error) {
      console.log(error)
    }
  };
}

const loginExito = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

//CARGAR DATOS DE USUARIO DESDE LA BB DE DATOS
export function obtenerDatosUsuarioAction(id) {
 // console.log(id.userId);
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

export function editarDatosUsuarioAction(datosUsuario, id){
  
  console.log(id)
  return async (dispatch) => {
    try{
      const editarDatosUsuario = await clienteAxios.put(`/api/usuarios/editar/${id}`, 
      datosUsuario, data
      )
      dispatch(editarDatosUsuarioExito(editarDatosUsuario.data))      
    }catch(error){
      console.log(error.response); 
    }
    
  }
}

const editarDatosUsuarioExito = (usuarioEditado) => ({
  type:  EDITAR_DATOS_USUARIO_EXITO,
  payload: usuarioEditado
})


//ELIMINAR USUARIO
export function eliminarUsuarioAction (id){
  console.log(id)
return async (dispatch) => {
  try {
    const eliminarUsuario = await clienteAxios.delete(`/api/usuarios/${id}`, data)
    dispatch(eliminarUsuarioExito)
    console.log(eliminarUsuario)
    //PONER AQUÍ LA ALERTA DE QUE SE ELIMINÓ BIEN EL PRODUCTO
    Swal.fire("Correcto", "USUARIO ELIMINADO CON EXITO", "success").then(
      (result) => {
        if (result.isConfirmed) {
          console.log('usuario Borrado')
          // window.location = "/productos?busqueda=ultimos_productos&page=0";

        }
      }
    );

  }catch(error){
    console.log(error)
  }
}

} 

const eliminarUsuarioExito = ()=> ({
  type: USUARIO_ELIMINADO_EXITO
})

//////////////////////////////////////////////////
//////////////////////////////////////////////////
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
  
};
