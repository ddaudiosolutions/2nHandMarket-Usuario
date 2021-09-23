import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation} from "react-router-dom";
import "./VerProducto.css";

const VerProducto = () => {
 
  const history = useHistory();
  // let location = useLocation();

  // location = {
  //   pathname: '/productos',
  //   state: {setBusqueda: "all"}
  // }
  const producto = useSelector((state) => state.productos.productoId);
  console.log(producto);

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
            {/* <button className= 'btn btn-info' onClick={(e)=>history.push({pathname:'/productos', state: {setBusqueda: 'vela'}})}>Volver a productos</button> */}
            <div className="text-center my-4">
              <Link to={'/productos'} className="btn btn-outline-success">
                VOLVER A PRODUCTOS
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="card mt-4 mx-auto" >
          <div className="card-header text-center ">
            <label>{title}</label>
          </div>
          
        <div className="card-header text-center">
          <p>Descripción: {description}</p>
        </div>
        <div className="card-header text-center">
            <h5>Precio: {price} €</h5>
          </div>
          <div className="card-header text-center">
          <p>Contacto: {contacto}</p>
        </div>
          <div className="card-body text-center">
            <a href={images[0].url} target='_blank'>
            <img
              className="card-img img-thumbnail m-3 rounded"
              style={{width: '200px'}}
              src={images[0].url}
              
              alt="fotoNull"
            ></img>
            </a>
          </div>
         
          
        </div>
        <div className="text-center mt-4">
          <Link to="/productos" className="btn btn-success">
            VOLVER A PRODUCTOS
          </Link>
        </div>
        
      </div> */}
    </Fragment>
  );
};

export default VerProducto;
