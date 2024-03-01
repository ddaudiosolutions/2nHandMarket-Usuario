import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ProductService from '../services/product.service';
import Swal from 'sweetalert2';

const initialState = {
  productos: [],
  productoId: undefined,
  productsAuth: undefined,
  productosUser: undefined,
  productToEdit: undefined,
  productsByWords: [],
};

export const obtenerProductos = createAsyncThunk(
  'getProducts / GET',
  async (pageAndData, { rejectedWithValue }) => {
    try {
      const products = await ProductService.obtenerCategoriaActions(pageAndData);
      return products;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const crearNuevoProducto = createAsyncThunk(
  'newProduct / POST',
  async (productData, { rejectedWithValue }) => {
    try {
      const products = await ProductService.crearNuevoProductoAction(productData);
      return products;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosUser = createAsyncThunk(
  'getProductsUser / GET',
  async (pageNuser, { rejectedWithValue }) => {
    try {
      const products = await ProductService.obtenerProductosUser(pageNuser);
      return products;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductoIdApi = createAsyncThunk(
  'getProductsId / GET',
  async (productoid, { rejectedWithValue }) => {
    console.log(productoid);
    try {
      const producto = await ProductService.obtenerProductoIdApi(productoid);
      console.log('obtenerProductoIdApi', producto);
      return producto;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosAuthor = createAsyncThunk(
  'getAuthorProducts / GET',
  async (authorId, { rejectedWithValue }) => {
    console.log(authorId);
    try {
      const producto = await ProductService.obtenerProductosAuthor(authorId);
      console.log(producto);
      return producto;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const obtenerProductosPorPalabras = createAsyncThunk(
  'obtenerProductosPorPalabras / POST',
  async (words, { rejectedWithValue }) => {
    console.log('words', words);
    try {
      const productosByWords = await ProductService.obtenerProductosPorPalabras(words);
      console.log(productosByWords);
      return productosByWords;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const editarProducto = createAsyncThunk(
  'editProduct / PUT',
  async (productData, { rejectedWithValue }) => {
    console.log(productData);
    try {
      const producto = await ProductService.editarProducto(productData);
      console.log(producto);
      return producto;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const borrarProducto = createAsyncThunk(
  'deleteProduct / DELETE',
  async (id, { rejectedWithValue }) => {
    try {
      const products = await ProductService.borrarProducto(id);
      return products;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const sendMailPegatinas = createAsyncThunk(
  'sendMailToUser / POST',
  async (emailData, { rejectedWithValue }) => {
    try {
      const sendMailToUser = await ProductService.sendMailPegatinas(emailData);
      return sendMailToUser;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const changeReservedProductState = createAsyncThunk(
  'changleReservedState / POST',
  async (reservedData, { rejectedWithValue }) => {
    try {
      const reservedState = await ProductService.editReservedState(reservedData);
      return reservedState;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

export const changeVendidoProductState = createAsyncThunk(
  'changVendioState / POST',
  async (vendidoData, { rejectedWithValue }) => {
    try {
      const vendidoState = await ProductService.editVendidoState(vendidoData);
      return vendidoState;
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  }
);

const productsSlices = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductId: (state, action) => {
      state.productoId = action.payload;
    },
    setProductToEdit: (state, action) => {
      state.productToEdit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(obtenerProductos.fulfilled, (state, action) => {
      console.log(action.payload);
      state.productos = action.payload.data;
    });
    builder.addCase(crearNuevoProducto.pending, (state, action) => {
      Swal.fire('Subiendo Producto');
      Swal.showLoading();
    });
    builder.addCase(crearNuevoProducto.fulfilled, (state, action) => {
      Swal.fire('Correcto', 'PRODUCTO CREADO CON EXITO', 'success').then(function () {
        window.location = '/';
      });
    });
    builder.addCase(obtenerProductosUser.fulfilled, (state, action) => {
      state.productosUser = action.payload.data.prodUser;
    });
    builder.addCase(obtenerProductosAuthor.fulfilled, (state, action) => {
      state.productsAuth = action.payload.data.prodAuth;
    });

    builder.addCase(obtenerProductosPorPalabras.fulfilled, (state, action) => {
      console.log('productos por palabras', action.payload.data.prodByWords);
      state.productsByWords = action.payload.data.prodByWords;
    });

    builder.addCase(obtenerProductoIdApi.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.productoId = action.payload.data;
    });

    builder.addCase(borrarProducto.fulfilled, (state, action) => {
      Swal.fire('Correcto', 'PRODUCTO ELIMINADO CON EXITO', 'success');
    });
    builder.addCase(editarProducto.pending, (state, action) => {
      Swal.fire('Subiendo Producto Editado');
      Swal.showLoading();
    });
    builder.addCase(editarProducto.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'Producto Editado con Exito', 'success').then(function () {
          window.location = `/`;
        });
      }
    });
    builder.addCase(sendMailPegatinas.pending, (state, action) => {
      console.log('sendMailPegatinas', action.payload);
      Swal.fire('Enviando Email....');
      Swal.showLoading();
    });
    builder.addCase(sendMailPegatinas.fulfilled, (state, action) => {
      console.log('sendMailPegatinas', action.payload);
      state.statusSendEmail = action.payload.status;
      if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El email se ha enviado Correctamente', 'success').then(function () {
          window.location = '/';
        });
      }
    });
    builder.addCase(changeReservedProductState.fulfilled, (state, action) => {
      console.log('changeReservedProductState', action.payload);
      state.statusChangeReserved = action.payload.status;
      /* if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El estado del producto ha cambiado', 'success').then(function () {
          window.location = '/';
        });
      } */
    });
    builder.addCase(changeVendidoProductState.fulfilled, (state, action) => {
      console.log('changeVendidoProductState', action.payload);
      state.changeVendidoProductState = action.payload.status;
      /* if (action.payload.status === 200) {
        Swal.fire('Correcto', 'El estado del producto ha cambiado', 'success').then(function () {
          window.location = '/';
        });
      } */
    });
  },
});

export const { setProductId, setProductToEdit } = productsSlices.actions;
const { reducer } = productsSlices;
export default reducer;
