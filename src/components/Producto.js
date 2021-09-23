import { Fragment } from "react";
import "./Producto.css";
//import './ProductoUser.css'
import { useHistory } from "react-router-dom";
//import { useSelector } from "react-redux";
//REDUX
import { useDispatch } from "react-redux";
import { obtenerProductoIdAction } from "../actions/productoActions";
//import { obtenerProductoVisionar } from "../actions/productoActions";

const Producto = ({ producto }) => {
  //LOD PRODUCTOS LLEGAN POR PROPS DE PRODUCTOS.JS
  //const { user: currentUser } = useSelector((state) => state.auth);
  //console.log(producto._id)
  const { title, price, images } = producto;
  const dispatch = useDispatch();
  const history = useHistory();

  // console.log(currentUser)

  const verProductoId = (producto ) => {
    dispatch(obtenerProductoIdAction(producto));
    console.log(producto);

    history.push(`/productos/${producto._id}`);
  };

  return (
    <Fragment>
      <div className="col">
        <div className="card shadow-sm gap-2  me-0">
          <div className="">
            <img
              src={images[0].url}
              className="card-img-top"
              alt={images[0].filename}
            ></img>
          </div>
          <div className="card-body text-center">
            <h5 className="price-hp">{price}€</h5>
            <h5 className="titleH5 card-title text-center">{title}</h5>
            <button
              className="btn btn-outline-primary mt-2 mb-1" 
              onClick={() => verProductoId(producto) }
            >
              Ver Producto
            </button>
          </div>
        </div>
      </div>
      {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2">
      <div className="card mb-2 ">
        <div className="card-header text-center">
          <h5 className='display-7'>{title}</h5>
        </div>        
        <img
            className="image-fluid m-3"
            style={{ height: '100px', objectFit: 'cover'}}
            src={images[0].url}
            alt="imagen nula"
          ></img>
        <div className="card-body text-center bg-light">
          <p style={{ color: "red" }}>Precio: {price}€</p>
          <button
            className="btn btn-primary"
            onClick={() => verProductoId(producto)}
          >
            Ver Producto
          </button>
        </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default Producto;
