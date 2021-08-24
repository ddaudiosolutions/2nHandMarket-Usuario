import { Fragment } from "react";
import imageNull from "../images/logo192.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
//REDUX
import { useDispatch } from "react-redux";
import { obtenerProductoIdAction } from "../actions/productoActions";
//import { obtenerProductoVisionar } from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { title, price, author, description, categoria, subCategoria } = producto;
  const dispatch = useDispatch();
  const history = useHistory();

   // console.log(currentUser)

  const verProductoId = (producto) => {
    dispatch(obtenerProductoIdAction(producto));
    history.push(`/productos/${producto.id}`);
  };

  return (
    <Fragment>
      <div className="card mb-2 ">
        <div className="card-header text-center">
          <h5>{title}</h5>
        </div>
        
        <img className="card-img-top" src={imageNull} alt='imagen nula'></img>
        <div className="card-body text-center">
          <p style={{ color: "red" }}>{price}€</p>
        </div>
        <div className="card-body text-center">
          <button
            className="btn btn-primary"
            onClick={() => verProductoId(producto)}
          >
            Ver Producto
          </button>
        </div>
        
      </div>
    </Fragment>
  );
};

export default Producto;
