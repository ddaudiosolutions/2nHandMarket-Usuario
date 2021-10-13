import { Fragment } from "react";
import "./Producto.css";
//import parse from 'date-fns/parse'
//import {toDate, format} from 'date-fns'
//import './ProductoUser.css'
import { useHistory } from "react-router-dom";
//import { useSelector } from "react-redux";
//REDUX
import { useDispatch } from "react-redux";
import { obtenerProductoIdAction, obtenerProductoIdApiAction } from "../actions/productoActions";
//import { obtenerProductoVisionar } from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { title, price, images, description } = producto;
  const dispatch = useDispatch();
  const history = useHistory();

  const verProductoId = (producto) => {
    dispatch(obtenerProductoIdApiAction(producto._id));
    console.log(producto._id)
    history.push(`/productos/${producto._id}`);
  };

  return (
    <Fragment>
      <div className="col">
        <div
          className="card shadow-sm me-1 ms-1 "
          type="button"
          onClick={() => verProductoId(producto)}
        >
          <div className="">
            <img
              src={images[0].url}
              className="card-img-top"
              alt={images[0].filename}
            ></img>
          </div>
          <div className="card-body ">
            <h5 className="excerpt titleH5 card-title m-1">{title}</h5>
            <h5 className="price-hp m-1 mb-3">{price}€</h5>

            <div className="excerpt pproductoTitle m-1 mb-4" rows="1">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Producto;
