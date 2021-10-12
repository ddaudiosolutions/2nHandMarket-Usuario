//import { Fragment, useEffect } from "react";
import {  Router, Route, Switch, } from "react-router-dom";
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
import Usuario from './components/Usuario';
import EditarUser from './components/EditarUser';
import Avatar from './components/Avatar'
//import { logout } from "./actions/loginActions";
import { history } from "./helpers/history";
//import { clearMessage } from "./actions/message";

//Redux
import { Provider} from "react-redux";
import store from "./store";
import Bienvenida from "./components/Bienvenida";

function App() {
  
  return (
    // <Fragment>
    //(
      <Router history={history}>
        <Provider store={store}>          
          
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Productos} />
              {/* <Route exact path="/home" component={Productos} /> */}
              <Route exact path="/login" component={Login} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/auth" component={ProductosAuth} />
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
