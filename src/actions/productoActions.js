import {
  //AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  //COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
  VER_PRODUCTO_ID,
  VER_PRODUCTO_EXITO_ID,
  // VER_PRODUCTO_ERROR_ID,
  COMENZAR_DESCARGA_PRODUCTOS_USER,
  DESCARGA_PRODUCTOS_USER_EXITO,
  //DESCARGA_PRODUCTOS_USER_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

const user = JSON.parse(localStorage.getItem("user"));
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};

//console.log(user)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto, history) {
  //console.log(producto)
  // for(let value of producto){
  //   console.log(value)
  // }
  return async (dispatch) => {
    //dispatch(agregarProducto());
    try {
      //INSERTAR EN LA API
      const respuesta = await clienteAxios.post("/api/productos", producto, data);
      //SI TODO VA BIEN, SE ACTUALIZA EL STATE
      dispatch(agregarProductoExito(producto));
      console.log(respuesta)
      //PONER AQUÍ LA ALERTA DE QUE SE CREO BIEN EL PRODUCTO

      await Swal.fire(
        "Correcto",
        "El Producto se subió Correctamente",
        "success"
      ).then(function() {
        window.location = "/productos"});

      //console.log(producto)
    } catch (error) {
      console.log(error.response.data.errors);
      dispatch(agregarProductoError(true));
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo ha fallado! Vuelve a intentarlo en unos minutos",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/productos");
        }
      });
    }
  };
}

//SI EL PRODUCTO SE GUARDA EN LA BBDD
const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto, //ESTO ES LO QUE PASAMOS AL REDUCER QUE SE PASARÁ COMO NUEVO STATE PARA EL COMPONENTE
});

//SI HUBO UN ERROR CON EL PRODUCTO
const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BBDD
export function obtenerProductosAction(busqueda) {
  console.log(busqueda)
  return async (dispatch) => {
    //dispatch(descargarProductos());
    try {
      
      const productosAll = await clienteAxios.get(`/api/productos/${busqueda}`,  data);
      dispatch(descargarProductosExito(productosAll.data.prodAll));
      console.log(productosAll.data.prodAll);
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
  };
}

// const descargarProductos = () => ({
//   type: COMENZAR_DESCARGA_PRODUCTOS,
//   payload: true,
// });

const descargarProductosExito = (prodAll) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: prodAll,
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
      const respuestaUser = await clienteAxios.get("/api/productos/user", data);
      const productosUser = respuestaUser.data.prodUser;
      dispatch(descargarProductosUserExito(productosUser));
      console.log(productosUser);
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

const descargarProductosUserExito = (prodUser) => ({
  type: DESCARGA_PRODUCTOS_USER_EXITO,
  payload: prodUser,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//VER UN SOLO PRODUCTO
export function obtenerProductoIdAction(producto) {
  return async (dispatch) => {
    dispatch(obtenerProductoIdExito(producto));
    try {
      // const respuestaprodId = await clienteAxios.get(
      //   `/api/productos/${producto._id}`,
      //   data
      // );
      // console.log(respuestaprodId.data.productoId)
      // await dispatch(obtenerProductoIdExito(respuestaprodId.data.productoId));
      //console.log(respuestaprodId.data.productoId);
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
  };
}
const obtenerProductoId = (producto) => ({
  type: VER_PRODUCTO_ID,
  payload: producto,
});

const obtenerProductoIdExito = (producto) => ({
  type: VER_PRODUCTO_EXITO_ID,
  payload: producto,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SELECCIONAR Y ELIMINAR PRODUCTO

export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id));
    //console.log(id)

    try {
      const resultado = await clienteAxios.delete(
        `/api/productos/user/${id}`,
        data
      );
      dispatch(eliminarProductoExito(id));

      //PONER AQUÍ LA ALERTA DE QUE SE ELIMINÓ BIEN EL PRODUCTO
      Swal.fire("Correcto", "PRODUCTO ELIMINADO CON EXITO", "success").then(
        (result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        }
      );

      console.log(resultado);
    } catch (error) {
      console.log(error);
      dispatch(eliminarProductoError());
    }
  };
}

const obtenerProductoEliminar = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
});

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
});

const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: true,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//COLOCAR PRODUCTO EN EDICIÓN
export function obtenerProductoEditarActionUser(producto) {
  return async (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
    try {
      const respuesta = await clienteAxios.get(
        `/api/productos/user/editar/${producto._id}`,
        data
      );
      dispatch(obtenerProductoEditar(respuesta.data.producto));
      console.log(respuesta.data.producto)
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosError());
    }
    console.log(producto);
  };
}
const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//////////////////////////////////////////////////
//EDITAR EL PRODUCTO /////
export function editarProductoAction(producto) {
  const productoId = producto.getAll("id");
  console.log(productoId);
  return async (dispatch) => {
    dispatch(editarProducto());
    try {
      const editarRespuesta = await clienteAxios.put(
        `/api/productos/user/editar/${productoId}`,
        producto,
        data
      );
      //console.log(editarRespuesta.data);
      dispatch(editarProductoUserExito(producto));

      Swal.fire(
        "Correcto",
        "El Producto se editó Correctamente",
        "success"
      ).then(function() {
        window.location = "/productos"})
      //console.log(producto);
    } catch (error) {
      console.log(error);
      dispatch(editarProductoUserError());
    }
  };
}

const editarProducto = () => ({
  type: COMENZAR_EDICION_PRODUCTO,
});

const editarProductoUserExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoUserError = (estado) => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: estado,
});
