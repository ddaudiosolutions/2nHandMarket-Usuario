import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosActionUser } from "../actions/productoActions";
import ProductoUser from "./ProductoUser";

const Productos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //consultar la API
    const cargarProductosUser = () => dispatch(obtenerProductosActionUser());
    cargarProductosUser();
  }, [dispatch]);

  const productos = useSelector((state) => state.productos.loading.productos);
  console.log(productos);

  return (
    <Fragment>
      <h2 className="text-center">Listado de Productos del Usuario</h2>
      <div className=" row d-flex justify-content-center row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 g-3 mr-5 mx-auto">            
      {productos === undefined
        ? null
        : productos.map((producto) => (            
                  <ProductoUser key={producto.id} producto={producto} />                
          ))}
          </div>
    </Fragment>
  );
};

export default Productos;
