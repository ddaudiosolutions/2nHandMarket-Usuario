import { Fragment,  } from "react";
import { useSelector,   } from "react-redux";

import Producto from "./Producto";
import "./Producto.css";

const ProductosAuth = () => {

  const productos = useSelector((state) => state.productos.productosAuth);
    //console.log(productos[0].author.nombre)
    //const nombreAuthor = productos[0].author.nombre
  
  return (
    <Fragment>      
        <div>
            {/* <h2 className='mt-4 text-center'>Los Productos de {nombreAuthor}</h2> */}
        </div>
        <div className="row row-cols-2 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3 justify-content-center mt-5">
          {productos === undefined
            ? null
            : productos.map((producto) => (
                <Producto
                  key={producto._id}
                  producto={producto}                 
                />
              ))}
        </div>
      
      
    </Fragment>
  );
};

export default ProductosAuth;
