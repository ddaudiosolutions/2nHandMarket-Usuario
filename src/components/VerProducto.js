import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
import "./VerProducto.css";

const VerProducto = () => {    
 
  
  const producto = useSelector((state) => state.productos.productoId);
  const busqueda = useSelector((state) => state.productos.categoria)
  const paginaActual = useSelector((state)=> state.productos.paginaActual)
  console.log(busqueda, paginaActual);

  if (!producto) {
    return null;
  }
  const { title, price, description, images, contacto } = producto;
  
  
  return (
    <Fragment>
      <div className="col">
        <div className="card1 h-100 mt-5">
          <a href={images[0].url} target="_blank" rel="noreferrer">
            <img
              src={images[0].url}
              className="card-img-top1 mt-3"
              alt={images[0].filename}
            ></img>
          </a>
          <div className="card-body">
            <div className="clearfix mb-3 text-center">
              <span className=" price-hp1">Precio: {price} €</span>
            </div>
            <h5 className="card-title titleH5V rounded text-center">{title}</h5>
            <div className="card-header mb-2">
              <span className="card-title pproducto text-center">Descripción:</span>
              <p className="card-title pproducto">{description}</p>
            </div>
            <div className="card-header">
              <span className="card-title  pproducto text-center">Contacto:</span>
              <p className="card-title pproducto ">{contacto}</p>
            </div>
            
            <div className="text-center my-4">
              <Link to={`/productos?busqueda=${busqueda}&page=${paginaActual}`} className="btn btn-outline-success">
                VOLVER A PRODUCTOS
              </Link>
            </div>
          </div>
        </div>
      </div>
      
    </Fragment>
  );
};

export default VerProducto;
