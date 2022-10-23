/* eslint-disable import/no-anonymous-default-export */

//BORRAR LOGIN
const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId")
  window.location = "/productos?busqueda=ultimos_productos&page=0";
  
};

export default { 
  logout,
};
