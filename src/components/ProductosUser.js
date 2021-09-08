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
      {/* <h2 className="text-center">Mis Productos</h2> */}
      <div
        className="container-fluid bg-trasparent my-4 p-3"
        style={{ position: "relative" }}
      >
        <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
          {productos === undefined
            ? null
            : productos.map((producto) => (
                <ProductoUser key={producto._id} producto={producto} />
              ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;
