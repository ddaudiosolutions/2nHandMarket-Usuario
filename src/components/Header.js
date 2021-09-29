import { Link, Redirect } from "react-router-dom";
import { Fragment, useEffect } from "react";
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
      <Redirect to={"/productos?busqueda=ultimos_productos&page=0"}></Redirect>;
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
  //
  return (
    <nav className="bg-nav row justify-content-center">
      <div className="col col-lg-4 col-xl-4 ">
          <img
            src="/LOGO_CIRCULAR_SIN_FONDO.png"
            alt="WindyMArket_Logo"
            style={{ width: "8rem" }}
            className="d-flex ms-5 mt-3 mb-4"
          ></img>
        </div>
      <div className="col-6 d-flex  bg-nav rounded">        
        {currentUser ? (
          <Fragment>
            <Link
              to={"/productos?busqueda=ultimos_productos&page=0"}
              className="nav-link typeHeader mx-auto "
            >
              Home
            </Link>
            <Link to={"/productos/nuevo"} className="nav-link mx-auto typeHeader">
              Subir Producto
            </Link>
            <Link to={"/productos/user"} className="nav nav-link mx-auto typeHeader">
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
            {/* <Link to={"/home"} className="nav-link typeHeader">
              Home
            </Link> */}
            {/* <Link to={"/login"} className="nav-link typeHeader">
              Login
            </Link>

            <Link to={"/nuevousuario"} className="nav-link typeHeader">
              Registrase
            </Link> */}
          </Fragment>
        )}
      </div>
      {/* </div>*/}
    </nav>
  );
};

export default Header;
