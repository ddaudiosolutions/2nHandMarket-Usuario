import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUsuario } from '../../slices/usersSlice';
import { Field, Form } from 'react-final-form';
import './Usuario.css';

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const submitLogin = (values) => {
    console.log(values);
    setLoading(true);
    dispatch(loginUsuario({ email: values.email, password: values.password })).then((res) => {
      console.log(res);
      if (res.payload.status === 200) {
        console.log('super logeado');
        window.location = '/';
      }
    });
  };

  return (
    <div className=''>
      <div className=' row justify-content-center' style={{ marginTop: '50px' }}>
        <div className='col col-lg-4 col-xl-4 '>
          <img
            src='/LOGO_CIRCULAR_SIN_FONDO.png'
            alt='WindyMArket_Logo'
            style={{ width: '20rem', objectFit: 'contain' }}
            className='mx-auto d-block'
          ></img>
        </div>
        <div className='col col-lg-4 col-xl-4 ms-2'>
          <div className='rounded m-3 bg-transparent'>
            <div className='text-center'>
              <h3 className='loginH3'>Acceso Usuarios</h3>
            </div>
            <Form
              onSubmit={submitLogin}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                }
                if (!values.password) {
                  errors.password = 'Required';
                }
                return errors;
              }}
              render={({ submitError, handleSubmit, values }) => (
                <form onSubmit={handleSubmit}>
                  <Field name='email'>
                    {({ input, meta }) => (
                      <div>
                        <label>Email</label>
                        <input {...input} type='email' className='form-control' />
                        {(meta.error || meta.submitError) && meta.touched && (
                          <span className='error'>{meta.error || meta.submitError}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name='password'>
                    {({ input, meta }) => (
                      <div>
                        <label>Password</label>
                        <input {...input} type='password' className='form-control' />
                        {meta.error && meta.touched && <span className='error'>{meta.error}</span>}
                      </div>
                    )}
                  </Field>
                  {submitError && <div className='error'>{submitError}</div>}
                  <div className='form-group text-center'>
                    <button
                      data-cy='btn-login'
                      className='btn btn-outline-info btn-block mt-3'
                      disabled={loading}
                    >
                      {loading && <span className='spinner-border spinner-border-sm'></span>}
                      <span>Login</span>
                    </button>
                  </div>
                  {/*    <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                </form>
              )}
            />

            <div className='row mt-4'>
              <Link to={'/nuevousuario'} className='col-md-6'>
                Registrate
              </Link>
              <Link to={'/forgotpassword'} className='col-md-6'>
                Olvidé mi Contraseña
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
