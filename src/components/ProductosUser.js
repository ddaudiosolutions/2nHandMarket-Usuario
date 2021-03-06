import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerProductosActionUser } from "../actions/productoActions";
import {obtenerBuscoPostsUserAction} from '../actions/buscoPostActions'
import ProductoUser from "./ProductoUser";
import BuscoPostUser from "./BuscoPostUser";
//import PaginasBtn from './PaginasBtn';

const Productos = () => {
  const productos = useSelector((state) => state.productos.prodUser);
  const buscoPostsUser = useSelector((state)=> state.buscoposts.buscoPostsUser);
  const [pageNuser, setPageNuser] = useState("0")
   const envioPagina = (pagina) => {
     setPageNuser(pagina)
   }

  const dispatch = useDispatch();
  const cargarProductosUser = (pageNuser) => dispatch(obtenerProductosActionUser(pageNuser));
  const cargarPostsUser = ()=> dispatch(obtenerBuscoPostsUserAction())

  useEffect(() => {
    //consultar la API    
    cargarProductosUser(pageNuser);
    envioPagina()
    cargarPostsUser()
    // eslint-disable-next-line
  }, [pageNuser]);
  
  return (
    <Fragment>
     
        <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center ">
          {productos === undefined
            ? null
            : productos.map((producto) => (
                <ProductoUser key={producto._id} producto={producto} />
              ))}
        </div>
        <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center ">
        {buscoPostsUser === undefined
            ? null
            : buscoPostsUser.map((postUser) => (
                <BuscoPostUser key={postUser._id} postUser={postUser} />
              ))}
        </div>
       
    </Fragment>
  );
};

export default Productos;
