import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import Producto from "./Producto";

const Productos = () => {
  const productos = useSelector((state) => state.productos.productos);
  console.log(productos);

  const [productosAll, setproductoAll] = useState(productos);
  console.log(productosAll);

  const [busqueda, setBusqueda] = useState("all");
  console.log(busqueda);
  const dispatch = useDispatch();

  const cargarProductos = () => dispatch(obtenerProductosAction(busqueda));
  
  useEffect(() => {
    cargarProductos(busqueda);
    
    if (
      productosAll !== productos ||
      productos === undefined ||
      !productos.length
    ) {
      setproductoAll(productos);
      console.log("vuelvo a llar a la api");
    }

    // eslint-disable-next-line
  }, []);

  const handelBusqueda = (e) => {
    e.preventDefault();
    cargarProductos(busqueda);
  };

  return (
    <Fragment>
      <div
        className="container-fluid  my-2 p-1 "
        style={{ position: "relative" }}
      >
        <div>
          <h2 className="text-center">BUSCADOR</h2>
          <div className=" mb-3 col-6 mx-auto">
            <form onSubmit={handelBusqueda}>
              <select
                className="form-select col-6"
                defaultValue=""
                name="categoria"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              >
                <option value="" selected>
                  Selecciona el tipo de producto
                </option>
                <option value="all">Ver Todos los Productos</option>
                <option value="tabla">Tabla</option>
                <option value="vela">Vela</option>
                <option value="botavara">Botavara</option>
                <option value="mastil">Mastil</option>
                <option value="accesorio">Accesorio</option>
              </select>
              <button className="btn btn-success text-center mt-3">
                Buscar
              </button>
            </form>
            <div></div>
            {/* <label className="mb-2">Selecciona el tipo de producto</label> */}
          </div>
        </div>
        <div className=" row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 ">
          {productos === undefined
            ? null
            : productos.map((producto) => (
                <Producto key={producto._id} producto={producto} />
              ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;
