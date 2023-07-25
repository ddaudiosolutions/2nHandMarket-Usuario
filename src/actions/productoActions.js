/* 

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//COLOCAR PRODUCTO EN EDICIÓN
//NO USAMOS TRY CATCH, EL PRODUCTO YA ESTÁ EN MEMORIA, NO LLAMAMOS A LA API
export function obtenerProductoEditarActionUser(producto) {
  return (dispatch) => {
    dispatch(obtenerProductoEditar(producto));
  };
}
const obtenerProductoEditar = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
});

//////////////////////////////////////////////////
//EDITAR EL PRODUCTO /////
export function editarProductoAction(producto, id) {
  producto.getAll('images');
  return async (dispatch) => {
    try {
      await clienteAxios.put(
        `/api/productos/user/editar/${id}`,
        producto,
        data
      );
      dispatch(editarProductoUserExito(producto));

      Swal.fire(
        "Correcto",
        "El Producto se editó Correctamente",
        "success"
      ).then(function () {
        window.location = "/productos?busqueda=ultimos_productos&page=0"
      })
    } catch (error) {
      console.log(error);
      dispatch(editarProductoUserError());
    }
  };
}

const editarProductoUserExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
});

const editarProductoUserError = (estado) => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: estado,
});

export function obtenerCategoriaActions(categoria) {
  return (dispatch) => {
    dispatch(obtenerCategoriaExito(categoria));
  };

}

const obtenerCategoriaExito = (categoria) => ({
  type: OBTENER_CATEGORIA_EXITO,
  payload: categoria
})

export function obtenerPaginaAction(pagina) {
  return (dispatch) => {
    dispatch(obtenerPaginaActual(pagina))
  }
}

const obtenerPaginaActual = (pagina) => ({
  type: OBTENER_PAGINA_ACTUAL,
  payload: pagina

})

/////////
///////////////////////
// DESCARGAR TODOS LOS PRODUCTOS DE UN USUARIO
/////////
///////////////////////
/////////
///////////////////////
export function obtenerProductosActionAuthor(authId) {
  return async (dispatch) => {
    try {

      const productosAuthor = await clienteAxios.get(`/api/productos/auth/${authId}`);


      dispatch(descargarProductosAuthorExito(productosAuthor.data.prodAuth));

    } catch (error) {
      if (error.response.status === 401) {
        dispatch(descargarProductosAuthorError(error.response.data))
      }
    }
  };
}
const descargarProductosAuthorExito = (prodAuth) => ({
  type: DESCARGA_PRODUCTOS_AUTHOR_EXITO,
  payload: prodAuth,
});

const descargarProductosAuthorError = () => ({
  type: LOGIN_FAIL,
});

 */