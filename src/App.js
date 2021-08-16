import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";
//import Login from "./components/Login";
import VerProducto from "./components/VerProducto";
//Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL)
  return (
    <Router>
      <Provider store={store}>
        <Header />

        <div className="container">
          <Switch>
            <Route exact path="/" component={Productos} />
            <Route exact path="/productos/nuevo" component={NuevoProducto} />
            <Route
              exact
              path="/productos/editar/:id"
              component={EditarProducto}
            />
            <Route exact path="/productos" component={Productos} />
            <Route exact path="/productos/:id" component={VerProducto} />
            {/* <Route exact path="/login" component={Login} /> */}
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
