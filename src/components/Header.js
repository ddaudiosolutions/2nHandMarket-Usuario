import { Link,  } from "react-router-dom";
import { Fragment, useEffect,  } from "react";
import { logout } from "../actions/loginActions";
import { useDispatch } from "react-redux";
import { obtenerDatosUsuarioAction } from "../actions/loginActions";
//import { history } from "../helpers/history";
import "./Bienvenida.css";
const Header = () => {
  //const { user: currentUser } = useSelector((state) => state.auth);
  //const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const nombreUser = localStorage.getItem("userName");
  const userId = localStorage.getItem("userId");
  const userTokenCheck = localStorage.getItem('userToken')
  //console.log(user.user)
  // const avatarGet = useSelector((state) => state.auth.avatar);
  //console.log(avatarGet.imagesAvatar);

  //const [avatarUrl, setAvatarUrl] = useState('')

  //const avatar = (userId) => dispatch(obtenerAvatarAction(userId));

  useEffect(() => {}, []);

  const logOut = () => {
    dispatch(logout());
  };
  //
  return (
    <nav className="bg-nav  d-flex align-items-end ">
      <div className="container-fluid col ">
        <Link
          to={"/productos?busqueda=ultimos_productos&page=0"}
          className="nav-link typeHeader  "
        >
          <img
            src="/LOGO_CIRCULAR_SIN_FONDO.png"
            alt="WindyMArket_Logo"
            style={{ width: "8rem" }}
            className="navbar-brand ms-4 mt-2 mb-2"
          ></img>
        </Link>
      </div>
      <div className=" me-4 mb-3">
        {userTokenCheck === null ? (
          <Fragment>
            {/* <Link to={"/productos?busqueda=ultimos_productos&page=0"} className="nav-link typeHeader">
              Home
            </Link>  */}
            <div className="d-flex ">
              <Link to={"/login"} className="nav-link typeHeader ">
                Login
              </Link>
            </div>
            <div className="d-flex">
              <Link to={"/nuevousuario"} className="nav-link typeHeader ">
                Registrase
              </Link>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="">
              <div className=" d-flex">
                {/* <img
                 src={avatarUrl}
                 className="me-3"
                 style={{ width: "3rem" }}
                 alt={'foto Avatar'}
               ></img>  */}
                <div className="d-flex justify-content-center">
                  <h5 className="typeHeader mt-3 ">
                    Bienvenid@ {nombreUser}
                  </h5>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary ms-1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Mi Cuenta
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link
                        to={"/productos/nuevo"}
                        className="nav-link typeHeader"
                      >
                        Subir Producto
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/productos/user"}
                        className="nav-link  typeHeader"
                      >
                        Mis Productos
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/usuarios/${userId}`}
                        className="nav-link typeHeader"
                        onClick={() => {
                          dispatch(obtenerDatosUsuarioAction({ userId }));
                        }}
                      >
                        Mi perfil
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        to={`/usuarios/avatar/${userId}`}
                        className="nav-link typeHeader"
                      >
                        Avatar
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        to={"/productos?busqueda=ultimos_productos&page=0"}
                        href="/login"
                        className="nav-link typeHeader"
                        onClick={logOut}
                      >
                        LogOut
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </nav>
  );
};

export default Header;
