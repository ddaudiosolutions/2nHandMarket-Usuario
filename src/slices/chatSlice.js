import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    name: '' } 

const chatSlice = createSlice({
  name: 'chatslice',
  initialState,
  reducers: {
      setName (state, action) {
          console.log(action.payload)
          state.name = action.payload
      }
  },
})

export const {setName } = chatSlice.actions
export default chatSlice.reducer