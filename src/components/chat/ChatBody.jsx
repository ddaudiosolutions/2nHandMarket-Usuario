import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const ChatBody = (props) => { 
  const { 
    chat,
    user
  } = props;
  
  const productoImage = useSelector(state => state.productos.productoIdApi); 
  //const productoAuthor = useSelector(state => state.productos.productoIdApi.author.email)
 console.log(productoImage)
  const [image, setImage] = useState (productoImage.images[0].url)
  // const [author, setAuthor] = useState (productoAuthor)
  
  const history = useHistory();

  const handleLeaveChat = () => { 
    history.push('/');
    window.location.reload();
  };  

  useEffect(() => {
    setImage(productoImage.images[0].url)
    // setAuthor(productoAuthor)
  }, [productoImage]);
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });


  return (
    <>
      <header className="chat__mainHeader">        
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
        {/* <h3 > {author} </h3> */}
        {image !== null && <img className='rounded' src={image} alt='product' swidth={85} height={85} />}
      </header>
      <div className="message__container">
    {chat.map((e, i) => (      
      <> 
         {user === e.user ?
          <div className="message__chats">
          <p className="sender__name">{e.nombre}</p>
          <div className="message__sender">
            <p>{e.msg}</p>
          </div>
        </div> : null
        } 

        {/*This shows messages received by you*/}
         {
          user !== e.user ?
        <div className="message__chats">
          <p>{e.nombre}</p>
          <div className="message__recipient">
            <p>{e.msg}</p>
          </div>
        </div> : null
        }
      </>
      ))
    }
    <div ref={divRef}></div>
</div>   
    </>
  );
};

export default ChatBody;