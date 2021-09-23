import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosAction } from "../actions/productoActions";
import Producto from "./Producto";
import PaginasBtn from "./PaginasBtn";

const Productos = () => {

  const productos = useSelector((state) => state.productos.productos);
  const paginasTotales = useSelector((state) => state.productos.paginas);
  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);

  const [busqueda, setBusqueda] = useState('all'); //SELECCION DE CATEGORIA DE PRODUCTOS A MOSTRAR  
  
  const [pageNumber, setPageNumber] = useState();

  //PARA PODER RECIBIR DEL COMPONENTE PAGINASBTN LOS VALORES DE LOS NUM Y EL CAMBIO (ES EL CHILD)
  const envioPagina = (pagina) => {
    console.log(pagina);
    setPageNumber(pagina);
  };

  const dispatch = useDispatch();

  const cargarProductos = (busqueda, pageNumber) =>
    dispatch(obtenerProductosAction(busqueda, pageNumber));
  
  useEffect(() => {     
   
    cargarProductos(busqueda, pageNumber);
    console.log("vuelvo a llar a la api");
    // eslint-disable-next-line
  }, [busqueda, pageNumber ]);

  console.log(pageNumber);
  
  return (
    <Fragment>
      <div
        className="container-fluid  my-2 p-1 mt-4"
        style={{ position: "relative" }}
      >
        <div>
          {/* <h2 className="text-center">ENCUENTRA LO QUE ESTÁS BUSCANDO</h2> */}
          <div className=" mb-3 col-6 mx-auto">
            <form>
              <div className="container d-flex ">
                <select
                  className="form-select col-6"
                  defaultValue={busqueda}
                  name="categoria"
                  //value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                >
                  {/* <option value="" selected>
                  Selecciona el tipo de producto
                </option> */}
                  <option value="all">Ver Últimos los Productos</option>
                  <option value="tabla">Tabla</option>
                  <option value="vela">Vela</option>
                  <option value="botavara">Botavara</option>
                  <option value="mastil">Mastil</option>
                  <option value="accesorio">Accesorio</option>
                </select>
                {/* <button className="btn btn-outline-primary text-center ms-2">
                  Buscar
                </button> */}
              </div>
            </form>
            <div>
              <h2 className="mt-5 text-center">Categoria: {busqueda}</h2>
            </div>
            {/* <label className="mb-2">Selecciona el tipo de producto</label> */}
          </div>
        </div>
        <div className=" row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 ">
          {productos === undefined
            ? null
            : productos.map((producto, busqueda) => (
                <Producto key={producto._id} producto={producto} busqueda={busqueda}/>
              ))}
        </div>
        <div className="d-flex justify-content-center mt-4 ">
          {paginas.map((pagina) => (
            <PaginasBtn
              key={pagina}
              paginaS={pagina}
              envioPagina={envioPagina}
            />
            // <button
            //   key={pagina}
            //   onClick={(e) => {
            //     setPageNumber(pagina);
            //     console.log("pulsando" + pagina);
            //   }}
            // >
            //   {pagina + 1}
            // </button>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;
