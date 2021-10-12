import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  obtenerProductosAction,
  obtenerCategoriaActions,
  obtenerPaginaAction,
} from "../actions/productoActions";
import Producto from "./Producto";
import "./Producto.css";

const Productos = () => {
  const history = useHistory();

  const productos = useSelector((state) => state.productos.productos);
  const paginasTotales = useSelector((state) => state.productos.paginas);
  //const errores = useSelector((state) => state.productos.error401);
  //const { isLoggedIn } = useSelector((state) => state.auth);

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

    // eslint-disable-next-line
  }, [busquedaquery, pagequery]);

  // if(isLoggedIn === false){
  //   console.log('NO ESTAMOS LOGEADOS')
  //   return <Redirect to={"/home"}></Redirect>;
  // }

  return (
    <Fragment>
      <div
        className="container "
        // style={{ position: "relative" }}
      >
        <div className="row">
          {/* <div className="col-2">
            <img src='/bellini-surf-shop-logo1.png'  className='d-flex justify-content-center mt-5'></img>
          </div> */}
          <div className="bg-form col-9 justify-content-center mx-auto rounded mb-3 mt-2">         
            <div className="mb-3 col-9 mx-auto bg-form mt-4">
              <div className="col col-lg-9 mx-auto">
                <h2 className="text-center">Que buscas!!!</h2>
              </div>

              <div className="col col-md-9 col-lg-9 mx-auto bg-form mt-5 ">
                <form>
                  <div className="container">
                    <select
                      className="form-select col-6"
                      defaultValue={busquedaquery}
                      name="busqueda"
                      //SELECCION DE CATEGORIA DE PRODUCTOS A MOSTRAR en REACT MEJOR CON HISTORY.PUSH
                      onChange={(e) =>
                        history.push(
                          `/productos?busqueda=${e.target.value}&page=0`
                        )
                      }
                    >
                      <option value="ultimos_productos">
                        Últimos los Productos
                      </option>
                      <option value="tablas">Tablas</option>
                      <option value="velas">Velas</option>
                      <option value="botavaras">Botavaras</option>
                      <option value="mastiles">Mastiles</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </div>
                </form>
              </div>
              {/* <div className="col-12  bg-form mt-5 ">
                <h2> </h2>
            </div> */}
            </div>
          </div>
          <div className='col-8 mx-auto'>
          
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
      </div>
    </Fragment>
  );
};

export default Productos;
