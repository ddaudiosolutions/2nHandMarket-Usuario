import { Link, useHistory } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './Bienvenida.css';
import jwtDecode from 'jwt-decode';
import { logOutUsuario } from '../slices/usersSlice';
import { obtenerProductos } from '../slices/productSlice';
import { cargarProductosAuthor } from '../helpers/utils';

const Header = () => {
  const dispatch = useDispatch();
  const nombreUser = sessionStorage.getItem('userName');
  const userId = sessionStorage.getItem('userId');
  const userTokenCheck = sessionStorage.getItem('userToken');
  const date = Date.now();
  const history = useHistory();

  const [nombreUsuario, setNombreUsuario] = useState('');
  useEffect(() => {
    // Solo proceder si userTokenCheck existe
    if (userTokenCheck) {
      const { exp } = jwtDecode(userTokenCheck);
      const expiredToken = exp * 1000 - 60000;
      if (expiredToken < date) {
        logOut();
      } else {
        setNombreUsuario(nombreUser);
      }
    }
    // Nota: No hay un `return` explícito aquí, lo que significa que este useEffect
    // retorna `undefined` por defecto, cumpliendo con las reglas de React.
  }, [nombreUser, userTokenCheck, date]); // Asegúrate de incluir todas las dependencias relevantes

  const logOut = (nombreUser) => {
    dispatch(logOutUsuario(nombreUser));
  };

  const reload = () => {
    dispatch(obtenerProductos('ultimos_productos', 0));
    window.location = '/productos?busqueda=ultimos_productos&page=0';
  };

  return (
    <>
      <nav className='mt-2 bg-nav  d-flex align-items-end '>
        <div className='container-fluid col-md '>
          <Link
            to={'/productos?busqueda=ultimos_productos&page=0'}
            onClick={reload}
            className='nav-link typeHeader  '
          >
            <img
              src='/LOGO_CIRCULAR_SIN_FONDO.png'
              alt='WindyMArket_Logo windsurf segunda mano'
              style={{ width: '8rem' }}
              className='navbar-brand ms-4 mt-2 mb-2'
            ></img>
          </Link>
        </div>
        <div className=' me-4 mb-3'>
          {userTokenCheck === null ? (
            <Fragment>
              <div className='d-flex '>
                <Link to={'/login'} className='nav-link typeHeader '>
                  Login
                </Link>
              </div>
              <div className='d-flex'>
                <Link to={'/nuevousuario'} className='nav-link typeHeader '>
                  Registrarse
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className=''>
                <div className='container text-center'>
                  <div className='d-flex justify-content-center'>
                    <h5 className='typeHeader mt-3 '>Bienvenid@ {nombreUsuario}</h5>
                  </div>

                  <div className='d-flex justify-content-center'>
                    <button
                      type='button'
                      className='btn btn-outline-primary ms-1'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      Mi Cuenta
                    </button>
                    <ul className='dropdown-menu'>
                      <li>
                        <Link to={'/productos/nuevo'} className='nav-link typeHeader'>
                          Subir Producto
                        </Link>
                      </li>
                      <li>
                        <Link to={'/buscoposts/nuevo'} className='nav-link typeHeader'>
                          Publicar Busqueda
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/productos/auth/${userId}`}
                          className='nav-link  typeHeader'
                          onClick={() =>
                            cargarProductosAuthor(dispatch, history, { author: { _id: userId } })
                          }
                        >
                          Mis Productos
                        </Link>
                      </li>
                      <li>
                        <Link to={`/productos/favoritos/`} className='nav-link  typeHeader'>
                          Favoritos
                        </Link>
                      </li>
                      <li>
                        <Link to={`/usuarios/${userId}`} className='nav-link typeHeader'>
                          Mi perfil
                        </Link>
                      </li>
                      <li
                        type='button'
                        className='nav-link typeHeader'
                        onClick={() => {
                          logOut({ nombreUser });
                        }}
                      >
                        LogOut
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
