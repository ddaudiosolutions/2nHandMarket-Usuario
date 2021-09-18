import { Fragment } from "react";
import {  Link } from "react-router-dom";

//import "./Bienvenida.css";


const Bienvenida = () => {
  return (
    <Fragment>
      <div className="row h-200 ">
        
          <div className=" row bg-transparent">
            <h2 className="text-center my-5 ">
              MERCADO DE 2A MANO NO PROFESIONAL
            </h2>
          </div>
          <div className="row">
            <div className="col-sm-12 text-center g-5">              
              <Link to='/nuevousuario' >
                <button
                data-cy='btn-registrate'
                  className="btn btn-success btn-md me-2"
                  style={{ color: "black" }}>
                  Registrarse
                </button>
                </Link>
              
              <Link to="/login">
                <button
                data-cy='btn-iniciarsesion'
                  className="btn btn-warning btn-md ms-3"
                  style={{ color: "black" }}
                >
                  Iniciar Sesion
                </button>
              </Link>
            </div>
          </div>
        
      </div>
    </Fragment>
  );
};

export default Bienvenida;
