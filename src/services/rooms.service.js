/* eslint-disable import/no-anonymous-default-export */

import clienteAxios from "../config/axios";

const user = JSON.parse(sessionStorage.getItem("userToken"));
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};

// const createNewChatRoom = (user1, product, user2) => { 
//   console.log(user1, product, user2) 
//   const title = `${user1}_${product}_${user2}`
//   return clienteAxios.post("/api/rooms", {user1, product, user2, title}, data )     
// }

const getOrCreateRoom = (user1, product, user2) => {   
  const title = `${user1}_${product}_${user2}`
  return clienteAxios.post("/api/rooms", {user1, product, user2, title}, data )  
 
}

const getChatRoomById = (user1, product, user2) => {
  const title = `${user1}_${product}_${user2}`
  return clienteAxios.get(`/api/rooms?title=${title}`, data ) 
 
}

const getChatRoomByTitle = (title) => {  
  return clienteAxios.get(`/api/rooms?title=${title}`, data ) 
 
}

const getChatRoomsByUser = (user) => { 
  console.log(user.userId)
  return clienteAxios.get(`/api/rooms/buzon?user=${user.userId}`, data )  
 
}

const RoomsService = {
 // createNewChatRoom,
 getOrCreateRoom, 
 getChatRoomById,
 getChatRoomsByUser,
 getChatRoomByTitle
}

export default RoomsService

