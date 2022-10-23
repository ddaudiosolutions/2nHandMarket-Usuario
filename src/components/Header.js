import { Link,  } from "react-router-dom";
import { Fragment, useEffect, useState  } from "react";
import { logout } from "../actions/loginActions";
import { useDispatch } from "react-redux";
import { obtenerDatosUsuarioAction } from "../actions/loginActions";
//import { history } from "../helpers/history";
import { obtenerProductosAction } from "../actions/productoActions";

import "./Bienvenida.css";
import jwtDecode from "jwt-decode";


const Header = () => {  
  const dispatch = useDispatch();
  const nombreUser = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const userTokenCheck = localStorage.getItem('userToken')
  const date = Date.now()
  //console.log (Fecha)
  const [nombreUsuario, setNombreUsuario] = useState('')
  
  useEffect(() => {
    if(!userTokenCheck) {
      console.log('NO HAY TOKEN') 
      return null
    } else {
      const {exp} = jwtDecode(userTokenCheck)
      const expiredToken = (exp * 1000) - 60000      
      if(expiredToken < date){
        logOut()
      }
      setNombreUsuario(nombreUser)
    }
    // eslint-disable-next-line
  }, [ nombreUsuario]);

  const logOut = () => {
    dispatch(logout());
  };

  const reload = ()=> {    
    dispatch(obtenerProductosAction ('ultimos_productos', 0));
    //window.location = "/productos?busqueda=ultimos_productos&page=0";
  }
  
  //
  return (
    <nav className="bg-nav  d-flex align-items-end ">
      <div className="container-fluid col ">
        <Link
          to={"/productos?busqueda=ultimos_productos&page=0"}
          onClick={()=>{reload()}}
          className="nav-link typeHeader  "
        >
          <img
            src="/LOGO_CIRCULAR_SIN_FONDO.png"
            alt="WindyMArket_Logo"
            style={{ width: "8rem" }}
            className="navbar-brand ms-4 mt-2 mb-2"
          ></img>
        </Link>
      </div>
      <div className=" me-4 mb-3">
        {userTokenCheck === null ? (
          <Fragment>       
            <div className="d-flex ">
              <Link to={"/login"} className="nav-link typeHeader ">
                Login
              </Link>
            </div>
            <div className="d-flex">
              <Link to={"/nuevousuario"} className="nav-link typeHeader ">
                Registrarse
              </Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="">
              <div className="container text-center">               
                <div className="d-flex justify-content-center">
                  <h5 className="typeHeader mt-3 ">
                    Bienvenid@ {nombreUsuario}
                  </h5>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Mi Cuenta
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to={"/productos/nuevo"}
                        className="nav-link typeHeader"
                      >
                        Subir Producto
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/buscoposts/nuevo"}
                        className="nav-link typeHeader"
                      >
                        Publicar Busqueda
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/productos/user"}
                        className="nav-link  typeHeader"
                      >
                        Mis Productos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/usuarios/${userId}`}
                        className="nav-link typeHeader"
                        onClick={() => {
                          dispatch(obtenerDatosUsuarioAction({ userId }));
                        }}
                      >
                        Mi perfil
                      </Link>
                    </li>                   
                    <li>
                      <Link
                        //to={"/productos?busqueda=ultimos_productos&page=0"}                        
                        className="nav-link typeHeader"
                        onClick={logOut}
                      >
                        LogOut
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

export default Header;
