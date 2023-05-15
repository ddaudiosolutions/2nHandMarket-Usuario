import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { registroActions } from '../actions/registroActions';

function ForgotPassword() {
  
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    e.preventDefault()
    const nombre = (e.target.value).toUpperCase();
    setUsername(nombre);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });

  const handleRegister = (e) => {
    //e.preventDefault();
    setSuccessful(false);
    // form.current.validateAll();

    dispatch(registroActions(username, email, password))
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };
// eslint-disable-next-line
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return (
    <div className=" ">
      <div className=" row justify-content-center" style={{ marginTop: "50px" }}>
      <div className="col col-lg-4 col-xl-4 " >
          <img
             src="/LOGO_CIRCULAR_SIN_FONDO.png"
            alt="WindyMArket_Logo"
            style={{ width: '20rem', objectFit:'contain'}}
            className="mx-auto d-block"
          ></img>
        </div>
        <div className="col col-lg-4 col-xl-4 ms-2">
          <div className="ounded  p-3 bg-transparent">
            <div className="text-center">
              <h3 className="loginH3">Recupera tu Acceso</h3>
            </div>

            <form onSubmit={handleSubmit(handleRegister)}>
              {!successful && (
                <div>   
                  <div className="form-group mb-2">
                    <label htmlFor="email" className="loginLabel">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="form-control"
                      //name="email"
                      {...register("email", {
                        required: "Introduce un correo",
                        pattern: { re },
                      })} //eslint-disable-line
                      onChange={onChangeEmail}
                    />
                    {errors.email && (
                      <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                        Introduce un correo Válido
                      </h6>
                    )}
                  </div>
                  <div className="form-group text-center">
                    <button className="btn btn-outline-info btn-block ">
                      Recuperar Contraseña por E-mail
                    </button>
                  </div>
                </div>
              )}
            </form>
            <div className="row mt-4">
            <Link to={'/login'} className='col-md-6'>Inicia Sesion</Link>
            <Link to={'/nuevousuario'} className='col-md-6'>Registrate</Link>           
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword