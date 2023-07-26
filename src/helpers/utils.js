import { obtenerProductosAuthor } from '../slices/productSlice';
import { obtenerBuscoPostsUserAction } from '../slices/buscoPostSlice';

export const cargarProductosAuthor = (dispatch, history, post) => {
  dispatch(obtenerProductosAuthor(post.author._id));
  dispatch(obtenerBuscoPostsUserAction(post.author._id));
  history.push(`/productos/auth/${post.author._id}`);
};
