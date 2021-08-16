/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "http://localhost:4000/api/auth"; //nombramos con una variable la dirección de la API que nos lleva al servidor de donde sacar los datos


//CON UNA FUNCIO ASYNC LLAMAMOS AL SERVIDOR PARA RECUPERAR LOS DATOS PARA HACER EL LOGIN
const login = async (username, password) => {
  const response = await axios
    .post(API_URL, {
      username,
      password,
    });
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  logout,
};
