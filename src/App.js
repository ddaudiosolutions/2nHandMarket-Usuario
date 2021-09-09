import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
//import Header from "./components/Header";
import Bienvenida from './components/Bienvenida';
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
    <Fragment>
      <Router history={history}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#menu1"
              aria-controls="menu1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="menu1">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* <li className="nav-item">
                  <Link to={"/home"} className="nav-link active">
                    Home
                  </Link>
                </li> */}
                <li className="navbar-nav nav-item">
                  {currentUser ? (
                    <div className="navbar-nav ">
                      <li className="nav-item">
                        <Link to={"/productos"} className="nav-link">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/productos/nuevo"} className="nav-link">
                          Subir Producto
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to={"/productos/user"} className="nav nav-link ">
                          Mis Productos
                        </Link>
                      </li>
                      <li className="nav-item ">
                        <Link to={'/home'}
                          href="/login"
                          className="nav-link"
                          onClick={logOut}
                        >
                          LogOut
                        </Link>
                      </li>
                    </div>
                  ) : (
                    <Fragment>
                      <div className="navbar-nav ">
                        <li className="nav-item ">
                          <Link to={"/login"} className="nav-link">
                            Login
                          </Link>
                        </li>
                      </div>
                      <div>
                        <li className="nav-item">
                          <Link to={"/nuevousuario"} className="nav-link">
                            Registrase
                          </Link>
                        </li>
                      </div>
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Bienvenida} />
            <Route exact path="/home" component={currentUser ? Productos : Bienvenida} />
            <Route exact path="/login" component={Login} />
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
            {/* <Route exact path="/login" component={Login} /> */}
          </Switch>
        </div>
      </Router>
      
    </Fragment>
  );
}

export default App;
