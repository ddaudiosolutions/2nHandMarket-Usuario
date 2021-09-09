import { Fragment } from "react";
import {  Link } from "react-router-dom";

import "./Bienvenida.css";


const Bienvenida = () => {
  return (
    <Fragment>
      <div className="row h-200 ">
        
          <div className="row bg-transparent">
            <h2 className="text-center my-5 m-5">
              MERCADO DE 2A MANO NO PROFESIONAL
            </h2>
          </div>
          <div className="row">
            <div className="col-sm-12 text-center g-5">              
              <Link to='/nuevousuario'  >
                <button
                  className="btn btn-success btn-md"
                  style={{ color: "black" }}>
                  REGISTRATE
                </button>
                </Link>
              
              <Link to="/login">
                <button
                  className="btn btn-warning btn-md"
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
