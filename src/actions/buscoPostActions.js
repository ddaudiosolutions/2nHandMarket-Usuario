import {
  NUEVOBUSCOPOST_EXITO,
  OBTENER_BUSCOPOSTS_EXITO,
  VER_BUSCOPOST_EXITO_API_ID,
  OBTENER_BUSCOPOSTS_USER_EXITO,
  BORRAR_BUSCOPOST_USER_EXITO,
  OBTENER_BUSCOPOST_ELIMINAR,
  OBTENER_BUSCOPOST_EDITAR_EXITO,
  BUSCOPOST_EDITADO_EXITO
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
const user = JSON.parse(sessionStorage.getItem("userToken"));
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};

export function crearNuevoBuscoPostActions(title, description, contacto) {
  return async (dispatch) => {
    try {
      const newPost = await clienteAxios.post(
        "/api/buscoposts",
        { title, description, contacto },
        data
      );
      dispatch(nuevoBuscoPostExito(newPost.data));

      Swal.fire(
        "Correcto",
        "La Busqueda se ha creado Correctamente",
        "success"
      ).then(function () {
        window.location = "/productos?busqueda=ultimos_productos&page=0";
      });
      //return Promise.resolve();
    } catch (error) {
      console.log(error);
    }
  };
}

const nuevoBuscoPostExito = (dataPost) => ({
  type: NUEVOBUSCOPOST_EXITO,
  payload: dataPost,
});

export function obtenerBuscoPostsActions() {
  return async (dispatch) => {
    const getPosts = await clienteAxios.get("/api/buscoposts");    

    dispatch(obtenerBusocPostsExito(getPosts.data.obtenerBuscoPost));
  };
}

const obtenerBusocPostsExito = (getDataPosts) => ({
  type: OBTENER_BUSCOPOSTS_EXITO,
  payload: getDataPosts,
});


export function obtenerBuscoPostIdApiAction(buscoPost_id) {  

  return async (dispatch) => {
    const getPostId = await clienteAxios.get(`/api/buscoposts/${buscoPost_id}`);    
    dispatch(obtenerBuscoPostIdApiExito(getPostId.data.buscoPostId));
  };
}

const obtenerBuscoPostIdApiExito = (getPostId) => ({
  type: VER_BUSCOPOST_EXITO_API_ID,
  payload: getPostId,
});

export function obtenerBuscoPostsUserAction() {
  return async (dispatch) => {
    const getPostsUser = await clienteAxios.get(`/api/buscoposts/user`, data);   
    dispatch(
      obtenerBuscoPostsUserExito(getPostsUser.data.obtenerBuscoPostUser)
    );
  };
}

const obtenerBuscoPostsUserExito = (getPostsUser) => ({
  type: OBTENER_BUSCOPOSTS_USER_EXITO,
  payload: getPostsUser,
});

export function borrarBuscoPostsUserAction(id) {

  return async (dispatch) => {
    dispatch(obtenerBuscoPostEliminar(id))
    try {
      await clienteAxios.delete(
        `/api/buscoposts/user/${id}`,
        data
      );      

      dispatch(borrarBuscoPostsUserExito(id));

      //PONER AQUÍ LA ALERTA DE QUE SE ELIMINÓ BIEN EL PRODUCTO
      Swal.fire("Correcto", "BUSQUEDA ELIMINADA CON EXITO", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }

      );      

     
    }catch(error){
      console.log(error)
    }
  };
}

const obtenerBuscoPostEliminar = (id) => ({
  type: OBTENER_BUSCOPOST_ELIMINAR,
  payload: id,
});

const borrarBuscoPostsUserExito = (id) => ({
  type: BORRAR_BUSCOPOST_USER_EXITO,
  
});

export function obtenerBuscoPostEditarAction(postUser){


  return async (dispatch) => {
    try{      
      dispatch(obtenerBuscoPostEditarExito(postUser))   
    }catch (error) {
      console.log(error)
    }
  }
}

const obtenerBuscoPostEditarExito = (postUser) => ({
  type: OBTENER_BUSCOPOST_EDITAR_EXITO,
  payload: postUser
})

export function editarBuscoPostAction (title, description, contacto, id) {

  return async (dispatch) => {
    try {
      const editarBuscoPost = await clienteAxios.put(`api/buscoposts/user/editar/${id}`, {title, description, contacto}, data)
      dispatch(editarBuscoPostExito(editarBuscoPost))

      Swal.fire(
        "Correcto",
        "La Busqueda se editó Correctamente",
        "success"
      ).then(function() {
        //window.location.reload()})
        window.location = "/productos?busqueda=ultimos_productos&page=0"})
    }catch (error) {
      console.log(error)
    }
  }
}

const editarBuscoPostExito = (buscoPostEditado) => ({
  type: BUSCOPOST_EDITADO_EXITO,
  payload: buscoPostEditado
})