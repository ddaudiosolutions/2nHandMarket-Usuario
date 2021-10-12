import { Fragment, useState, useEffect} from "react";
import { useSelector, useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
//import FormData from "form-data";
import {editarDatosUsuarioAction} from '../actions/loginActions';
import "./Usuario.css";

const EditarUser = () => {
  const dispatch = useDispatch()
  const history = useHistory();
  const datosUsuarioEditar = useSelector(
    (state) => state.auth.datosUsuarioEditar.datosUsuario
  );
  console.log(datosUsuarioEditar);

  //GUARDAMOS LOS VALORES DE TODO EL OBJETO (USUARIO)
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    telefono:'',
    direccion:'',
    _id:''

  })

  //LLENAMOS LOS VALORES DEL OBJETO, CON LOS VALORES QUE YA TENÍAMOS GUARDADOS ANTES DE LA EDICIÓN
  useEffect(()=>{
    setUsuario(datosUsuarioEditar);
  },  [datosUsuarioEditar])
  
  //GUARDAMOS LOS NUEVOS VALORES SI HAY CAMBIOS
  const onChangeFormulario = (e)=>{
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }

  const {nombre, email, telefono, direccion,} = usuario;
  
  
  const envioDatosEditados = (usuario) => dispatch(editarDatosUsuarioAction(usuario))
    
  //ENVIAMOS LOS CAMBIOS HACIA EL SERVIDOR
  const submitEditarUsuario = (e)=> {
    e.preventDefault()    
   
    envioDatosEditados(usuario)
    history.push(`/productos?busqueda=ultimos_productos&page=0`)
  }

  return (
    <Fragment>
      <div className="row col-10 rotulo mx-auto text-center justify-content-center mt-3">
        <h3 className="loginH3Us">Datos de DAVID</h3>
      </div>
      <div className="card1 col-10 mx-auto">
        <div className="row justify-content-center">
          <div className="col col-lg-4 col-xl-4 ms-2">
            <div className="rounded m-3 bg-transparent">
              <form onSubmit={submitEditarUsuario}>
                <div className="form-group mb-2">
                  <label className="loginLabel">Nombre</label>
                  <input
                    data-cy="nombre"
                    name='nombre'
                    defaultValue={nombre}
                    onChange={onChangeFormulario}
                    className="form-control"
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="loginLabel" htmlFor="username">
                    E-mail
                  </label>
                  <input
                    data-cy="email"
                    type="text"
                    name='email'
                    className="form-control"
                    defaultValue={email} 
                    onChange={onChangeFormulario}
                  >                    
                  </input>
                </div>
                <div className="form-group mb-2">
                  <label className="loginLabel">Telef</label>
                  <input
                    data-cy="telefono"
                    type="text"
                    name='telefono'
                    className="form-control"
                    defaultValue={telefono}
                    onChange={onChangeFormulario}
                  >
                    
                  </input>
                </div>
                <div className="form-group mb-2">
                  <label className="loginLabel">Direccion</label>
                  <input
                    data-cy="direccion"
                    type="text"
                    name='direccion'
                    className="form-control"
                    defaultValue={direccion}
                    onChange={onChangeFormulario}
                  >
                    
                  </input>
                </div>
                {/* <div className="form-group mb-2">
                  <label className="loginLabel">Avatar</label>
                  <input
                    data-cy="avatar"
                    id='imagesAvatar'
                    type="file"
                    className="form-control"
                    //defaultValue={imagesA}
                    onChange={(e) => setImagesA(e.target.files[0])}
                  >
                    
                  </input>
                </div> */}
                <div className='mb-3 mt-3 text-center'>
                  <button className="btn btn-outline-warning"
                type="submit" >Editar Usuario</button>
                </div>
              </form>

              <div className="text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditarUser;
