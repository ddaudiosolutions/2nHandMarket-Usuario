import { Link } from "react-router-dom";
import {Fragment, useEffect,} from 'react'
import { logout } from "../actions/loginActions";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../helpers/history";

const Header = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
       // clear message when changing location
    });
  }, []);

  useEffect(() => {
    if (currentUser) {
      console.log("seguimos logueados");
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
// 
  return (
    <nav className="navbar  navbar-light bg-light">
      <div className="container-fluid">
        {currentUser ? (
          <Fragment>
            <Link to={"/productos"} className="nav-link">
              Home
            </Link>
            <Link to={"/productos/nuevo"} className="nav-link">
              Subir Producto
            </Link>
            <Link to={"/productos/user"} className="nav nav-link ">
              Mis Productos
            </Link>
            <Link
              to={"/home"}
              href="/login"
              className="nav-link"
              onClick={logOut}
            >
              LogOut
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
            <Link to={"/login"} className="nav-link">
              Login
            </Link>

            <Link to={"/nuevousuario"} className="nav-link">
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
