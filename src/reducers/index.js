import {combineReducers} from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';
import auth from './auth';
import message from './message';
import buscoPostReducer from './buscoPostReducer'


export default combineReducers({
    productos: productosReducer,
    auth,
    alerta: alertaReducer,
    message,
    buscoposts: buscoPostReducer


});
