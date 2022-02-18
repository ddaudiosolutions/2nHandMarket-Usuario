import { Fragment } from "react";
import "./BuscoPost.css";
//import parse from 'date-fns/parse'
//import {toDate, format} from 'date-fns'
//import './ProductoUser.css'
import { useHistory } from "react-router-dom";
//import { useSelector } from "react-redux";
//REDUX
import { useDispatch } from "react-redux";
import {  obtenerBuscoPostIdApiAction } from "../actions/buscoPostActions";
//import { obtenerProductoVisionar } from "../actions/productoActions";

const BuscoPost = ({ buscoPost }) => {  
 const { title } = buscoPost;
  const titulo = title.toUpperCase()
  const dispatch = useDispatch();
  const history = useHistory();

  const verBuscoPostId = (buscoPost) => {
    dispatch(obtenerBuscoPostIdApiAction(buscoPost._id));
    console.log(buscoPost._id)
    history.push(`/buscoposts/${buscoPost._id}`);
  };

  return (
    <Fragment>
      <div className="col">
        
        <div
          className="card shadow-sm me-1 ms-1 "
          type="button"
          onClick={() => verBuscoPostId(buscoPost)}
        >        
          <div className="">
            <img
              src='/SE_BUSCA_LOGO.png'
              className="card-img-top-post"
              alt='SE_BUSCA_IMG'
            ></img>
          </div>
          <div className="card-body ">
            <h5 className="excerpt titleH5-post card-title m-1 text-center mb-5">{titulo}</h5>          
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BuscoPost;
