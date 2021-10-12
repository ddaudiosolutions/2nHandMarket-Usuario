import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./VerProducto.css";
import {
  obtenerProductosActionAuthor,  
} from "../actions/productoActions";

import {toDate, format} from 'date-fns'


const VerProducto = () => {
  const producto = useSelector((state) => state.productos.productoId);
  const busqueda = useSelector((state) => state.productos.categoria);
  const paginaActual = useSelector((state) => state.productos.paginaActual);
 
  //console.log(datosUsuario);

  //const productos = useSelector((state) => state.productos.prodUser);
  const dispatch = useDispatch();
  const history = useHistory();
  
  //const avatarGet = useSelector((state) => state.auth.avatar);    
   
  //const [avatarUrl, setAvatarUrl] = useState('') 
  
   useEffect(() => {
    if (!producto) {
      return null;
    }
       //setAvatarUrl(avatarGet.imagesAvatar[0].url)
       
   }, [])

  

  const { title, price, description, images, contacto, author, creado } = producto;
  //console.log(author._id);
  
  
  ///CONVERTIMOS LA FECHA A UN FORMATO COMUN
  const date = new Date(creado)
  const clonedDate = toDate(date)
  const clonedDateFormat= format(clonedDate, 'dd-MM-yyyy')
  //console.log(clonedDateFormat)
  
  
  let authorName = author.nombre.toLowerCase();
  let authorDireccion = author.direccion;
  console.log(author)
  
  let string = busqueda.toUpperCase();

   const cargarProductosAuthor = (producto) => {dispatch(obtenerProductosActionAuthor(producto));
    //console.log(producto.author)
    history.push( '/productos/auth')
    }
 

  return (
    <Fragment>
      <div className="container col-sm-9 col-md-9 col-lg-7 col-xl-7">
        <div className="cardVerProducto mt-3 ">
          <div className="d-flex justify-content-start  mt-3" 
          type='button'
          onClick={()=> cargarProductosAuthor(producto)}>
            {/* <img
              src={avatarUrl}
              className="card-img-topAvatar ms-4 mt-3"
              alt="avatarUser"
            ></img> */}
            <h5 className="h5Avatar ms-2 mt-4">{authorName}</h5>
          </div>

          <div className='container'>
            <a
              className=" "
              href={images[0].url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={images[0].url}
                 style={{ height: "25rem"}}
                className="card-img-top mt-3 "
                alt={images[0].filename}
              ></img>
            </a>
          </div>

          <div className="card-body">
            <h5 className="card-title titleH5V rounded text-center mt-4">
              {title}
            </h5>
            <div className=" mb-3 text-center">
              <span className=" price-hp1">Precio: {price} €</span>
            </div>
            <h5 className="card-title pproductoTitleFecha me-3">{clonedDateFormat}</h5>
            <div className="card-header mb-2">
              
              <p className="card-title pproductoTitle">{description}</p>
            </div>
            <div className="card-header">
              {/* <span className="card-title  pproductoTitle text-center">Contacto:</span> */}
              
              <p className="card-title pproductoTitle ">{author.email}</p>
              <p className="card-title pproductoTitle ">{author.telefono}</p>
              <p className="card-title pproductoTitle ">{author.direccion}</p>
            </div>

            <div className="text-center my-4">
              <Link
                to={`/productos?busqueda=${busqueda}&page=${paginaActual}`}
                className="btn btn-outline-success"
              >
                Volver a Categoria: {string}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerProducto;
