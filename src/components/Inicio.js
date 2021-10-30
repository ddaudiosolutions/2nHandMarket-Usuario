
import {  Redirect } from "react-router-dom";


const Inicio = () => {
    return (
        <Redirect to='productos?busqueda=ultimos_productos&page=0'></Redirect>
     );
}
 
export default Inicio;