import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./VerProducto.css";

const VerProducto = () => {
  const producto = useSelector((state) => state.productos.productoId);
  const busqueda = useSelector((state) => state.productos.categoria);
  const paginaActual = useSelector((state) => state.productos.paginaActual);
  console.log(busqueda, paginaActual);

  if (!producto) {
    return null;
  }
  const { title, price, description, images, contacto, author } = producto;
  console.log(author.nombre)
  let authorName = author.nombre.toLowerCase()
  console.log(authorName)
  let string = busqueda.toUpperCase();

  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <div className="card1 mt-3 ">
          <div className="d-flex justify-content-start mt-3">
            <img
              src="/AvatarDavid.jpg"
              className="card-img-topAvatar ms-4"
              alt="avatarUser"
            ></img>
            <h5 className='h5Avatar ms-2 mt-3'>{authorName}</h5>
            </div>
          
          
          <div className='text-center '>
            <a href={images[0].url} target="_blank" rel="noreferrer">
              <img
                src={images[0].url}
                className="card-img-top1 m-3"
                alt={images[0].filename}
              ></img>
            </a>
          </div>

          <div className="card-body">
            <h5 className="card-title titleH5V rounded text-center mt-4">{title}</h5>
            <div className=" mb-3 text-center">
              <span className=" price-hp1">Precio: {price} €</span>
            </div>

            <div className="card-header mb-2">
              {/* <span className="card-title pproductoTitle text-center">Descripción:</span> */}
              <p className="card-title pproductoTitle">{description}</p>
            </div>
            <div className="card-header">
              {/* <span className="card-title  pproductoTitle text-center">Contacto:</span> */}
              <p className="card-title pproductoTitle ">{contacto}</p>
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
