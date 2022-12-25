import io from 'socket.io-client';
let socket;
export const initiateSocket = (room) => {
  socket = io('http://localhost:4000');
  console.log(`Connecting socket...`);
  if (socket && room) socket.emit('join', room);
}
export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}
export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('chat', (msg, user) => {
    console.log(msg)
    console.log(user)
    console.log('Websocket event received!');
    return cb(null, {msg: msg, user: user});
  });
}
export const sendMessage = (room, message, user) => { 
  if (socket) socket.emit('chat', { message, room, user });
}
