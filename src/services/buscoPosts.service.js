import clienteAxios from "../config/axios";
  
  
const user = JSON.parse(sessionStorage.getItem("userToken"));
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};
  
const crearNuevoBuscoPostActions = (newPostData) => { 
    const {title, description, contacto } = newPostData;
    return clienteAxios.post(
        "buscoposts/newpost",
        { title, description, contacto },
        data
      );
}

const obtenerBuscoPostActions = () => { 
    console.log('BUSCANDO POSTS')
    return clienteAxios.get(`buscoposts/getallposts`, data);
}
  
const obtenerBuscoPostIdApiAction = (buscoPost_id) => { 
    return clienteAxios.get(`buscoposts/${buscoPost_id}`, data); 
} 

const obtenerBuscoPostsUserAction = () => {
    return clienteAxios.get(`buscoposts/user`, data);   
}
  
const borrarBuscoPostsUserAction = (id) => {
    return clienteAxios.delete(`user/${id}`, data);      
}  

const editarBuscoPostAction = (editPostData) => {
    const {id, title, description, contacto } = editPostData
    return clienteAxios.put(`user/editar/${id}`, {title, description, contacto}, data)
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
  
  
  