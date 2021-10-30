import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./VerProducto.css";
import {
  obtenerProductosActionAuthor,
  obtenerProductoIdApiAction,
} from "../actions/productoActions";

import { toDate, format } from "date-fns";

const VerProducto = () => {
 

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

  const enviarproductoid = (url) =>
    //console.log("fetching axios"),
    dispatch(obtenerProductoIdApiAction(url));

  useEffect(() => {
    console.log("useeffect");
    enviarproductoid(productoIdurl);
    // eslint-disable-next-line
  }, []);

  if (producto === null) return null;;

  ///CONVERTIMOS LA FECHA A UN FORMATO COMUN
  const date = new Date(producto.creado);
  const clonedDate = toDate(date);
  const clonedDateFormat = format(clonedDate, "dd-MM-yyyy");
  

  let authorName = producto.author.nombre;

  const cargarProductosAuthor = (producto) => {
    dispatch(obtenerProductosActionAuthor(producto.author._id));
   
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
            {producto.author.imagesAvatar[0].url === undefined ? (
              <img
                src="/Avatar_Default2.png"
                className="card-img-topAvatar ms-4 mt-3"
                alt="avatar for User"
              ></img>
            ) : (
              <img
                src={producto.author.imagesAvatar[0].url}
                className="card-img-topAvatar ms-4 mt-3"
                alt="avatarUser"
              ></img>
            )}
            <h5 className="h2Author ms-2 mt-4">{authorName}</h5>
          </div>
          <div>
            <div
              id="carouselExampleControlsNoTouching"
              className="carousel carousel-dark slide"
              data-bs-touch="false"
              data-bs-interval="false"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <a
                    className=" "
                    href={producto.images[0].url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={producto.images[0].url}
                      style={{ height: "25rem" }}
                      key={producto.images[0]._id}
                      className="card-img-top mt-3"
                      alt="..."
                    ></img>
                  </a>
                </div>
                {producto.images.slice(1).map((image) => (
                  <div className="carousel-item">
                    <a
                      className=" "
                      href={image.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={image.url}
                        style={{ height: "25rem" }}
                        key={image._id}
                        className="card-img-top mt-3"
                        alt="..."
                      ></img>
                    </a>
                  </div>
                ))}
             
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleControlsNoTouching"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
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
              {/* <a className="card-title pproductoTitle" href={`https://api.whatsapp.com/send?phone=34${producto.author.telefono}&text=Hola Estoy interesado en tus productos`}>
                Mi Telefono
              </a> */}
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
