
//IMPORTAMOS LOS TYPES

import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  VER_PRODUCTO,
} from "../types";

//CADA REDUCER TIENE SU PROPIO STATE

const initialState = {
  productos: [],
  error: null,
  loading: false,
  productovisionar: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: true
      }
      case AGREGAR_PRODUCTO_EXITO:
        return {
          ...state,
          loading: true,
          productos: [...state.productos, action.payload]
        }
      case AGREGAR_PRODUCTO_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload

        }
      case COMENZAR_DESCARGA_PRODUCTOS:
        return {
          ...state,
          loading: action.payload
        }
        case DESCARGA_PRODUCTOS_EXITO:
          return{
            ...state,
            loading: false,
            error: null,
            loading: action.payload
          }
          case DESCARGA_PRODUCTOS_ERROR:
            return{
              ...state,
              loading: false,
              error: action.payload
            }
            case VER_PRODUCTO:
              return{
                ...state,
                productovisionar: action.payload
              }

    default:
      return state;
  }
}
