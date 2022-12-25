import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import RoomService from '../services/rooms.service'

const initialState = { 
    rooms: [],
    userRooms: []
} 

export const createChatRoom = createAsyncThunk (
    'createChatRoom/post ',
    async (loginData) => {
        console.log(loginData)
        const {user1, product, user2} = loginData        
        try {
            const res = await RoomService.createNewChatRoom(user1, product, user2)
            console.log(res)
            return res
        } catch (error) {
            return error.response
        }
    }
)

export const getNewChatRoom = createAsyncThunk (
    'getNewChatRoom/get ',
    async (dataChatroom) => {        
        const {user1, product, user2} = dataChatroom 

        try {
            const res = await RoomService.getOrCreateRoom(user1, product, user2)
            if(res.status === 200){
                console.log(res)
                console.log('ENTRANDO PARA RECUPERAR')
               const resChat = await RoomService.getChatRoomById(user1, product, user2)
               return resChat
            }            
            return res
        } catch (error) {
            return error.response
        }
    }
)

export const getChatRoomByTitle = createAsyncThunk (
    'getChatRoomByTitle/get ',
    async (title) => { 
        console.log(title)
        try {
            const res = await RoomService.getChatRoomByTitle(title)            
            console.log(res)
            return res
        } catch (error) {
            return error.response
        }
    }
)

export const getChatRoomsByUser = createAsyncThunk (
    'getChatRoomsByUser/get ',
    async (userId) => {
        console.log(userId)
        try {
            const res = await RoomService.getChatRoomsByUser(userId)            
            console.log(res)
            return res
        } catch (error) {
            return error.response
        }
    }
)

const roomsSlice = createSlice({
  name: 'datosUsuario',
  initialState,
  reducers: {
  },
  extraReducers:{ 
    [createChatRoom.fulfilled]: (state , action) => {
        console.log(action.payload.data)
        state.rooms = action.payload.data
        
    },
    [getChatRoomByTitle.fulfilled]: (state , action) => {
        console.log(action.payload.data)
        state.rooms = action.payload.data[0]
        
    },
    [getChatRoomsByUser.fulfilled]: (state , action) => {
        console.log(action.payload.data)
        state.userRooms = action.payload.data
        
    },
    [getNewChatRoom.fulfilled]: (state , action) => {
        console.log(action.payload.data)
        state.rooms = action.payload.data[0]
        
    },
  }
})



const { reducer } = roomsSlice;

export default reducer