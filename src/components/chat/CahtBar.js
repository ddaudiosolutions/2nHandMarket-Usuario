import React from 'react';

const ChatBar = () => {
  return (
    <div className="chat__sidebar">
      <h2>Abrir Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          <p>User 1</p>
          <p>User 2</p>         
        </div>
      </div>
    </div>
  );
};

export default ChatBar;