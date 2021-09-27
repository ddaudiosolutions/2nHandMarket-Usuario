import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  obtenerProductosAction,
  obtenerCategoriaActions,
  obtenerPaginaAction,
} from "../actions/productoActions";
import Producto from "./Producto";
import "./Producto.css";

const Productos = () => {
  const location = useLocation();
  console.log(location);

  const productos = useSelector((state) => state.productos.productos);
  const paginasTotales = useSelector((state) => state.productos.paginas);  

  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);  

  const params = new URL(document.location).searchParams;
  let busquedaquery = params.get("busqueda");
  let pagequery = params.get("page");

  const dispatch = useDispatch();

  const cargarProductos = () =>
    dispatch(obtenerProductosAction(busquedaquery, pagequery));

  const cargarCategoria = () =>
    dispatch(obtenerCategoriaActions(busquedaquery));

  useEffect(() => {    
    cargarCategoria(busquedaquery);
    cargarProductos(busquedaquery, pagequery);
    dispatch(obtenerPaginaAction(pagequery));
    console.log("vuelvo a llar a la api");
    // eslint-disable-next-line
  }, [busquedaquery, pagequery]);

  return (
    <Fragment>
      <div
        className="container-fluid  my-2 p-1 mt-4"
        style={{ position: "relative" }}
      >
        <div>          
          <div className=" mb-3 col-6 mx-auto">
            <form>
              <div className="container d-flex ">
                <select
                  className="form-select col-6"
                  defaultValue={busquedaquery}
                  name="busqueda"
                  //value={busqueda}
                  onChange={(e) => e.target.value} //SELECCION DE CATEGORIA DE PRODUCTOS A MOSTRAR
                >
                  <option value="all">Ver Últimos los Productos</option>
                  <option value="tabla">Tabla</option>
                  <option value="vela">Vela</option>
                  <option value="botavara">Botavara</option>
                  <option value="mastil">Mastil</option>
                  <option value="accesorio">Accesorio</option>
                </select>
                <button className="btn btn-outline-primary ms-3">Buscar</button>
              </div>
            </form>
            <div>
              <h2 className="mt-5 text-center">Categoria: {busquedaquery}</h2>
            </div>
            
          </div>
        </div>
        <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center ">
          {productos === undefined
            ? null
            : productos.map((producto, busqueda) => (
                <Producto
                  key={producto._id}
                  producto={producto}
                  busqueda={busqueda}
                />
              ))}
        </div>
        <div className="d-flex justify-content-center mt-4 ">
          {paginas.map((pagina) => (
            <Link
              type="submit"
              key={pagina}
              to={`/productos?busqueda=${busquedaquery}&page=${pagina}`}
              className="rounded btn btn-select page-link"
            >
              {pagina + 1}
            </Link>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;
