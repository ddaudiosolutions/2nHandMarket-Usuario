import { obtenerProductosAuthor } from '../slices/productSlice';
import { obtenerBuscoPostsUserAction } from '../slices/buscoPostSlice';

export const cargarProductosAuthor = (dispatch, history, post) => {
  dispatch(obtenerProductosAuthor(post.author._id));
  dispatch(obtenerBuscoPostsUserAction(post.author._id));
  history.push(`/productos/auth/${post.author._id}`);
};

export const extraerIdDeURL = (url) => {
  // Buscar la última barra en la URL para encontrar el inicio del ID
  const ultimaBarraIndex = url.lastIndexOf('/');
  
  // Extraer la subcadena que contiene el ID
  const id = url.substring(ultimaBarraIndex + 1);
  
  return id;
};
