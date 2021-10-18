/* eslint-disable import/no-anonymous-default-export */

//import clienteAxios from "../config/axios";


//ACCESO LOGIN

// const loginUsuario = (email, password) => {
//   return clienteAxios
//     .post('/api/auth', {
//       email,
//       password,
//     })
//     .then((response) => {
//       if (response.data.token) {
//         localStorage.setItem("userN", JSON.stringify(response.data.nombre))
//         localStorage.setItem("user", JSON.stringify(response.data.token));
//         localStorage.setItem('userId', response.data.id)        
//       }

//       return response.data;
//     })
    
// };

//BORRAR LOGIN
const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId")
};

export default {
 // resgistroUsuario,
  //loginUsuario,
  //login,
  logout,
};
