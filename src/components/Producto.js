import { Fragment } from "react";
import imageNull from "../images/logo192.png";
import { Link, useHistory } from "react-router-dom";

//REDUX
import { useDispatch } from "react-redux";
import { obtenerProductoVisionar } from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { title, price, description, id } = producto;
  const dispatch = useDispatch();
  const history = useHistory();

  const redireccionarVerProducto = (producto) => {
    dispatch(obtenerProductoVisionar(producto));
    history.push(`/productos/${producto.id}`);
  };

  return (
    <Fragment>
      <div className="card mb-2 ">
        <div className="card-header text-center">
          <h5>{title}</h5>
        </div>
        <img className="card-img-top" src={imageNull}></img>
        <div className="card-body text-center">
          <p style={{ color: "red" }}>{price}€</p>
        </div>
        <div className="card-body text-center">
          <button
            className="btn btn-primary"
            onClick={() => redireccionarVerProducto(producto)}
          >
            Ver Producto
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Producto;
