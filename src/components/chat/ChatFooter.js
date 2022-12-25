import React, { useState } from 'react';
import socket from './Socket'

const ChatFooter = (props) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();        
    socket.emit("mensaje", props.user1, message);    
    setMessage('');
  };

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Escribe algo"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;