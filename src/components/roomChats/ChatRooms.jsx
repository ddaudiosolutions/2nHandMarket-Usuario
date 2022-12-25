import React, { useEffect, useState } from 'react';
import { initiateSocket, disconnectSocket,
  subscribeToChat, sendMessage } from './chatFunctions';
import ChatBody from '../chat/ChatBody';
import '../chat/ChatPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { getChatRoomById, createChatRoom } from '../../slices/roomsSlice';

function ChatRooms(props) { 
  const user = JSON.parse(sessionStorage.getItem('userName'))  
  const productoImage = useSelector(state => state.productos.productoIdApi.images[0].url); 
  console.log(productoImage)
  const rooms = useSelector(state => state.rooms.rooms.title);
  const [image, setImage] = useState (productoImage)
  const [room, setRoom] = useState(rooms);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
 

  useEffect(() => {    
    setRoom(rooms) 
    setImage(productoImage)  
    if (room) initiateSocket(room);
    subscribeToChat((err, data) => {      
      if(err) return;
      setChat(oldChats =>[...oldChats, data])
    });
    return () => {
      disconnectSocket();
    }
  }, [room, rooms, productoImage]);

return (
    <div>
      <h1>Room: {room} </h1>      
      <ChatBody chat={chat} user={user}/>
      <div className="chat__footer">
        <input 
        className='message'
        type="text" 
        name="name" 
        value={message}
        onChange={e => setMessage(e.target.value)} 
        />
      <button className="sendBtn ms-3 rounded" onClick={()=> sendMessage(room, message, user)}>Send</button>
      </div>
    </div>
  );
}
export default ChatRooms;