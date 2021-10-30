import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Producto from "./Producto";

import { obtenerProductosActionAuthor } from "../actions/productoActions";
import "./Producto.css";

const ProductosAuth = () => {
  const dispatch = useDispatch();
  const productos = useSelector((state) => state.productos.productosAuth);
  console.log(productos);

  //const [productosA, setProductosA] = useState('')

  const authUrl = window.location.pathname.split("/")[3];
  // console.log(authUrl);

  const llamarProductosAuth = (authUrl) => {
    dispatch(obtenerProductosActionAuthor(authUrl));
  };

  useEffect(() => {
    if (!productos) return null;
    llamarProductosAuth(authUrl);
    //setProductosA(productos)
    // eslint-disable-next-line
  }, [authUrl]);

  return (
    <Fragment>
      <div className="container mt-4 ">
       <div className='card'>
       {!productos || productos.length === 0 ? null : (
            <div className="d-flex justify-content-start ms-4">
              {productos[0].author.imagesAvatar[0].url === undefined ? (
                <img
                  src="/Avatar_Default2.png"
                  className="card-img-topAvatar d-flex justify-content-center me-2"
                  alt="avatarUser"
                ></img>
              ) : (
                <img
                  src={productos[0].author.imagesAvatar[0].url}
                  className="card-img-topAvatar d-flex justify-content-center me-2 "
                  alt="avatar Images"
                ></img>
              )}{!productos || productos.length === 0 ? null : (                
                 <h2 className="h2Author mt-4">{productos[0].author.nombre}</h2>
              )}
            </div>
          )}
       </div>
          
        
        {/* <div className="cols-2 d-flex  ">
          {!productos || productos.length === 0 ? null : (
            <div className="">
              <h2 className="h2Author">{productos[0].author.nombre}</h2>
            </div>
          )}
        </div> */}
      </div>
      <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center mt-2">
        {!productos
          ? null
          : productos.map((producto) => (
              <Producto key={producto._id} producto={producto} />
            ))}
      </div>
    </Fragment>
  );
};

export default ProductosAuth;
