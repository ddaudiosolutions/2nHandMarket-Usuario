/* eslint-disable import/no-anonymous-default-export */

import clienteAxios from "../config/axios";

const login = (email, password) => {
  console.log(email, password)  
  return clienteAxios.post("/api/auth", {email, password})      
}
//BORRAR LOGIN
const logout = () => {
  sessionStorage.removeItem("userToken");
  sessionStorage.removeItem("userName");
  sessionStorage.removeItem("userId")
  window.location = "/";
  
};

const AuthService = {
  login,
  logout,
}

export default  AuthService;

