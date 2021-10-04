//import Swal from 'sweetalert2';
import {    
    LOGIN_SUCCESS,
   // LOGIN_USER_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";
  
  import AuthService from "../services/auth.service";
//import clienteAxios from "../config/axios";


export const loginUsuarioActions = (email, password) => (dispatch) => {
  return AuthService.loginUsuario(email, password).then(
    (data) => {
      dispatch({        
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

// export function loginUsuarioActions (email, password) {
//   console.log(email, password)
//   return async (dispatch) => {
//     try{
//       const loginUsuario = await clienteAxios.post('/api/auth', { 
//         email,password})
//       .then((response) => {      
//         if (response.data.token) {       
//           localStorage.setItem("user", JSON.stringify(response.data))                    
//         }          
//         return response.data;
//       });
//       dispatch(loginExito(loginUsuario.data)) 
//       //console.log(loginUsuario.data)
//       const nombreUser = await clienteAxios.get('/api/auth',  data)
//         localStorage.setItem('nombreUser', nombreUser.data.user.nombre)       
//         dispatch(loginUserExito(nombreUser.data)) 
       
//     }
//     catch(error){
//       console.log(error)
//     }
//   }

// }

// const loginExito = (loginExito) => ({
//   type: LOGIN_SUCCESS,
//   payload: {user: data}
// })

// const loginUserExito = (loginUserExito) => ({
//   type: LOGIN_USER_SUCCESS,
//   payload: loginUserExito
// })

  // export const loginUsuario = (email, password) => (dispatch) => {
  //   return AuthService.loginUsuario(email, password).then(
  //     (data) => {
  //       dispatch({
  //         type: LOGIN_SUCCESS,
  //         payload: { user: data },
  //       });
        
            
  //       return Promise.resolve();
  //     },
  //     (error) => {
  //       const message =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  
  //       dispatch({
  //         type: LOGIN_FAIL,
  //       });
  
  //       dispatch({
  //         type: SET_MESSAGE,
  //         payload: message,
  //       });
  
  //       return Promise.reject();
  //     }
  //   );
  // };
  
  export const logout = () => (dispatch) => {
    AuthService.logout();
  
    dispatch({
      type: LOGOUT,
    });
  };