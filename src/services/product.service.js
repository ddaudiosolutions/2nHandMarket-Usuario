  import clienteAxios from "../config/axios";
  
  
  const user = JSON.parse(sessionStorage.getItem("userToken"));
  const data = {
    headers: {
      "x-auth-token": user,
    },
    //body: {imagenData},
  };
  
  
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //CREAR NUEVOS PRODUCTOS
  const crearNuevoProductoAction = (producto, history) => { 
    return clienteAxios.post("productos/newproduct", producto, data);    
  }
    
  
  //FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BBDD
  const obtenerCategoriaActions = (pageAndData) => {
    console.log(pageAndData) 
    const {busquedaquery, pagequery} = pageAndData;
    return clienteAxios.get(`productos?busqueda=${busquedaquery}&page=${pagequery}`, data)
  }  
  
 
  //DESCARGAR PRODUCTOS USUARIO

  const obtenerProductosActionUser = (pageNuser) => {
    return clienteAxios.get(`productos/user?=${pageNuser}`, data)
  }
    
  const obtenerProductoIdApiAction = (productoid) => {
    return clienteAxios.get(`productos/${productoid}`)
  }   
  
  //VER UN SOLO PRODUCTO
  //NO USAMOS TRY CATCH, EL PRODUCTO YA ESTÁ EN MEMORIA, NO LLAMAMOS A LA API

/*   export function obtenerProductoIdAction(producto) {
    return (dispatch) => {
      dispatch(obtenerProductoIdExito(producto));    
    };
  } */
 
  //SELECCIONAR Y ELIMINAR PRODUCTO
  const borrarProductoAction = (id) => {
    return clienteAxios.delete(`productos/user/${id}`, data)
}
  
 
  //////////////////////////////////////////////////
  //EDITAR EL PRODUCTO /////
  const editarProductoAction = (producto, id) => {
    return clienteAxios.put(
        `productos/user/editar/${id}`,
        producto,
        data
      );      
  }
  
  /////////
  ///////////////////////
  // DESCARGAR TODOS LOS PRODUCTOS DE UN USUARIO
  /////////
  ///////////////////////
  /////////
  ///////////////////////
  const obtenerProductosActionAuthor = (authId)  => {
    return clienteAxios.get(`productos/auth/${authId}`);
  }
  
  
  
const ProducServices = {
    obtenerCategoriaActions,
    obtenerProductoIdApiAction,
    obtenerProductosActionAuthor,
    obtenerProductosActionUser,
    borrarProductoAction,
    crearNuevoProductoAction,
    editarProductoAction
} 

export default ProducServices;