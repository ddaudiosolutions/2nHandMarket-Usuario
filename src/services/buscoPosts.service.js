import clienteAxios from "../config/axios";


const user = sessionStorage.getItem("userToken");
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};

const crearNuevoBuscoPostActions = (newPostData) => {
  console.log(newPostData)
  const { title, description, contacto } = newPostData;
  return clienteAxios.post("buscoposts/newpost", { title, description, contacto }, data);
}

const obtenerBuscoPostActions = () => {
  console.log('BUSCANDO POSTS')
  return clienteAxios.get(`buscoposts/getallposts`, data);
}

const obtenerBuscoPostIdApiAction = (buscoPost_id) => {
  return clienteAxios.get(`buscoposts/${buscoPost_id}`, data);
}

const obtenerBuscoPostsUserAction = (id) => {
  console.log(id)
  return clienteAxios.get(`buscoposts/getposts/user/${id}`, data);
}

const borrarBuscoPostsUserAction = (id) => {
  return clienteAxios.delete(`buscoposts/user/${id}`, data);
}

const editarBuscoPostAction = (editPostData) => {
  console.log(editPostData);
  const { id, title, description, contacto } = editPostData
  return clienteAxios.put(`buscoposts/user/editar/${id}`, { title, description, contacto }, data)
}

const BuscoPostService = {
  editarBuscoPostAction,
  borrarBuscoPostsUserAction,
  obtenerBuscoPostActions,
  crearNuevoBuscoPostActions,
  obtenerBuscoPostIdApiAction,
  obtenerBuscoPostsUserAction
}

export default BuscoPostService


