//* AQUI ESTARÁ EL FORMULARIO PARA EL PRODUCTO
import styled from 'styled-components';
import './NuevoBuscoPost.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editarBuscoPostAction } from '../../slices/buscoPostSlice';
import { cargarProductosAuthor } from '../../helpers/utils';
import Swal from 'sweetalert2';
import { Field, Form } from 'react-final-form';

const Label = styled.label`
  font-family: Saira;
`;

const EditarBuscoPost = () => {
  // UTILIZAR USEDISPATCH Y TE CREA UNA FUNCION
  const history = useHistory();
  const dispatch = useDispatch();

  // TOMAR LOS DATOS DEL BUSCOPOST
  const editPost = useSelector((state) => state.buscoPosts.postToEdit);
  const contacto = useSelector((state) => state.buscoPosts.postsUser[0].author);

  // AL HACER SUBMIT EN EL FORMULARIO
  const submitEditarBuscoPost = (values) => {
    const { contacto, descripcionBuscoPost, title } = values;
    dispatch(
      editarBuscoPostAction({
        title,
        description: descripcionBuscoPost,
        contacto,
        id: editPost._id,
      })
    ).then((res) => {
      if (res.payload.status === 200) {
        Swal.fire('Correcto', 'POST EDITADO CON EXITO', 'success').then(function () {
          cargarProductosAuthor(dispatch, history, editPost);
        });
      }
    });
    history.push('/productos/user');
  };

  const required = (value) => value === (undefined || '') && 'Debes Rellenar este campo';

  return (
    <div className='container-fluid  rounded my-4 p-2'>
      <div className='d-flex justify-content-center'>
        <div className='rounded col-12 col-sm-12 shadow-lg p-3 bg-trasparent'>
          <h2 className='text-center mx-auto font-wight-bold mb-5'>
            Agregar Nuevo Post de Busqueda
          </h2>
          <Form
            onSubmit={submitEditarBuscoPost}
            initialValues={{
              title: editPost.title,
              descripcionBuscoPost: editPost.description,
              contacto: contacto.email,
            }}
            render={({ handleSubmit, values }) => (
              <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <Field name='title' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className='mb-2'>Título</Label>
                        <input {...input} type='text' className='form-control mb-2' />
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className='mb-3'>
                  <Field name='descripcionBuscoPost' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className='mb-2'> Descripción de la Busqueda </Label>
                        <input {...input} type='text' className='form-control mb-2' />
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className='mb-3'>
                  <Field name='contacto' validate={required}>
                    {({ input, meta }) => (
                      <div>
                        <Label className='mb-2'>Contacto</Label>
                        <input {...input} type='textarea' className='form-control mb-2' />
                        {meta.error && meta.touched && (
                          <span className='error'>Este campo es requerido</span>
                        )}
                      </div>
                    )}
                  </Field>
                </div>
                <div className='mb-3 mt-3 text-center'>
                  <button className='btn btn-outline-warning' type='submit'>
                    Agregar Post de Busqueda
                  </button>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default EditarBuscoPost;
