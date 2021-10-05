import { Link, Redirect } from "react-router-dom";
import { Fragment, useEffect } from "react";
import { logout } from "../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
//import { history } from "../helpers/history";
import "./Bienvenida.css";
const Header = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const nombreUser = localStorage.getItem("userN");
  //console.log(nombreUser)

  useEffect(() => {
    if (currentUser) {
      console.log("seguimos logueados");
      <Redirect to={"/productos?busqueda=ultimos_productos&page=0"}></Redirect>;
    } else {
      logOut();
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
  //
  return (
    <nav className="bg-nav  d-flex align-items-end ">
      <div className="container-fluid col ">
        <Link
          to={"/productos?busqueda=ultimos_productos&page=0"}
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
        {currentUser ? (
          <Fragment>
            <div className="">
              <div className=" d-flex text-center">
                <h5 className="typeHeader mt-1 text-center ">
                  Bienvenid@ {nombreUser}
                </h5>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-primary "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Mi Cuenta
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <Link
                      to={"/productos/nuevo"}
                      className="nav-link  typeHeader"
                    >
                      Subir Producto
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
                      to={"/home"}
                      href="/login"
                      className="nav-link typeHeader"
                      onClick={logOut}
                    >
                      LogOut
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* <Link to={"/productos/nuevo"} className="nav-link  typeHeader">
              Subir Producto
            </Link>
            <Link to={"/productos/user"} className="nav nav-link  typeHeader">
              Mis Productos
            </Link>
            <h5 className="nav nav-link  typeHeaderUser">{nombreUser}</h5>
            <Link
              to={"/home"}
              href="/login"
              className="nav-link typeHeader"
              onClick={logOut}
            >
              LogOut
            </Link> */}
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
