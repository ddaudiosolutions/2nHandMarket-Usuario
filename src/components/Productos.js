import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  obtenerProductosAction,
  //obtenerCategoriaActions,
  obtenerPaginaAction,
} from "../actions/productoActions";
import { obtenerBuscoPostsActions } from "../actions/buscoPostActions";

import FormBusqueda from './FormBusqueda'
import ListaProductos from "./ListaProductos";
import ListadoPosts from "./ListadoPosts";

import "./Producto.css";

const Productos = () => {
  //const history = useHistory();


  const productos = useSelector((state) => state.productos.productos);   
  const paginasTotales = useSelector((state) => state.productos.paginas);

  //TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const buscoPosts = useSelector((state) => state.buscoposts.buscoPosts);

  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);
  
  
  //TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const buscoPosts = useSelector((state) => state.buscoposts.buscoPosts); 
  
  const params = new URL(document.location).searchParams;
  let busquedaquery = params.get("busqueda");
  let pagequery = params.get("page");

  const dispatch = useDispatch();

  const cargarProductos = () =>
    dispatch(obtenerProductosAction(busquedaquery, pagequery));

  // const cargarCategoria = () =>
  //   dispatch(obtenerCategoriaActions(busquedaquery));

  const cargarBuscoPosts = () => dispatch(obtenerBuscoPostsActions());

  useEffect(() => {
    
    cargarBuscoPosts();
    //cargarCategoria(busquedaquery);
    cargarProductos(busquedaquery, pagequery);
    dispatch(obtenerPaginaAction(pagequery));

    // eslint-disable-next-line
  }, [busquedaquery, pagequery]);

  return (
    <Fragment>
      <div
        className="container "
        // style={{ position: "relative" }}
        >
        <div className="row">
          <div className="bg-form col-12 justify-content-center mx-auto rounded mb-3 mt-2">
            <div className="mb-3 col-9 mx-auto bg-form mt-4">
              <div className="col col-lg-9 mx-auto">
                <h2 className="text-center">¿Qué buscas hoy?</h2>
              </div>

              <div className="col col-md-9 col-lg-9 mx-auto bg-form mt-5 ">
                <FormBusqueda busquedaquery={busquedaquery}/>
                {/* <form>
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
                        Últimos Productos
                      </option>
                      <option value="tablas">Tablas</option>
                      <option value="velas">Velas</option>
                      <option value="botavaras">Botavaras</option>
                      <option value="mastiles">Mastiles</option>
                      <option value="accesorios">Accesorios</option>
                    </select>
                  </div>
                </form> */}
              </div>
            </div>
          </div>
          <div className="col mx-auto">
            {/* <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-2 justify-content-center "> */}
              <ListaProductos productos={productos} />

              {/* {!productos
                ? null
                : productos.map((producto, busqueda) => (
                    <Producto
                      key={producto._id}
                      producto={producto}
                      busqueda={busqueda}
                    />
                  ))} */}
            {/* </div> */}
          </div>
          
          <div className="d-flex justify-content-center mt-4 ">
            {busquedaquery !== "ultimos_productos"
              ? 
              // <button className="btn btn-primary" onclick={masProductos}>Mostrar más Productos</button> 
              paginas.map((pagina) => (
                  <Link
                    type="submit"
                    key={pagina}
                    to={`/productos?busqueda=${busquedaquery}&page=${pagina}`}
                    className="rounded btn btn-select page-link"
                  >
                    {pagina + 1}
                  </Link>
                ))
              : null}
          </div>

          <div className="col mx-auto mt-4 mb-2">
            {busquedaquery === "ultimos_productos" ? (
              <Fragment>
                <div className="bg-form col-9 justify-content-center mx-auto rounded mb-3 mt-2">
                  <div className=" bg-form text-center mb-3 p-4 rounded">
                    <div className="col col-lg-9 mx-auto">
                      <h2 className=" ">Pide lo que Quieras Encontrar</h2>
                    </div>
                  </div>
                </div>

                <div className="col-12 mx-auto">
                  <ListadoPosts buscoPosts={buscoPosts} />
                  {/* <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-5 g-2 justify-content-center "> */}
                    {/* {!buscoPosts
                      ? null
                      : buscoPosts.map((buscoPost) => (
                          <BuscoPost
                            key={buscoPost._id}
                            buscoPost={buscoPost}
                          />
                        ))} */}
                  {/* </div> */}
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;
