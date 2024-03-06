import { obtenerProductosAuthor } from '../slices/productSlice';
import { obtenerBuscoPostsUserAction } from '../slices/buscoPostSlice';

export const cargarProductosAuthor = (dispatch, history, post) => {
  dispatch(obtenerProductosAuthor(post.author._id));
  dispatch(obtenerBuscoPostsUserAction(post.author._id));
  history.push(`/productos/auth/${post.author._id}`);
};

export const extraerIdDeURL = (url) => {
  const ultimaBarraIndex = url.lastIndexOf('/');
  const id = url.substring(ultimaBarraIndex + 1);
  return id;
};

export const verificarPesoImagenes = (images) => {
  let isPesado = false;
  for (const image of images) {
    if (image.size > 1000000) {
      isPesado = true;
      break;
    }
  }
  return isPesado;
};

