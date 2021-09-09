import Swal from 'sweetalert2';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    
}from '../types'

import { SET_MESSAGE } from './types';

import AuthService from '../services/auth.service';
//import { response } from 'express';

export const registroActions = (nombre, email, password) => (dispatch) =>{
    return AuthService.resgistroUsuario(nombre, email, password).then(
        (response) => {
            dispatch({
              type: REGISTER_SUCCESS,
              payload: response.data
            });

            Swal.fire(
              'Correcto',
              'El Usuario se ha creado Correctamente',
              'success'
            ).then(function() {
              window.location = "/login"})
        // dispatch({
        //     type: SET_MESSAGE,
        //     payload: response.data.message,
        // });

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
          type: REGISTER_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
};