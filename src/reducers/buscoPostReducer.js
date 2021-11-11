import {
    NUEVOBUSCOPOST_EXITO,
    OBTENER_BUSCOPOSTS_EXITO,
    VER_BUSCOPOST_EXITO_API_ID,
    OBTENER_BUSCOPOSTS_USER_EXITO,
    BORRAR_BUSCOPOST_USER_EXITO,
    OBTENER_BUSCOPOST_ELIMINAR,
    OBTENER_BUSCOPOST_EDITAR_EXITO,
    BUSCOPOST_EDITADO_EXITO
} from '../types';


const initialState ={
    buscoPosts: [],
    buscoPostIdApi: null,
    buscoPostsEliminar: null,
    buscoPostEditar: null,
}

export default function buscoPostReducer(state=initialState, action){
    switch(action.type){
        case NUEVOBUSCOPOST_EXITO:
           // console.log(action.payload);
            return{
                ...state,
                buscoPosts: [...state.buscoPosts, action.payload]
                
            }

            case OBTENER_BUSCOPOSTS_EXITO:
               // console.log(action.payload)
                return{
                    ...state,
                    buscoPosts: action.payload,
                    buscoPostIdApi: null

                }
        case VER_BUSCOPOST_EXITO_API_ID:
           // console.log(action.payload);
            return{
                ...state,
                buscoPostIdApi: action.payload
            }


        case OBTENER_BUSCOPOSTS_USER_EXITO:
            return{
                ...state,
                buscoPostsUser: action.payload
            }
        case OBTENER_BUSCOPOST_ELIMINAR:
                return{
                    ...state,
                    buscoPostsEliminar: action.payload
                }

            case BORRAR_BUSCOPOST_USER_EXITO:
               // console.log(action.payload)
                return{
                    ...state,                    
                    buscoPosts: state.buscoPosts.filter(
                        (buscoPost) => buscoPost.id !== state.buscoPostsEliminar
                      ),
                    buscoPostsEliminar: null

                }
                case OBTENER_BUSCOPOST_EDITAR_EXITO:
                 //   console.log(action.payload)
                    return {
                        ...state,
                        buscoPostEditar: action.payload
                    }
                case BUSCOPOST_EDITADO_EXITO:
                    return {
                        ...state,
                        buscoPostEditar: null,
                        buscoPosts: state.buscoPosts.map((buscoPost)=>
                            buscoPost.id === action.payload.id
                                ? (buscoPost = action.payload)
                                : buscoPost)
                    }
        default:
            return state;
    }
}
