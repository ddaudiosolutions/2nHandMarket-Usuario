import { Fragment, useEffect } from "react";
import imageNull from "../images/logo192.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VerProducto = () => {

  
  const producto = useSelector((state) => state.productos.productovisionar);

  const { title, price, description, images, categoria, subCategoria } = producto;
  console.log(producto) 

  return (
    <Fragment>
      <div className="container">
        <div className="card mt-4 mx-auto" style={{ width: "38rem" }}>
          <div className="card-header text-center ">
            <label>{title}</label>
          </div>
          <div className="card-header text-center">
          <h5>Categoria: {categoria}</h5>
        </div>
        <div className="card-header text-center">
          <h5>SubCategoria: {subCategoria}</h5>
        </div>
        <div className="card-header text-center">
          <p>Descripción: {description}</p>
        </div>
        <div className="card-header text-center">
            <h5>Precio: {price} €</h5>
          </div>
          <div className="card-body">
            <img
              className="card-img m-3 rounded"
              src={images[0].url}
              alt="fotoNull"
            ></img>
          </div>
         
          
        </div>
        <div className="text-center mt-4">
          <Link to="/productos" className="btn btn-success">
            VOLVER A PRODUCTOS
          </Link>
        </div>
        
      </div>
    </Fragment>
  );
};

export default VerProducto;
