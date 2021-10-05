/* eslint-disable import/no-anonymous-default-export */

import clienteAxios from "../config/axios";

//CREAR USUARIO
// const resgistroUsuario = (nombre, email, password) => {
//   return clienteAxios.post('/api/usuarios', {
//     nombre,
//     email,
//     password,
//   });
// };

//ACCESO LOGIN

const loginUsuario = (email, password) => {
  return clienteAxios
    .post('/api/auth', {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("userN", JSON.stringify(response.data.nombre))
        localStorage.setItem("user", JSON.stringify(response.data.token));
      }

      return response.data;
    });
};

//BORRAR LOGIN
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userN");
};

export default {
 // resgistroUsuario,
  loginUsuario,
  //login,
  logout,
};
