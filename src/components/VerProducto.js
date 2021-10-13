import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./VerProducto.css";
import {
  obtenerProductosActionAuthor,
  obtenerProductoIdApiAction,
} from "../actions/productoActions";

import { toDate, format } from "date-fns";

const VerProducto = () => {
 
  // eslint-disable-next-line
  const [title, setTitle] = useState("");// eslint-disable-next-line
  const [price, setPrice] = useState("");// eslint-disable-next-line
  const [description, setDescription] = useState("");// eslint-disable-next-line
  const [imagesUrl, setImagesUrl] = useState("");// eslint-disable-next-line
  const [contacto, setContacto] = useState("");// eslint-disable-next-line
  const [creado, setCreado] = useState("");// eslint-disable-next-line
  const [author, setAuthor] = useState("");// eslint-disable-next-line
  
  const producto = useSelector((state) => state.productos.productoIdApi);
  console.log(producto);

  const productoIdurl = window.location.pathname.split("/")[2];
  console.log(productoIdurl);
 

  let paginaActual = useSelector((state) => state.productos.paginaActual);
  if (paginaActual === undefined) {
    paginaActual = 0;
  }
  
  const dispatch = useDispatch();
  const history = useHistory();

 
  const enviarproductoid = (url) => (
    //console.log("fetching axios"), 
    dispatch(obtenerProductoIdApiAction(url)));
    

  useEffect(() => {
    console.log("useeffect");
    enviarproductoid(productoIdurl);
    // eslint-disable-next-line
  }, []);

  if (producto === null) return null;

  // const { title, price, description, images, contacto, author, creado } = productoApi;
  // console.log(productoApi);

  ///CONVERTIMOS LA FECHA A UN FORMATO COMUN
  const date = new Date(producto.creado);
  const clonedDate = toDate(date);
  const clonedDateFormat = format(clonedDate, "dd-MM-yyyy");
  console.log(clonedDateFormat);

  let authorName = producto.author.nombre;
  //let authorDireccion = author.direccion;
  console.log(authorName);

  // let string = busqueda;
  // if(!busqueda) {
  //   string = 'hola'
  // }

  const cargarProductosAuthor = (producto) => {
    dispatch(obtenerProductosActionAuthor(producto.author._id));
    console.log(producto.author._id)
    history.push(`/productos/auth/${producto.author._id}`);
  };

  return (
    <Fragment>
      <div className="container col-sm-9 col-md-9 col-lg-7 col-xl-7">
        <div className="cardVerProducto mt-3 ">
          <div
            className="d-flex justify-content-start  mt-3"
            type="button"
            onClick={() => cargarProductosAuthor(producto)}
          >
            {/* <img
              src={avatarUrl}
              className="card-img-topAvatar ms-4 mt-3"
              alt="avatarUser"
            ></img> */}
            <h5 className="h5Avatar ms-3 mt-4">{authorName}</h5>
          </div>

          <div className="container">
            <a
              className=" "
              href={producto.images[0].url}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={producto.images[0].url}
                style={{ height: "25rem" }}
                className="card-img-top mt-3 "
                alt={producto.images[0].filename}
              ></img>
            </a>
          </div>

          <div className="card-body">
            <h5 className="card-title titleH5V rounded text-center mt-4">
              {producto.title}
            </h5>
            <div className=" mb-3 text-center">
              <span className=" price-hp1">Precio: {producto.price} €</span>
            </div>
            <h5 className="card-title pproductoTitleFecha me-3">
              {clonedDateFormat}
            </h5>
            <div className="card-header mb-2">
              <p className="card-title pproductoTitle">
                {producto.description}
              </p>
            </div>
            <div className="card-header">
              {/* <span className="card-title  pproductoTitle text-center">Contacto:</span> */}

              <p className="card-title pproductoTitle ">
                {producto.author.email}
              </p>
              {/* <p className="card-title pproductoTitle ">
                {producto.author.telefono}
              </p> */}
              <p className="card-title pproductoTitle ">
                {producto.author.direccion}
              </p>
            </div>

            <div className="text-center my-4">
              <Link
                to={`/productos?busqueda=${producto.categoria}&page=${paginaActual}`}
                className="btn btn-outline-success"
              >
                Volver a Categoria: {producto.categoria.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerProducto;
