import clienteAxios from '../config/axios';

const user = sessionStorage.getItem('userToken');
const data = {
  headers: {
    'x-auth-token': user,
  },
  // body: {imagenData},
};

const crearNuevoBuscoPostActions = (newPostData) => {
  const { title, description, contacto } = newPostData;
  return clienteAxios.post('buscoposts/newpost', { title, description, contacto }, data);
};

const obtenerBuscoPostActions = () => {
  return clienteAxios.get(`buscoposts/getallposts`, data);
};

const obtenerBuscoPostIdApiAction = (buscoPostId) => {
  return clienteAxios.get(`buscoposts/${buscoPostId}`, data);
};

const obtenerBuscoPostsUserAction = (id) => {
  return clienteAxios.get(`buscoposts/getposts/user/${id}`, data);
};

const borrarBuscoPostsUserAction = (id) => {
  return clienteAxios.delete(`buscoposts/user/${id}`, data);
};

const editarBuscoPostAction = (editPostData) => {
  const { id, title, description, contacto } = editPostData;
  return clienteAxios.put(`buscoposts/user/editar/${id}`, { title, description, contacto }, data);
};

const BuscoPostService = {
  editarBuscoPostAction,
  borrarBuscoPostsUserAction,
  obtenerBuscoPostActions,
  crearNuevoBuscoPostActions,
  obtenerBuscoPostIdApiAction,
  obtenerBuscoPostsUserAction,
};

export default BuscoPostService;
