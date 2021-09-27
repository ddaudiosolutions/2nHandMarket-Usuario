import { Link, Redirect } from "react-router-dom";
import {Fragment, useEffect,} from 'react'
import { logout } from "../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
//import { history } from "../helpers/history";
import "./Bienvenida.css";
const Header = () => {  
 
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      console.log("seguimos logueados");
      <Redirect to={'/productos?busqueda=all&page=0'}></Redirect>
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
// 
  return (
    <nav className="navbar  navbar-light shadow-sm bg-nav">
      <div className="container-fluid">
        {currentUser ? (
          <Fragment>
            <Link to={'/productos?busqueda=all&page=0'} className="nav-link typeHeader">
              Home
            </Link>
            <Link to={"/productos/nuevo"} className="nav-link typeHeader">
              Subir Producto
            </Link>
            <Link to={"/productos/user"} className="nav nav-link typeHeader">
              Mis Productos
            </Link>
            <Link
              to={"/home"}
              href="/login"
              className="nav-link typeHeader"
              onClick={logOut}
            >
              LogOut
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link to={"/home"} className="nav-link typeHeader">
              Home
            </Link>
            <Link to={"/login"} className="nav-link typeHeader">
              Login
            </Link>

            <Link to={"/nuevousuario"} className="nav-link typeHeader">
              Registrase
            </Link>
          </Fragment>
        )}
      </div>
      {/* </div>*/}
    </nav>
  );
};

export default Header;
