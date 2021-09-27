import './Producto.css'
import { Link} from "react-router-dom";
import { useSelector} from "react-redux";

const PaginasBtn = ({paginaS, envioPagina,  busquedaquery}) => {

    

    const paginaActual = useSelector((state) => state.productos.paginaActual);
    console.log(paginaActual)
    return ( 
        <button className='rounded btn btn-select page-link ' onClick={() => {   
            // <Link to={`/productos?busqueda=${busquedaquery}&page=${paginaS}`} className="btn btn-outline-success"/>             
            envioPagina(paginaS)
            console.log(paginaS, busquedaquery)
               }}>{paginaS + 1}</button>
     );
}
 
export default PaginasBtn;