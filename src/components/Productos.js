import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import Producto from "./Producto";

const Productos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //consulatar la API
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, [dispatch]);

  const productos = useSelector((state) => state.productos.loading.productos);
  //console.log(productos);

  return (
    <Fragment>
     
      <div
        className="container-fluid rounded my-5 p-3"
        style={{position: 'relative'}}
      >
        <div className="rounded row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 ">
          {productos === undefined
            ? null
            : productos.map((producto) => (
                <Producto key={producto.id} producto={producto} />
              ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;
