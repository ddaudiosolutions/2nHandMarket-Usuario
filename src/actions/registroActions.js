import Swal from 'sweetalert2';
import clienteAxios from '../config/axios'
import {
    REGISTER_SUCCESS,
    //REGISTER_FAIL,
    
}from '../types'

//import { SET_MESSAGE } from './types';

//import AuthService from '../services/auth.service';
//import { response } from 'express';


export function registroActions(nombre, email, password) {
  console.log(nombre, email, password)
  return  async (dispatch) => {
    try {
      const registroUsuario = await clienteAxios.post('/api/usuarios', {
          nombre,
          email,
          password,
        });
        dispatch(registroExito(registroUsuario.data))        

        Swal.fire(
          'Correcto',
          'El Usuario se ha creado Correctamente',
          'success'
        ).then(function() {
          window.location = "/login"})      
    return Promise.resolve();
      } catch(error){
        console.log(error)
      }
    }
  }

  const registroExito = (registroUsuario) => ({
    type: REGISTER_SUCCESS,
    payload: registroUsuario
  })

// export const registroActions = (nombre, email, password) => 
//   (dispatch) =>{


//     return AuthService.resgistroUsuario(nombre, email, password).then(
//         (response) => {
//             dispatch({
//               type: REGISTER_SUCCESS,
//               payload: response.data
//             });

//             Swal.fire(
//               'Correcto',
//               'El Usuario se ha creado Correctamente',
//               'success'
//             ).then(function() {
//               window.location = "/login"})      
//         return Promise.resolve();
//     },
//     (error) => {
//         const message =
//           (error.response &&
//             error.response.data &&
//             error.response.data.message) ||
//           error.message ||
//           error.toString();
  
//         dispatch({
//           type: REGISTER_FAIL,
//           payload: message
//         });
  
//         dispatch({
//           type: SET_MESSAGE,
//           payload: message,
//         });
  
//         return Promise.reject();
//       }
//     );
// };