import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { obtenerProductoIdApiAction } from '../actions/productoActions';
import { getChatRoomByTitle } from '../slices/roomsSlice';

const Buzon = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(state => state.rooms.userRooms);

  const producto = useSelector((state) => state.productos.productoIdApi);
  console.log(producto)
  const enviarproductoid = ((room) =>
    dispatch(obtenerProductoIdApiAction(room.product))
    .then (res => {
      dispatch(getChatRoomByTitle(room.title))
    })
    
    );
  
  // const openRoom = (room) => {
  //   console.log(room)
  //   dispatch(getChatRoomByTitle(room.title))
  //   enviarproductoid(room.product)
  // }
  return (
    <div>
      {
        rooms.map(room => 
          <ul>
            <li> 
              <Link to={ {pathname: '/chat', state: {}}}> 
                 <btn className="btn btn-outline-danger h2Author ms-auto me-4 mt-3" onClick={() => enviarproductoid(room)}> {room.product} </btn>
              </Link>       
            </li>
          </ul>
      )
    }
    </div>
  )
}

export default Buzon
