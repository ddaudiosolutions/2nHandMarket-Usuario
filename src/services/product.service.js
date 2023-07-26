import clienteAxios from '../config/axios';

const user = sessionStorage.getItem('userToken');
const data = {
  headers: {
    'x-auth-token': user,
  },
  // body: {imagenData},
};

/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREAR NUEVOS PRODUCTOS
const crearNuevoProductoAction = (producto, history) => {
  return clienteAxios.post('productos/newproduct', producto, data);
};

// FUNCION QUE DESCARGA LOS PRODUCTOS DE LA BBDD
const obtenerCategoriaActions = (pageAndData) => {
  console.log(pageAndData);
  const { busquedaquery, pagequery } = pageAndData;
  return clienteAxios.get(`productos?busqueda=${busquedaquery}&page=${pagequery}`, data);
};

// DESCARGAR PRODUCTOS USUARIO

const obtenerProductosUser = (pageNuser) => {
  return clienteAxios.get(`productos/user?=${pageNuser}`, data);
};

const obtenerProductoIdApi = (productoid) => {
  return clienteAxios.get(`productos/${productoid}`);
};

// SELECCIONAR Y ELIMINAR PRODUCTO
const borrarProducto = (id) => {
  return clienteAxios.delete(`productos/user/${id}`, data);
};

/// ///////////////////////////////////////////////
// EDITAR EL PRODUCTO /////
const editarProducto = (productData) => {
  const { formData, id } = productData;
  return clienteAxios.put(`productos/user/editar/${id}`, formData, data);
};

/// ////////////////////
// DESCARGAR TODOS LOS PRODUCTOS DE UN USUARIO
/// //////
const obtenerProductosAuthor = (authorId) => {
  return clienteAxios.get(`productos/auth/${authorId}`);
};

const ProducServices = {
  obtenerCategoriaActions,
  obtenerProductoIdApi,
  obtenerProductosAuthor,
  obtenerProductosUser,
  borrarProducto,
  crearNuevoProductoAction,
  editarProducto,
};

export default ProducServices;
