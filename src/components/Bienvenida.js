import { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

//import "./Bienvenida.css";


const Bienvenida = () => {
  return (
    <Fragment>
      <div className="row ">
        <Redirect to='/productos?busqueda=ultimos_productos&page=0' >  </Redirect>
      </div>
    </Fragment>
  );
};

export default Bienvenida;
