import { Fragment } from "react";
import {  Link } from "react-router-dom";

//import "./Bienvenida.css";


const Bienvenida = () => {
  return (
    <Fragment>
      <div className="row ">
        
          <div className="row">            
            <div className="col-sm-12 text-center g-5">  
            <img src='/WINDMARKET_LOGO_CIRCULO_uadyzn.png' 
            alt='WindyMArket_Logo' style={{width:'20%'}} className='me-3'></img>            
              {/* <Link to='/nuevousuario' >
                <button
                  data-cy='btn-registrate'
                  className="btn btn-outline-success me-2"
                  >
                  Registrarse
                </button>
                </Link>
              
              <Link to="/login">
                <button
                data-cy='btn-iniciarsesion'
                  className="btn btn-outline-info  ms-3"
                  
                >
                  Iniciar Sesion
                </button>
              </Link> */}
              <Link to='/productos?busqueda=ultimos_productos&page=0' >
                <button
                  data-cy='btn-registrate'
                  className="btn btn-outline-success me-2"
                  >
                  Entrar
                </button>
                </Link>
            </div>
          </div>
        
      </div>
    </Fragment>
  );
};

export default Bienvenida;
