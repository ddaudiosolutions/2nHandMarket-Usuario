import { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import FormData from "form-data";
import { editarDatosUsuarioAction } from "../actions/loginActions";
import "./Usuario.css";

const EditarUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [imagesAvatar, setImagesAvatar] = useState("");
  //const [newimages, setNewImages] = useState('');

  const [id, setId] = useState("");
  console.log(id)
  const datosUsuarioEditar = useSelector(
    (state) => state.auth.datosUsuarioEditar.datosUsuario
  );
  console.log(datosUsuarioEditar);

  //GUARDAMOS LOS VALORES DE TODO EL OBJETO (USUARIO)
  // const [usuario, setUsuario] = useState({
  //   nombre: '',
  //   email: '',
  //   telefono:'',
  //   direccion:'',
  //   _id:'',
  //   imagesAvatar: ''

  // })

  //LLENAMOS LOS VALORES DEL OBJETO, CON LOS VALORES QUE YA TENÍAMOS GUARDADOS ANTES DE LA EDICIÓN
  useEffect(() => {
    //setUsuario(datosUsuarioEditar);
    setNombre(datosUsuarioEditar.nombre);
    setEmail(datosUsuarioEditar.email);
    setTelefono(datosUsuarioEditar.telefono);
    setDireccion(datosUsuarioEditar.direccion);
    setImagesAvatar(datosUsuarioEditar.imagesAvatar[0].url);
    setId(datosUsuarioEditar._id);
  }, [datosUsuarioEditar]);

  //GUARDAMOS LOS NUEVOS VALORES SI HAY CAMBIOS
  // const onChangeFormulario = (e) => {


  //   // setUsuario({
  //   //   ...usuario,
  //   //   [e.target.name]: e.target.value,
  //   //   [e.target.name]: e.target.files,
  //   // });
  // };

  // const {nombre, email, telefono, direccion, imagesAvatar} = usuario;
  // console.log(usuario)

  const envioDatosEditados = (usuario, id) =>
    dispatch(editarDatosUsuarioAction(usuario, id));

  //ENVIAMOS LOS CAMBIOS HACIA EL SERVIDOR
  const submitEditarUsuario = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.set("nombre", nombre);
    formData.set("email", email);
    formData.set("telefono", telefono);
    formData.set("direccion", direccion);
    
    formData.set("imagesAvatar", imagesAvatar);

    envioDatosEditados(formData, datosUsuarioEditar._id);
    history.push(`/productos?busqueda=ultimos_productos&page=0`);
  };

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
                    name="nombre"
                    defaultValue={nombre}
                   // onChange={onChangeFormulario}
                    onChange={(e) => setNombre(e.target.value)}
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
                    name="email"
                    className="form-control"
                    defaultValue={email}
                    required
                    //onChange={onChangeFormulario}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="loginLabel">Telef</label>
                  <input
                    data-cy="telefono"
                    type="text"
                    name="telefono"
                    className="form-control"
                    defaultValue={telefono}
                    required
                    //onChange={onChangeFormulario}
                    onChange={(e) => setTelefono(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="loginLabel">Direccion</label>
                  <input
                    data-cy="direccion"
                    type="text"
                    name="direccion"
                    className="form-control"
                    defaultValue={direccion}
                    required
                    //onChange={onChangeFormulario}
                    onChange={(e) => setDireccion(e.target.value)}
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <label className="loginLabel">Avatar</label>
                  <input
                    data-cy="avatar"
                    id="imagesAvatar"
                    name="imagesAvatar"
                    type="file"
                    className="form-control"
                    defaultValue={imagesAvatar}
                   // onChange={onChangeFormulario}
                   onChange={(e) => setImagesAvatar(e.target.files[0])}
                  ></input>
                </div>
                <div className="mb-3 mt-3 text-center">
                  <button className="btn btn-outline-warning" type="submit">
                    Editar Usuario
                  </button>
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
