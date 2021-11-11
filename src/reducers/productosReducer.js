//IMPORTAMOS LOS TYPES

import {
  //AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  //COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  //VER_PRODUCTO_ID,
  VER_PRODUCTO_EXITO_ID,
  VER_PRODUCTO_EXITO_API_ID,
  VER_PRODUCTO_ERROR_API_ID,
  //VER_PRODUCTO_ERROR_ID,
  COMENZAR_DESCARGA_PRODUCTOS_USER,
  DESCARGA_PRODUCTOS_USER_EXITO,
  DESCARGA_PRODUCTOS_USER_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_ERROR,
  PRODUCTO_ELIMINADO_EXITO,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
  DESCARGA_PAGINAS_EXITO,
  DESCARGA_PAGINAS_USER_EXITO,
  OBTENER_CATEGORIA_EXITO,
  OBTENER_PAGINA_ACTUAL,
  DESCARGA_PRODUCTOS_AUTHOR_EXITO
} from "../types";

//CADA REDUCER TIENE SU PROPIO STATE

const initialState = {
  productos: [],
  productosAuth: [],
  error: null,
  loading: false,
  productovisionar: null,
  productoeliminiar: null,
  productoeditar: null,
  productoId: null,
  productoIdApi: null,
  paginas: null,
  paginasUser: null,
  categoria: null,
};

export default function productosReducer(state = initialState, action) {
  switch (action.type) {
    // case AGREGAR_PRODUCTO:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload],
      };
    case AGREGAR_PRODUCTO_ERROR:
    case PRODUCTO_ELIMINADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // case COMENZAR_DESCARGA_PRODUCTOS:
    //   return {
    //     ...state,
    //     loading: action.payload,
    //   };
    case DESCARGA_PRODUCTOS_EXITO:
      //console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload,
        productoIdApi: null,
        productosAuth: null,
      };
    case DESCARGA_PRODUCTOS_ERROR:
      return {
        ...state,
        loading: false,
        error401: action.payload,
      };
    case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COMENZAR_DESCARGA_PRODUCTOS_USER:
      return {
        ...state,
        loading: true,
        error: action.payload,
      };
    case DESCARGA_PRODUCTOS_USER_EXITO:
     // console.log(action.payload);
      return {
        ...state,
        loading: false,
        error: null,
        productoIdApi: null,
        prodUser: action.payload,
      };
      case VER_PRODUCTO_ERROR_API_ID:
    case DESCARGA_PRODUCTOS_USER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // case VER_PRODUCTO_ID:
    //   console.log(action.payload)
    //   return {
    //     ...state,
    //     //prodAll: null,
    //     productovisionar: action.payload,
    //   };
    case VER_PRODUCTO_EXITO_API_ID:
     // console.log(action.payload);
      return {
        ...state,
        productoIdApi: action.payload,
      };
    case VER_PRODUCTO_EXITO_ID:
     // console.log(action.payload);
      return {
        ...state,
        productoId: action.payload,
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoeliminiar: action.payload,
      };
    case PRODUCTO_ELIMINADO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          (producto) => producto.id !== state.productoeliminiar
        ),
        productoeliminiar: null,
      };
    case OBTENER_PRODUCTO_EDITAR:
     // console.log(action.payload);
      return {
        ...state,
        productoeditar: action.payload,
      };
    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        productoeditar: null,
        productos: state.productos.map((producto) =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        ),
      };

    //LLAMADO DE ESTADO DE PAGINAS PARA BUSQUEDA Y PARA USUARIO
    case DESCARGA_PAGINAS_EXITO:
     // console.log(action.payload);
      return {
        ...state,
        paginas: action.payload,
      };
      
      //GUARDAMOS Y MANTENEMOS EL NUM DE PAGINA EN EL QUE NOS ENCONTRAMOS
      case OBTENER_PAGINA_ACTUAL:
     // console.log(action.payload);
      return {
        ...state,
        paginaActual: action.payload,
      };

    case DESCARGA_PAGINAS_USER_EXITO:
     // console.log(action.payload);
      return {
        ...state,
        paginasUser: action.payload,
      };

    //PARA CONTROLAR DE FORMA GLOBAL LA CATEGORIA.
    case OBTENER_CATEGORIA_EXITO:
     // console.log(action.payload);
      return {
        ...state,
        productoIdApi: null,
        categoria: action.payload,
      };

      case DESCARGA_PRODUCTOS_AUTHOR_EXITO:
      //  console.log(action.payload);
        return {
          ...state,
          productosAuth: action.payload,
          //productoIdApi: null

        }

    default:
      return state;
  }
}
