import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//import Header from "./components/Header";
import Productos from "./components/Productos";
import ProductosUser from "./components/ProductosUser";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import CrearUsuario from "./components/CrearUsuario";
import Login from "./components/Login";
import VerProducto from "./components/VerProducto";
import { logout } from "./actions/loginActions";
import { history } from "./helpers/history";
import { clearMessage } from "./actions/message";
//Redux
import { useDispatch, useSelector } from "react-redux";

function App() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      console.log("seguimos logueados");
    }
  }, [currentUser]);

  const logOut = () => {
    dispatch(logout());
  };
  return (
    <Router history={history}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to={"/productos"} className="nav-link active">
                Home
              </Link>

              {currentUser ? (
                <div className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link to={"/productos/nuevo"} className="nav-link">
                      Subir Producto
                    </Link>
                  </li>
                  <li className="nav-item ms-auto">
                    <Link to={"/productos/user"} className="nav-link">
                      User
                    </Link>
                  </li>
                  <li className="nav-item ms-auto">
                    <Link href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </Link>
                  </li>
                </div>
              ) : (
                <Fragment>
                  <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                      </Link>
                    </li>
                  </div>
                  <div>
                    <li className="nav-item mx-auto">
                      <Link to={"/nuevousuario"} className="nav-link">
                        Registrase
                      </Link>
                    </li>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <Switch>
          <Route exact path="[/]" component={Login} />
          <Route exact path="/productos/nuevo" component={NuevoProducto} />
          <Route exact path="/productos" component={Productos} />
          <Route exact path="/productos/user" component={ProductosUser} />
          <Route exact path="/productos/:id" component={VerProducto} />
          <Route
            exact
            path="/productos/user/editar/:id"
            component={EditarProducto}
          />
          <Route exact path="/productos/user/:id" component={VerProducto} />   
          <Route exact path="/nuevousuario" component={CrearUsuario} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
