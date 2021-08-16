import { Fragment } from "react";
import imageNull from "../images/logo192.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VerProducto = () => {
  // if(!producto){return null};
  const producto = useSelector((state) => state.productos.productovisionar);
  const { title, price, description } = producto;
  console.log(producto);
  return (
    <div className="container">
      <div className="card mt-4 mx-auto" style={{ width: "38rem" }}>
        <div className="card-header text-center ">
          <label>{title}</label>
        </div>
        <div className="card-body">
          <img className="card-img m-3 rounded" src={imageNull} alt='fotoNull'></img>
        </div>
        <div className="card-body text-center">
          <label>{price}€</label>
        </div>

        <div className="card-body text-center">
          <label>{description}</label>
        </div>
      </div>
      <div className='text-center mt-4'>
      <Link to='/productos' 
        className='btn btn-success'>
      VOLVER A PRODUCTOS
      </Link>
      </div>
      
    </div>
  );
};

export default VerProducto;
