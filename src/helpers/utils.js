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
  console.log(images);
  let isPesado = false;
  for (const image of images) {
    if (image.size > 1000000) {
      isPesado = true;
      break;
    }
  }
  console.log('isPesado', isPesado);
  return isPesado;
};

/* export const sendDataNewOrEdit = (
  sendDataEditProduct,
  agregarProducto,
  images,
  imageSel,
  id,
  values
) => {
  console.log(id);
  const formData = new FormData();
  for (let j = 0; j < images.length; j++) {
    formData.append('images', images[j]);
  }
  formData.set('title', values.title);
  formData.set('categoria', values.categoria);
  formData.set('subCategoria', values.subCategoria);
  formData.set('price', values.price);
  formData.set('description', values.description);
  formData.set('contacto', values.contacto);
  formData.set('id', id);

  if (id !== null) {
    for (let i = 0; i < imageSel.length; i++) {
      formData.append('imagesDelete', imageSel[i]);
    }
    sendDataEditProduct(formData, id, history);
  } else {
    agregarProducto(formData);
  }
}; */
