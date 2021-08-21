import { Link } from "react-router-dom";
//import { logout } from "../actions/loginActions";
//i//mport { useDispatch, useSelector } from "react-redux";
//import {history} from './helpers/history'

const Header = () => {
  //const {user: currentUser} = useSelector((state) => state.registroReducer)
 // const dispatch = useDispatch()
  

  return (
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
            <Link to={'/'} className="nav-link active">
              Home
            </Link>

            <Link to={'/productos'} className="nav-link active" >
              Productos
            </Link>

            <Link to={'/productos/nuevo'} className="nav-link active" >
              Nuevo-Producto
            </Link>

            <Link to={'/nuevousuario'} className="nav-link active" >
              Resgistrate
            </Link>

            {/* <Link to={'/login'} className="nav-link active" >
              LogIn
            </Link> */}

            
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
