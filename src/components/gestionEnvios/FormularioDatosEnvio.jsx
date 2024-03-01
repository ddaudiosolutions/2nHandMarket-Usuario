import { Form, Field } from 'react-final-form';
import { /* useDispatch, */ useSelector } from 'react-redux';
/* import { sendMailPegatinas } from '../../slices/productSlice'; */
import Swal from 'sweetalert2';

function FormularioDatosEnvio({ handleClose, datosRemitente }) {
  /*  const dispatch = useDispatch(); */
  console.log(datosRemitente);
  const datosDestinatario = useSelector((state) => state.users.user);
  const onSubmit = async (values) => {
    console.log('onSubmit', values);
    Swal.fire({
      title: 'En Mantenimiento',
      text: 'Si quieres que gestionemos tu envio envia un email a info@windymarket.es',
      icon: 'info',
      confirmButtonText: 'Aceptar',
    }).then(function () {
      handleClose(false);
    });
    /* dispatch(
      sendMailPegatinas({
        sellerEmail: 'info@windymarket.es',
        sellerName: 'David',
        senderEmail: 'david.cladera@gmail.com',
        message: {
          NombreRemi: values.nombreRemi,
          DireccionRemi: values.direccionRemi,
          PoblacionCPRemi: values.poblacion_cpRemi,
          TelefonoRemi: values.telefonoRemi,
          EmailRemi: values.emailRemi,
          NombreDesti: values.nombreDesti,
          DireccionDesti: values.direccionDesti,
          PoblacionCPDesti: values.poblacion_cpDesti,
          TelefonoDesti: values.telefonoDesti,
          EmailDesti: values.emailDesti,
        },
      })
    ); 
    handleClose(false); */
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          nombreRemi: datosRemitente.nombre,
          telefonoRemi: datosRemitente.telefono,
          emailRemi: datosRemitente.email,
          direccionRemi: datosRemitente.direccion === 'undefined' ? '' : datosRemitente.direccion,
          nombreDesti: datosDestinatario.nombre,
          telefonoDesti: datosDestinatario.telefono,
          emailDesti: datosDestinatario.email,
          direccionDesti:
            datosDestinatario.direccion === 'undefined' ? '' : datosDestinatario.direccion,
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className='d-flex justify-content-between'>
              <div className='me-4'>
                <div className='mb-3'>
                  <h5 className='form-label'>Remitente</h5>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nombre y Apellidos:</label>
                  <Field
                    name='nombreRemi'
                    component='input'
                    placeholder='Nombre'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Direccion:</label>
                  <Field
                    name='direccionRemi'
                    component='input'
                    placeholder='Direccion Completa'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Poblacion y CP:</label>
                  <Field
                    name='poblacion_cpRemi'
                    component='input'
                    placeholder='Poblacion y CP'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Telefono Móvil:</label>
                  <Field
                    name='telefonoRemi'
                    component='input'
                    placeholder='Teléfono'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email:</label>
                  <Field
                    name='emailRemi'
                    component='input'
                    placeholder='Email'
                    className='form-control'
                    required
                  />
                </div>
              </div>
              <div>
                <div className='mb-3'>
                  <h5 className='form-label'>Destinatario</h5>
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Nombre y Apellidos:</label>
                  <Field
                    name='nombreDesti'
                    component='input'
                    placeholder='Nombre'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Direccion:</label>
                  <Field
                    name='direccionDesti'
                    component='input'
                    placeholder='Direccion Completa'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Poblacion y CP:</label>
                  <Field
                    name='poblacion_cpDesti'
                    component='input'
                    placeholder='Poblacion y CP'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Telefono Móvil:</label>
                  <Field
                    name='telefonoDesti'
                    component='input'
                    placeholder='Teléfono'
                    className='form-control'
                    required
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label'>Email:</label>
                  <Field
                    name='emailDesti'
                    component='input'
                    placeholder='Email'
                    className='form-control'
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='btn btn-primary'
              /* onClick={() => handleClose(false)} */ disabled={submitting}
            >
              Enviar
            </button>
          </form>
        )}
      />
    </>
  );
}

export default FormularioDatosEnvio;
