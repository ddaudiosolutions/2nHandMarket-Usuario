import { Fragment, } from "react";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch,  } from "react-redux";
import {eliminarUsuarioAction, obtenerDatosUsuarioEditarAction, logout} from '../actions/loginActions';

import './Usuario.css'
import Swal from 'sweetalert2'
const Usuario = () => {

  const dispatch = useDispatch();
  const userId = localStorage.getItem('userId')
  console.log(userId)

  const datosUsuario = useSelector((state) => state.auth.datosUsuario);
  if (!datosUsuario) return null;
  console.log(datosUsuario);

  const logOut = () => {
    dispatch(logout());
    window.location = "/productos?busqueda=ultimos_productos&page=0";
  };

  const confirmarBorrarUsuario = (_id) => {
    Swal.fire({
      title: "Seguro quieres eliminar ?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar Usuario!",
    }).then((result) => {
      if (result.isConfirmed) {        
        dispatch(eliminarUsuarioAction(_id));
        logOut()
        
      }
    });
    //history.push('/productos')
  };
 
  return (
    <Fragment>
      <div className="row col-10 rotulo mx-auto text-center justify-content-center mt-3">
        <h3 className="loginH3Us">Datos de {datosUsuario.nombre}</h3>
      </div>
      <div className="card1 col-10 mx-auto">
        <div
          className="row justify-content-center">

          <div className="col col-lg-4 col-xl-4 ms-2">
            
            <div className="rounded m-3 bg-transparent">
              <div className="form-group mb-2">
                <label className="loginLabel">Nombre</label>
                <div data-cy="nombre" type="text" className="form-control">
                  {datosUsuario.nombre}
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="loginLabel" htmlFor="username">
                  E-mail
                </label>
                <div
                  data-cy="email"
                  type="text"
                  className="form-control"
                  //value={datosUsuario.email}
                >
                  {datosUsuario.email}
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="loginLabel">Telef</label>
                <div
                  data-cy="telefono"
                  type="text"
                  className="form-control"
                  //value={datosUsuario.email}
                >
                  {datosUsuario.telefono}
                </div>
              </div>
              <div className="form-group mb-2">
                <label className="loginLabel">Direccion</label>
                <div
                  data-cy="direccion"
                  type="text"
                  className="form-control"
                  //value={datosUsuario.email}
                >
                  {datosUsuario.direccion}
                </div>
              </div>
              {/* <div className="form-group mb-2">
                <label className="loginLabel">Avatar</label>
                <div
                  data-cy="avatar"
                  type="text"
                  className="form-control"
                  //value={datosUsuario.email}
                >
                  {datosUsuario.avatar}
                </div>
              </div> */}
              <div className='text-center'>
              {datosUsuario.imagesAvatar[0].url === undefined  ? (
              <img
                src="/Avatar_Default2.png"
                className="card-img-topAvatar ms-4 mt-3"
                alt="avatar para User"
              ></img>
            ) : (
              <img
                src={datosUsuario.imagesAvatar[0].url}
                className="card-img-topAvatar mt-3 mb-3"
                alt="avatar for User"
              ></img>
            )}
              </div>              
              <div className="text-center">
              <Link
                    to={`/usuarios/editar/${userId}`}
                    className='nav-link typeHeader'
                    onClick={()=>dispatch(obtenerDatosUsuarioEditarAction({datosUsuario}))}
                    >
                    Editar
                    </Link>
              </div>
              <div className="text-center">
              <button
                   // to={`/usuarios/editar/${userId}`}
                    className='nav-link typeHeader'
                    onClick={()=>confirmarBorrarUsuario(datosUsuario._id)}
                    >
                    Eliminar Usuario
                    </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Usuario;
