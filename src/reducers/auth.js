import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    
  } from "../types";
  import {
    LOGIN_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
  } from '../actions/types'
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const initialState =  user
    ? { isLoggedIn: true, user}
    : { isLoggedIn: false, user: null }
  
  export default function autor (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        //console.log(action.payload)
        return {
          ...state,
          //isLoggedIn: true,
        };
      case REGISTER_FAIL:
        console.log(action.payload)
        return {
          ...state,
          isLoggedIn: false,
          message: action.payload
        };
      case LOGIN_SUCCESS:
        console.log(payload.user)
        return {
          ...state,
          isLoggedIn: true,
          user: payload.user,
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
          user: null,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      default:
        return state;
    }
  }
  