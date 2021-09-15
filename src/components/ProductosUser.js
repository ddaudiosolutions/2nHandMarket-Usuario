import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosActionUser } from "../actions/productoActions";
import ProductoUser from "./ProductoUser";



const Productos = () => {

  const productos = useSelector((state) => state.productos.prodUser);
  console.log(productos);

  const dispatch = useDispatch();
  useEffect(() => {
    //consultar la API
    const cargarProductosUser = () => dispatch(obtenerProductosActionUser());
    cargarProductosUser();
    // eslint-disable-next-line
  }, []);

  

  return (
    <Fragment>
      {/* <h2 className="text-center">Mis Productos</h2> */}
      <div
        className="container-fluid bg-trasparent my-2 p-1"
        style={{ position: "relative" }}
      >
        <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
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
