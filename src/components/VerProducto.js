import { Fragment,   } from "react";
//import {obtenerProductoIdAction} from '../actions/productoActions'
import { useSelector} from "react-redux";
import { Link } from "react-router-dom";
import './VerProducto.css'


const VerProducto = () => {
  //const dispatch = useDispatch()

  // useEffect(()=>{
  //   const cargarProducto = ()=> dispatch(obtenerProductoIdAction());
  //   cargarProducto();
  //   // eslint-disable-next-line
  // }, [])

  const producto = useSelector((state) => state.productos.productoId);
  console.log(producto)
  if(!producto){return null}
    const { title, price, description, images, contacto } = producto;
  
  
  //console.log(producto) 

  return (
    <Fragment>
      <div className="col">
        <div className="card1 h-100 shadow-sm mt-5">
          <a href={images[0].url} target='_blank' rel="noreferrer">
          <img
            src={images[0].url}
            className="card-img-top1 mt-3"
            alt={images[0].filename}
          ></img>
          </a>
          <div className="card-body">
            <div className="clearfix mb-3">
              <span className="float-end price-hp1">Precio: {price} €</span>
            </div>
            <h5 className="card-title text-center">{title}</h5>
            <div className='card-header mb-2'>
              <span className='card-title text-center'>Descripción:</span>
              <p className='card-title '>{description}</p>
            </div>
            <div className='card-header'>
              <span className='card-title text-center'>Contacto:</span>
              <p className='card-title '>{contacto}</p>
            </div>
            <div className="text-center my-4">              
            <Link to="/productos" className="btn btn-success">
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
