import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FormData from 'form-data';

import './Usuario.css';
import { editarDatosUsuario } from '../../slices/usersSlice';
import { Field, Form } from 'react-final-form';
import Swal from 'sweetalert2';

const EditarUser = () => {
  const dispatch = useDispatch();
  const datosUsuarioEditar = useSelector((state) => state.users.user);

  // ENVIAMOS LOS CAMBIOS HACIA EL SERVIDOR
  const submitEditarUsuario = (values) => {
    if (validateTelefono(values.telefono)) {
      const formData = new FormData();
      formData.set('nombre', values.nombre);
      formData.set('email', values.email);
      formData.set('telefono', values.telefono);
      formData.set('direccion', values.direccion);
      formData.set('imagesAvatar', values.imagesAvatar);
      dispatch(editarDatosUsuario({ formData, id: datosUsuarioEditar._id }));
    } else {
      Swal.fire('Error', 'Introduce un numero de telefono válido', 'error');
      return undefined;
    }
  };

  const validateTelefono = (value) => {
    const telefonoRegex = /^\d{9}$/;
    return telefonoRegex.test(value);
  };

  // Función de validación personalizada para el campo de teléfono

  return (
    <Fragment>
      <div className='row col-10 rotulo mx-auto text-center justify-content-center mt-3'>
        <h3 className='loginH3Us'>Edita tus Datos {datosUsuarioEditar.nombre}</h3>
      </div>
      <div className='card1 col-10 mx-auto'>
        <div className='row justify-content-center'>
          <div className='col col-lg-4 col-xl-4 ms-2'>
            <div className='rounded m-3 bg-transparent'>
              <Form
                onSubmit={submitEditarUsuario}
                initialValues={datosUsuarioEditar}
                render={({ handleSubmit, values }) => (
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor='nombre' className='loginLabel'>
                        Nombre
                      </label>
                      <Field
                        className='form-control mb-2'
                        name='nombre'
                        component='input'
                        value={datosUsuarioEditar.nombre}
                      />
                    </div>
                    <div>
                      <label htmlFor='email' className='loginLabel'>
                        E-mail
                      </label>
                      <Field
                        className='form-control mb-2'
                        name='email'
                        component='input'
                        value={datosUsuarioEditar.email}
                      />
                    </div>
                    <div>
                      <label htmlFor='telefono' className='loginLabel'>
                        Teléfono
                      </label>
                      <Field
                        className='form-control mb-2'
                        name='telefono'
                        component='input'
                        value={datosUsuarioEditar.telefono}
                      />
                    </div>
                    <div>
                      <label htmlFor='direccion' className='loginLabel'>
                        Dirección
                      </label>
                      <Field
                        className='form-control mb-2'
                        name='direccion'
                        component='input'
                        value={datosUsuarioEditar.direccion}
                      />
                    </div>
                    <div>
                      <label htmlFor='imagesAvatar' className='loginLabel'>
                        Avatar
                      </label>
                      <Field
                        className='form-control mb-2'
                        name='imagesAvatar'
                        component={FileInput}
                        value={datosUsuarioEditar.imagesAvatar[0].url}
                      />
                    </div>

                    {/*  <pre className='bg-success'>{JSON.stringify(values, 0, 2)}</pre> */}
                    <div className='form-group text-center'>
                      <button className='btn btn-outline-info btn-block '>Editar Usuario</button>
                    </div>
                  </form>
                )}
              />

              <div className='text-center'></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const FileInput = ({ input }) => (
  <input type='file' onChange={(event) => input.onChange(event.target.files[0])} />
);

export default EditarUser;
