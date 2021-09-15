//import { Fragment, useEffect } from "react";
import {  Router, Route, Switch, } from "react-router-dom";
import Header from "./components/Header";
import Bienvenida from "./components/Bienvenida";
import Productos from "./components/Productos";
import ProductosUser from "./components/ProductosUser";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import CrearUsuario from "./components/CrearUsuario";
import Login from "./components/Login";
import VerProducto from "./components/VerProducto";
//import { logout } from "./actions/loginActions";
import { history } from "./helpers/history";
//import { clearMessage } from "./actions/message";

//Redux
import { Provider} from "react-redux";
import store from "./store";

function App() {
  // const { user: currentUser } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   history.listen((location) => {
  //     dispatch(clearMessage()); // clear message when changing location
  //   });
  // }, [dispatch]);

  // useEffect(() => {
  //   if (currentUser) {
  //     console.log("seguimos logueados");
  //   }
  // }, [currentUser]);

  // const logOut = () => {
  //   dispatch(logout());
  // };
  return (
    // <Fragment>
    //(
      <Router history={history}>
        <Provider store={store}>
          {/* <nav className="navbar  navbar-light bg-light">
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
          </div> */}
          {/* </div>*/}
          {/* </nav> */}
          
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Bienvenida} />
              <Route exact path="/home" component={Bienvenida} />
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
        </Provider>
      </Router>
    //),
    //{
      /* </Fragment> */
   // }
  );
}

export default App;
