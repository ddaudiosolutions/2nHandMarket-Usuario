import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BuscoPostService from '../services/buscoPosts.service';
import Swal from 'sweetalert2';

const initialState = {
  buscoPosts: [],
  setPostId: undefined,
  postToEdit: undefined,
  postsUser: undefined,
}

export const obtenerBuscoPosts = createAsyncThunk(
  'getAllBuscoPosts / GET ',
  async (data, { rejectedWithValue }) => {
    try {
      const buscoPosts = await BuscoPostService.obtenerBuscoPostActions(data);
      return buscoPosts
    } catch (error) {
      throw rejectedWithValue(error.message);
    }
  });

export const crearNuevoBuscoPostActions = createAsyncThunk(
  'NewBuscoPostActions / POST',
  async (newPostData, { rejectedWithValue }) => {
    try {
      const newBuscoPost = await BuscoPostService.crearNuevoBuscoPostActions(newPostData)
      return newBuscoPost;
    } catch (error) {
      throw rejectedWithValue(error.message)
    }
  }
);

export const obtenerBuscoPostIdApiAction = createAsyncThunk(
  'obtenerBuscoPostIdApiAction / GET',
  async (buscoPost_id, { rejectedWithValue }) => {
    try {
      const getBuscoPostId = await BuscoPostService.obtenerBuscoPostIdApiAction(buscoPost_id)
      return getBuscoPostId;
    } catch (error) {
      throw rejectedWithValue(error.message)
    }
  }
);

export const obtenerBuscoPostsUserAction = createAsyncThunk(
  'obtenerBuscoPostsUserAction / GET',
  async (id, { rejectedWithValue }) => {
    try {
      const getBuscoPostUser = await BuscoPostService.obtenerBuscoPostsUserAction(id)
      return getBuscoPostUser;
    } catch (error) {
      throw rejectedWithValue(error.message)
    }
  }
);

export const borrarBuscoPostsUserAction = createAsyncThunk(
  'deleteBuscoPost /  DELETE',
  async (id, { rejectedWithValue }) => {
    try {
      const deleteBuscoPost = await BuscoPostService.borrarBuscoPostsUserAction(id)
      return deleteBuscoPost;
    } catch (error) {
      throw rejectedWithValue(error.message)
    }
  }
);

export const editarBuscoPostAction = createAsyncThunk(
  'editarBuscoPost / PUT',
  async (editPostData, { rejectedWithValue }) => {
    try {
      const deleteBuscoPost = await BuscoPostService.editarBuscoPostAction(editPostData)
      return deleteBuscoPost;
    } catch (error) {
      throw rejectedWithValue(error.message)
    }
  }
);

const buscoPostsSlices = createSlice({
  name: 'buscoPosts',
  initialState,
  reducers: {
    setPostId: (state, action) => {
      state.setPostId = action.payload
    },
    setPostToEdit: (state, action) => {
      state.postToEdit = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(obtenerBuscoPosts.fulfilled, (state, action) => {
      return action.payload.data
    });
    builder.addCase(crearNuevoBuscoPostActions.fulfilled, (state, action) => {
      Swal.fire("Correcto", "POST CREADO CON EXITO", "success")
        .then(function () {
          window.location = "/"
        })
    });
    builder.addCase(obtenerBuscoPostIdApiAction.fulfilled, (state, action) => {
      return action.payload.data
    });
    builder.addCase(obtenerBuscoPostsUserAction.fulfilled, (state, action) => {
      state.postsUser = action.payload.data.obtenerBuscoPostUser
    });
    builder.addCase(borrarBuscoPostsUserAction.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(editarBuscoPostAction.fulfilled, (state, action) => {
      return action.payload
    });

  }
})

export const { setPostId, setPostToEdit } = buscoPostsSlices.actions;
const { reducer } = buscoPostsSlices;
export default reducer



