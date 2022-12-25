import { configureStore } from "@reduxjs/toolkit";
import chatSliceReducer from './slices/chatSlice';
import productosReducer from './reducers/productosReducer'
import buscopostsReducer from './reducers/buscoPostReducer'
import authReducer from './reducers/auth'
import alertaReducer from './reducers/alertaReducer'
import messageReducer from './reducers/message'
import loginReducer from './slices/authSlice'
import roomsReducer from './slices/roomsSlice'



const store = configureStore({
  reducer: { 
    productos: productosReducer,
    buscoposts: buscopostsReducer,
    auth: authReducer,
    alerta: alertaReducer,
    message: messageReducer,
    chatSlice: chatSliceReducer,
    user: loginReducer,
    rooms: roomsReducer
  }
  
});

export default store;
