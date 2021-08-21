import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  VER_PRODUCTO,
  VER_PRODUCTO_EXITO,
  VER_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS_USER,
  DESCARGA_PRODUCTOS_USER_EXITO,
  DESCARGA_PRODUCTOS_USER_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";


import clienteAxios from "../config/axios";

import Swal from 'sweetalert2';


const user = JSON.parse(localStorage.getItem('user'));
const data = {
  headers: {
    'x-auth-token': user,
    'content-type': 'application/json'
  }
}
console.log(user)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto) {
  return async (dispatch) => {
    dispatch(agregarProducto());

    try {
      //INSERTAR EN LA API
      await clienteAxios.post("/api/productos", producto, data);
      //console.log(respuestaPost);
      //SI TODO VA BIEN, SE ACTUALIZA EL STATE
      dispatch(agregarProductoExito(producto));
     
      //PONER AQUÍ LA ALERTA DE QUE SE CREO BIEN EL PRODUCTO
      Swal.fire(
        'Correcto',
        'El Producto se subió Correctamente',
        'success'
      )
      
      console.log(producto)
    } catch (error) {
      console.log(error);
      dispatch(agregarProductoError(true));
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

//SI EL PRODUCTO SE GUARDA EN LA BBDD
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

//SI HUBO UN ERROR CON EL PRODUCTO
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BBDD
export function obtenerProductosAction() {
  return async (dispatch) => {
    dispatch(descargarProductos());
    try {
      const respuesta = await clienteAxios.get("/api/productos", data);
      dispatch(descargarProductosExito(respuesta.data));
      //console.log(respuesta)
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
  };
}

const descargarProductos = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductosExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargarProductosError = (error) => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: error,
});

//DESCARGAR PRODUCTOS USUARIO
export function obtenerProductosActionUser() {
  return async (dispatch) => {
    dispatch(descargarProductosUser());
    try {
      const respuesta = await clienteAxios.get("/api/productos/user", data);
      dispatch(descargarProductosUserExito(respuesta.data));
      //console.log(respuesta)
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
  };
}

const descargarProductosUser = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS_USER,
  payload: true,
});

const descargarProductosUserExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_USER_EXITO,
  payload: productos,
});

//VER UN SOLO PRODUCTO
export function obtenerProductoIdAction(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoId(producto));
  };
}
const obtenerProductoId = (producto) => ({
  type: VER_PRODUCTO,
  payload: producto,
});

//SELECCIONAR Y ELIMINAR PRODUCTO

export function borrarProductoAction(id) {
  
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    //console.log(id)
    
    try {
      const resultado = await clienteAxios.delete(`/api/productos/user/${id}`, data);
      dispatch(eliminarProductoExito(id))

      //PONER AQUÍ LA ALERTA DE QUE SE ELIMINÓ BIEN EL PRODUCTO
      Swal.fire(
        'Correcto',
        'PRODUCTO ELIMINADO CON EXITO',
        'success'
      ).then((result)=> {
        if(result.isConfirmed){
          window.location.reload()          
        }
      })
     
      console.log(resultado)
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  }
}

 const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id
})

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO
})

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true
})

//COLOCAR PRODUCTO EN EDICIÓN
export function obtenerProductoEditarActionUser(producto) {
  return async (dispatch) => {
    dispatch (obtenerProductoEditarUser(producto))
  }
}

const obtenerProductoEditarUser = producto => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto
})

export function editarProductoActionUser(producto){
  return async (dispatch) => {
    dispatch (editarProductoUser());

    try {
        await clienteAxios.put(`/api/productos/editar/${producto.id}`, producto, data )       
       dispatch(editarProductoUserExito(producto))      
    } catch (error) {
      console.log(error)
      dispatch(editarProductoUserError())
      
    }
  }
}

const editarProductoUser = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
})

const editarProductoUserExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto
})

const editarProductoUserError = () => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: true
})