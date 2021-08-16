import { Link } from "react-router-dom";
const Header = () => {
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


           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
