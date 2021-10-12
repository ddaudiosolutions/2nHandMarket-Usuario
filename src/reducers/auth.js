import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    
  } from "../types";
  import {
    LOGIN_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DESCARGA_DATOS_USUARIO_EXITO,
    EDITAR_DATOS_USUARIO_EXITO,
    OBTENER_USUARIO_EDITAR,
    OBTENER_AVATAR_EXITO

  } from '../actions/types'
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState =  {
    user: user
    ? { isLoggedIn: true, user}
    : { isLoggedIn: false, user: null },
    datosUsuario: null,
    datosUsuarioEditar: null,
    avatar: null
  
  }
  
  export default function autor (state = initialState, action) {
    //const { type, payload } = action;
  
    switch (action.type) {
      case REGISTER_SUCCESS:
        //console.log(action.payload)
        return {
          ...state,
          isLoggedIn: true,
        };
      case REGISTER_FAIL:
        //console.log(action.payload)
        return {
          ...state,
          isLoggedIn: false,
          message: action.payload
        };
      case LOGIN_SUCCESS:
        console.log(action.payload)
        return {
          ...state,
          isLoggedIn: true,
          user: action.payload
        };
      case LOGIN_USER_SUCCESS:
        console.log(action.payload)
        return {
          ...state,
          nombreUser: action.payload
        }
      case LOGIN_FAIL:
        return {
          ...state,
          isLoggedIn: false,
          user: action.payload,
          
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case DESCARGA_DATOS_USUARIO_EXITO:
        console.log(action.payload)
        return{
          ...state,
          datosUsuario: action.payload,
          datosUsuarioEditar: null
        }
        case OBTENER_USUARIO_EDITAR:
        console.log(action.payload)
        return{
          ...state,
          datosUsuarioEditar: action.payload
        }

        case EDITAR_DATOS_USUARIO_EXITO:
          console.log(action.payload)
          return{
            ...state,
            datosUsuarioEditar: null,
            datosUsuario: action.payload

          }
          case  OBTENER_AVATAR_EXITO:
            console.log(action.payload)
            return{
              ...state,
              avatar: action.payload
            }
      default:
        return state;
    }
  }
  