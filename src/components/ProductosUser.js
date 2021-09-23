import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosActionUser } from "../actions/productoActions";
import ProductoUser from "./ProductoUser";
import PaginasBtn from './PaginasBtn';

const Productos = () => {
  const productos = useSelector((state) => state.productos.prodUser);
  const paginasUserTotal = useSelector((state) => state.productos.paginasUser);

  const paginasUser = new Array(paginasUserTotal).fill(null).map((v, i) => i);

  const [pageNuser, setPageNuser] = useState("0")

   const envioPagina = (pagina) => {
     setPageNuser(pagina)
   }

  const dispatch = useDispatch();

  const cargarProductosUser = (pageNuser) => dispatch(obtenerProductosActionUser(pageNuser));
  useEffect(() => {
    //consultar la API
    
    cargarProductosUser(pageNuser);
    envioPagina()
    // eslint-disable-next-line
  }, [pageNuser]);
  
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
        <div>
          {paginasUser.map((paginaUser) => (
            // <button
            //   key={paginaUser}
            //   onClick={() =>{setPageNuser(paginaUser); console.log("paginas user pulsada")}}
            // >
            //   {paginaUser + 1}
            // </button>
            <PaginasBtn key={paginaUser} paginaS={paginaUser} envioPagina={envioPagina}/>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;
