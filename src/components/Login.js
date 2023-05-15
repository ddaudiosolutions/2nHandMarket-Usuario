import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {  Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUsuarioActions } from "../actions/loginActions";


const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const email = e.target.value;
    setUsername(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = () => {
    //e.preventDefault()
    setLoading(true);
    //window.location.reload();
    dispatch(loginUsuarioActions(email, password))
       .then((res) => {
        if(res.status === 200){
          window.location = "/";
        }

       })
      .catch(() => {
        setLoading(false);
      });
      
  };

//MANEJO DE MENSAJES DE ERROR
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onBlur" });


  return (
    <div className="">
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
          <div className="rounded m-3 bg-transparent">
            <div className="text-center">
              <h3 className="loginH3">Acceso Usuarios</h3>
            </div>

            <form data-cy="formulario" onSubmit={handleSubmit(handleLogin)}>
              <div className="form-group mb-2">
                <label className="loginLabel" htmlFor="username">
                  E-mail
                </label>
                <input
                  data-cy="email"
                  type="text"
                  className="form-control"
                  {...register("email", {
                    required: true,
                    pattern: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  })} //eslint-disable-line
                  id="email"
                  //value={email}
                  onChange={onChangeUsername}
                />
                {errors.email?.type === "required" && (
                  <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                    Email is required
                  </h6>
                )}
                {errors.email?.type === "pattern" && (
                  <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                    El mail no es correcto
                  </h6>
                )}
              </div>

              <div className="form-group">
                <label className="loginLabel" htmlFor="password">
                  Password
                </label>
                <input
                  data-cy="password"
                  type="password"
                  className="form-control"
                  {...register("password", { required: true })}
                  //value={password}
                  onChange={onChangePassword}
                />
                {errors.password?.type === "required" && (
                  <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                    Password is required
                  </h6>
                )}
              </div>

              <div className="form-group text-center">
                <button
                  data-cy="btn-login"
                  className="btn btn-outline-info btn-block mt-3"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            </form>
            <div className="row mt-4">
            <Link to={'/nuevousuario'} className='col-md-6'>Registrate</Link>
            <Link to={'/forgotpassword'} className='col-md-6'>Olvidé mi Contraseña</Link>
            </div>           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
