import {
  //AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  //COMENZAR_DESCARGA_PRODUCTOS,
 // DESCARGA_PRODUCTOS_ERROR,
  DESCARGA_PRODUCTOS_EXITO,
 // VER_PRODUCTO_ID,
  VER_PRODUCTO_EXITO_ID,
  VER_PRODUCTO_EXITO_API_ID,
  VER_PRODUCTO_ERROR_API_ID,
  // VER_PRODUCTO_ERROR_ID,
  COMENZAR_DESCARGA_PRODUCTOS_USER,
  DESCARGA_PRODUCTOS_USER_EXITO,
  DESCARGA_PRODUCTOS_USER_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  //COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
  DESCARGA_PAGINAS_EXITO,
  DESCARGA_PAGINAS_USER_EXITO,
  OBTENER_CATEGORIA_EXITO,
  OBTENER_PAGINA_ACTUAL,
  DESCARGA_PRODUCTOS_AUTHOR_EXITO
} from "../types";

import {  
  LOGIN_FAIL,
  
} from '../actions/types'

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";


const user = JSON.parse(localStorage.getItem("userToken"));
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CREAR NUEVOS PRODUCTOS
export function crearNuevoProductoAction(producto, history) { 
  
  return async (dispatch) => {
    //dispatch(agregarProducto());
    try {
      //INSERTAR EN LA API
      await clienteAxios.post("/api/productos", producto, data);
      //SI TODO VA BIEN, SE ACTUALIZA EL STATE

      dispatch(agregarProductoExito(producto));      

      //PONER AQUÍ LA ALERTA DE QUE SE CREO BIEN EL PRODUCTO

      await Swal.fire(
        "Correcto",
        "El Producto se subió Correctamente",
        "success"
      ).then(function() {       
        window.location = "/productos?busqueda=ultimos_productos&page=0"
      });

      
    } catch (error) {      
      dispatch(agregarProductoError(true));
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo ha fallado! Vuelve a intentarlo en unos minutos",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/productos?busqueda=ultimos_productos&page=0');
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
export function obtenerProductosAction(busqueda, pageNumber) {   
  return async (dispatch) => {   
    try {      
      const productosAll = await clienteAxios.get(`/api/productos?busqueda=${busqueda}&page=${pageNumber}`);
      dispatch(descargarProductosExito(productosAll.data.prodAll));
      dispatch(descargarPaginasProductosExito(productosAll.data.totalPages))    
    } catch (error) {      
      if(error.response.status === 401){
        console.log('estamos sin TOKEN');
        console.log('hemos cerrado'); 
        dispatch(descargarProductosError401(error.response.data))  
      }                  
    } 
  };
}


const descargarProductosExito = (prodAll) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: prodAll,
});

const descargarProductosError401 = () => ({
  type: LOGIN_FAIL,  
});

const descargarPaginasProductosExito = (paginas) => ({
  type: DESCARGA_PAGINAS_EXITO,
  payload: paginas,
});

/////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//DESCARGAR PRODUCTOS USUARIO
export function obtenerProductosActionUser(pageNuser) { 
  return async (dispatch) => {
    dispatch(descargarProductosUser());
    try {
      const respuestaUser = await clienteAxios.get(`/api/productos/user?=${pageNuser}`, data);
      const productosUser = respuestaUser.data.prodUser;
      const paginasUser = respuestaUser.data.totalPagesUs;     
      dispatch(descargarProductosUserExito(productosUser));
      dispatch(descargarPaginasUserExito(paginasUser))      
    } catch (error) {
      console.log(error);
      dispatch(descargarProductosUserError(error));
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

const descargarPaginasUserExito = (paginas) => ({
  type: DESCARGA_PAGINAS_USER_EXITO,
  payload: paginas,
});

const descargarProductosUserError = (error) => ({
  type: DESCARGA_PRODUCTOS_USER_ERROR,
  payload: error
})
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export function obtenerProductoIdApiAction(productoid) {
  return  async (dispatch) => {
    try{
      const productoIdApi =  await clienteAxios.get(`/api/productos/${productoid}`)     

      dispatch(obtenerProductoIdApiExito(productoIdApi.data.productoId));
    }
    catch(error){
      console.log(error)
      dispatch(obtenerProductoIdeApiError(error))
    }     
  };
}

const obtenerProductoIdApiExito = (productoApi) => ({
  type: VER_PRODUCTO_EXITO_API_ID,
  payload: productoApi,
});

const obtenerProductoIdeApiError =(error)=> ({
  type: VER_PRODUCTO_ERROR_API_ID

})

//VER UN SOLO PRODUCTO
//NO USAMOS TRY CATCH, EL PRODUCTO YA ESTÁ EN MEMORIA, NO LLAMAMOS A LA API
export function obtenerProductoIdAction(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoIdExito(producto));    
  };
}


const obtenerProductoIdExito = (producto) => ({
  type: VER_PRODUCTO_EXITO_ID,
  payload: producto,
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//SELECCIONAR Y ELIMINAR PRODUCTO

export function borrarProductoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerProductoEliminar(id)); 
    try {
      await clienteAxios.delete(
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
//NO USAMOS TRY CATCH, EL PRODUCTO YA ESTÁ EN MEMORIA, NO LLAMAMOS A LA API
export function obtenerProductoEditarActionUser(producto) {
  return  (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
    // try {
    //   const respuesta = await clienteAxios.get(
    //     `/api/productos/user/editar/${producto._id}`,
    //     data
    //   );
    //   dispatch(obtenerProductoEditar(respuesta.data.producto));
    //   console.log(respuesta.data.producto)
    // } catch (error) {
    //   console.log(error);
    //   dispatch(descargarProductosError());
    // }   
  };
}
const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//////////////////////////////////////////////////
//EDITAR EL PRODUCTO /////
export function editarProductoAction(producto, id) {
  producto.getAll('images');
  return async (dispatch) => {   
    try {
     await clienteAxios.put(
        `/api/productos/user/editar/${id}`,
        producto,
        data
      );      
      dispatch(editarProductoUserExito(producto));

      Swal.fire(
        "Correcto",
        "El Producto se editó Correctamente",
        "success"
      ).then(function() {        
        window.location = "/productos?busqueda=ultimos_productos&page=0"})      
    } catch (error) {
      console.log(error);
      dispatch(editarProductoUserError());
    }
  };
}

const editarProductoUserExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoUserError = (estado) => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: estado,
});

export function obtenerCategoriaActions (categoria) {
  return (dispatch) => {
    dispatch(obtenerCategoriaExito(categoria));
  };

}

const obtenerCategoriaExito = (categoria) => ({
  type: OBTENER_CATEGORIA_EXITO,
  payload: categoria
})

export function obtenerPaginaAction (pagina){  
  return (dispatch) => {
    dispatch(obtenerPaginaActual(pagina))
  }
}

const obtenerPaginaActual = (pagina) => ({
  type: OBTENER_PAGINA_ACTUAL,
  payload: pagina

} )

/////////
///////////////////////
// DESCARGAR TODOS LOS PRODUCTOS DE UN USUARIO
/////////
///////////////////////
/////////
///////////////////////
export function obtenerProductosActionAuthor(authId) { 
  return async (dispatch) => {    
    try { 
             
      const productosAuthor = await clienteAxios.get(`/api/productos/auth/${authId}`);   


      dispatch(descargarProductosAuthorExito(productosAuthor.data.prodAuth));
   
    } catch (error) {      
      if(error.response.status === 401){        
        dispatch(descargarProductosAuthorError(error.response.data))  
      }                  
    } 
  };
}
const descargarProductosAuthorExito = (prodAuth) => ({
  type: DESCARGA_PRODUCTOS_AUTHOR_EXITO,
  payload: prodAuth,
});

const descargarProductosAuthorError = () => ({
  type: LOGIN_FAIL,  
});

