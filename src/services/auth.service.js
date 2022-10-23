/* eslint-disable import/no-anonymous-default-export */

//BORRAR LOGIN
const logout = () => {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userName");
  localStorage.removeItem("userId")
  window.location = "/";
  
};

export default { 
  logout,
};
