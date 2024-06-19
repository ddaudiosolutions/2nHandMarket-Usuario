import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header';
import Productos from './components/Productos/Productos';
import ProductosUser from './components/Productos/ProductosUser';
import NuevoProducto from './components/Productos/NuevoProducto';
import EditarProducto from './components/Productos/EditarProducto';
import CrearUsuario from './components/Usuario/CrearUsuario';
import Login from './components/Usuario/Login';
import VerProducto from './components/Productos/VerProducto';
import ProductosAuth from './components/Productos/ProductosAuth';
import Usuario from './components/Usuario/Usuario';
import SolicitarContraseña from './components/Usuario/SolicitarContraseña';
import EditarUser from './components/Usuario/EditarUser';
import Avatar from './components/Avatar';
import NuevoBuscoPost from './components/Productos/NuevoBuscoPost';
import VerBuscoPost from './components/Productos/VerBuscoPost';
import EditarBuscoPost from './components/Productos/EditarBuscoPost';
import Inicio from './components/Inicio';
import FavoriteProducts from './components/Productos/productosFavoritos/FavoriteProducts';
import { history } from './helpers/history';

// Redux
import { Provider } from 'react-redux';
import store from './app/store';
/* import { Helmet } from 'react-helmet'; */
import ResetPassword from './components/Usuario/ResetPassword';
import './App.css';
import { useEffect } from 'react';
// Importa la biblioteca de Google Analytics
import ReactGA from 'react-ga4';


function App() {

  useEffect(() => {
    // Inicializa Google Analytics con tu ID de seguimiento
    ReactGA.initialize('G-LN814BQ9FL');

    // Opcional: seguimiento de las vistas de página con React Router
    history.listen((location) => {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    });

  }, []);

  return (
    <Router history={history}>
      <Provider store={store}>
        <div className='container'></div>
        <Header />
        <div className='container'>
          <Switch>
            <Redirect exact from='/' to='productos?busqueda=ultimos_productos&page=0' />
            <Route exact path='/inicio' component={Inicio} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/productos/nuevo' component={NuevoProducto} />
            <Route exact path='/productos' component={Productos} />
            <Route exact path='/productos/auth/:id' component={ProductosAuth} />
            <Route exact path='/productos/user' component={ProductosUser} />
            <Route exact path='/productos/favoritos' component={FavoriteProducts} />
            <Route exact path='/usuarios/editar/:id' component={EditarUser} />
            <Route exact path='/productos/:productId' component={VerProducto} />
            <Route exact path='/usuarios/:id' component={Usuario} />
            <Route exact path='/forgotpassword' component={SolicitarContraseña} />
            <Route exact path='/forgotpassword/:id' component={ResetPassword} />
            <Route exact path='/usuarios/avatar/:id' component={Avatar} />
            <Route exact path='/productos/user/editar/:id' component={EditarProducto} />
            <Route exact path='/productos/user/:id' component={VerProducto} />
            <Route exact path='/nuevousuario' component={CrearUsuario} />
            <Route exact path='/buscoposts/nuevo' component={NuevoBuscoPost} />
            <Route exact path='/buscoposts/user/editar/:id' component={EditarBuscoPost} />
            <Route exact path='/buscoposts/:id' component={VerBuscoPost} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
