import clienteAxios from '../config/axios'

const checkAuth = data => {
  console.log(data)
  return clienteAxios.post(`auth/`, data);
};

const resetPassword = email => {
  console.log(email)
  return clienteAxios.post('auth/resetPassword', email);
};

const changePasswordUser = data => {
  console.log(data)
  return clienteAxios.post('auth/changePasswordUser', data);
};


const AuthServices = {
  checkAuth,
  resetPassword,
  changePasswordUser
};

export default AuthServices;