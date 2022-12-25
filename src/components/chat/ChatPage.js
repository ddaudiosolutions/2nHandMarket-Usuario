import React, { useEffect  } from 'react';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import socket from './Socket'
import './ChatPage.css'

const ChatPage = () => {
  
  const user = JSON.parse(sessionStorage.getItem('userName'))    
 
  useEffect(() => {
    socket.emit("conectado", user);
  }, [user]);

  return (
    <div className="chat mt-3">      
      <div className="chat__main">
        <ChatBody user1={user} />
        <ChatFooter user1={user}/>
      </div>
    </div>
  );
};

export default ChatPage;