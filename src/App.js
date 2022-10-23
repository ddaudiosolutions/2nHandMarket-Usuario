import { useEffect } from "react";
import ReactGA from 'react-ga';
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
// import Bienvenida from "./components/Bienvenida";
import Productos from "./components/Productos";
import ProductosUser from "./components/ProductosUser";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
import CrearUsuario from "./components/CrearUsuario";
import Login from "./components/Login";
import VerProducto from "./components/VerProducto";
import ProductosAuth from "./components/ProductosAuth";
import Usuario from "./components/Usuario";
import EditarUser from "./components/EditarUser";
import Avatar from "./components/Avatar";
import NuevoBuscoPost from "./components/NuevoBuscoPost";
import VerBuscoPost from "./components/VerBuscoPost";
import EditarBuscoPost from "./components/EditarBuscoPost";
//import Inicio from './components/Inicio'
//import { logout } from "./actions/loginActions";
import { history } from "./helpers/history";
//import { clearMessage } from "./actions/message";

//Redux
import { Provider } from "react-redux";
import store from "./store";
//import Bienvenida from "./components/Bienvenida";

import { Helmet } from "react-helmet";

const Tracking_ID = '338632609'
ReactGA.initialize(Tracking_ID)

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router history={history}>
      <Provider store={store}>
        <div className="App">
          <Helmet>
            <meta property="og:type" content="Website" />
            <meta property="og:title" name="title" content="WindyMarket" />
            <meta
              property="”og:url”"
              content="https://windymarket.netlify.app/"
            />
            <meta
              property="og:description"
              name="description"
              content="Mercado de Material de Windsurf Foil de 2a Mano"
            />
            <meta
              property="og:image"
              name="image"
              content="https://res.cloudinary.com/dhe1gcno9/image/upload/v1632852406/WINDY_hwp53c.png"
            />
          </Helmet>
        </div>
        <Header />
        <div className="container">
          <Switch>
            {/* <Route exact path="/" component={Productos} /> */}
            <Redirect
              exact
              from="/"
              to="productos?busqueda=ultimos_productos&page=0"
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/productos/auth/:id" component={ProductosAuth} />
            <Route exact path="/productos/user" component={ProductosUser} />
            <Route exact path="/usuarios/editar/:id" component={EditarUser} />
            <Route exact path="/productos/:id" component={VerProducto} />
            <Route exact path="/usuarios/:id" component={Usuario} />
            <Route exact path="/usuarios/avatar/:id" component={Avatar} />
            <Route
              exact
              path="/productos/user/editar/:id"
              component={EditarProducto}
            />
            <Route exact path="/productos/user/:id" component={VerProducto} />
            <Route exact path="/nuevousuario" component={CrearUsuario} />
            <Route exact path="/buscoposts/nuevo" component={NuevoBuscoPost} />
            <Route
              exact
              path="/buscoposts/user/editar/:id"
              component={EditarBuscoPost}
            />
            <Route exact path="/buscoposts/:id" component={VerBuscoPost} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
