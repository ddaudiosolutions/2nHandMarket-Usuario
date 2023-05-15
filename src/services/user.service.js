import axios from '../config/axios';


const user = JSON.parse(localStorage.getItem("userToken"));
const data = {
  headers: {
    "x-auth-token": user,
  },
  //body: {imagenData},
};

const getAll = () => {
    return axios.get('users');
};
const getUser = id => {
    return axios.get(`users/${id}`, data);
  };
  const create = data => {
    return axios.post(`users`, data);
  };
  const update = (id, data) => {
    return axios.put(`users/edit/${id}`, data);
  };
  const remove = id => {
    return axios.delete(`users/${id}`);
  };

const UsersService = {
    getAll,    
    getUser,
    create,
    update,
    remove, 
};

export default UsersService;