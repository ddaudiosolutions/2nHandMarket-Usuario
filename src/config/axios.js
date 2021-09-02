import axios from 'axios'

const clienteAxios = axios.create({
    headers:{},
    baseURL: process.env.REACT_APP_BACKEND_URL,
})

export default clienteAxios;