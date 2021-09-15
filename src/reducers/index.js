import {combineReducers} from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';
import auth from './auth';
import message from './message';



export default combineReducers({
    productos: productosReducer,
    auth,
    alerta: alertaReducer,
    message


});
