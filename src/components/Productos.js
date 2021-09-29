import { Fragment, useEffect } from "react";
import { useSelector, useDispatch,  } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  obtenerProductosAction,
  obtenerCategoriaActions,
  obtenerPaginaAction,
} from "../actions/productoActions";
import Producto from "./Producto";
import "./Producto.css";

const Productos = () => {

  const history = useHistory();

  const location = useLocation();
  console.log(location);

  const productos = useSelector((state) => state.productos.productos);
  const paginasTotales = useSelector((state) => state.productos.paginas);
  const errores = useSelector((state) => state.productos.error401);


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
    //setBusqueda()
    cargarCategoria(busquedaquery);
    cargarProductos(busquedaquery, pagequery);
    dispatch(obtenerPaginaAction(pagequery));
    console.log("vuelvo a llar a la api");
    // eslint-disable-next-line
  }, [busquedaquery, pagequery]);

  return (
    <Fragment>
      {errores ? (
        <h2 className="col-6 alert alert-warning mx-auto mt-5 text-center">
          Inicia Sesión o Registrate
        </h2>
      ) : null}
      <div
        className="container-fluid  my-2 p-1 mt-4"
        style={{ position: "relative" }}
      >
        <div className="bg-form row justify-content-center rounded mb-3">
          <div className="mb-3 col-12 mx-auto bg-form mt-4">
            <div className='col col-lg-6 mx-auto'>
                <h2 className="text-center">Encuentra lo que buscas !!!</h2>
            </div>
            
            <div className="col col-md-12 col-lg-8 mx-auto bg-form mt-5 ">
              <form>
                <div className="container">
                  <select
                    className="form-select col-6"                    
                    defaultValue={busquedaquery}
                    name="busqueda"                 
                    //SELECCION DE CATEGORIA DE PRODUCTOS A MOSTRAR en REACT MEJOR CON HISTORY.PUSH
                    onChange={(e) => history.push( `/productos?busqueda=${e.target.value}&page=0`) } 
                  >
                    <option value="ultimos_productos">Ver Últimos los Productos</option>
                    <option value="tablas">Tablas</option>
                    <option value="velas">Velas</option>
                    <option value="botavaras">Botavaras</option>
                    <option value="mastiles">Mastiles</option>
                    <option value="accesorios">Accesorios</option>
                  </select>
                 
                </div>
              </form>
            </div>
            <div className="col-12  bg-form mt-5 ">
                <h2> </h2>
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
