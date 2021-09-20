
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import Form from "react-validation/build/form";
// import input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";
import { useForm } from "react-hook-form";

import { registroActions } from "../actions/registroActions";




const CrearUsuario = () => {
  // const form = useRef();
  // const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  // const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const nombre = e.target.value;
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
    formState:{errors},    
    handleSubmit,
  } = useForm({    mode:"onBlur" });
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

  const re = /^((^<>()\[\]\\.,;:\s@"]+(\.^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return (
    <div className="container-fluid vh-100" style={{ marginTop: "100px" }}>
      <div className="d-flex justify-content-center">
        <div className="rounded col-md-5 col-sm-12 shadow-lg p-4 bg-trasparent">
          <div className="text-center" >
            <h3 className="loginH3" >Registrarse</h3>
          </div>

        <form onSubmit={handleSubmit(handleRegister)} >
          {!successful && (
            <div>
              <div className="form-group mb-2">
                <label htmlFor="username" className="loginLabel">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  //name="nombre"
                  {...register('nombre', {required: true})}
                  //value={username}
                  onChange={onChangeUsername}
                  //validations={[vusername]}
                />
                {errors.nombre?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Introduce un nombre de Usuario
                    </h6>
                  )}
              </div>

              <div className="form-group mb-2">
                <label htmlFor="email" className="loginLabel">Email</label>
                <input
                  type="email"
                  required
                  className="form-control"
                  //name="email"
                  {...register("email", {required: 'Introduce un correo',
                     pattern: {re}})}//eslint-disable-line
                  
                  onChange={onChangeEmail}
                  
                />
                {errors.email && (                  
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Introduce un correo Válido
                    </h6>
                  )}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password" className="loginLabel">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register("password", {required: true})}
                  //value={password}
                  onChange={onChangePassword}
                 //validations={[vpassword]}
                />
                {errors.password?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Debes introducir una contraseña
                    </h6>
                  )}
                  {errors.password?.type === "pattern" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Debes introducir una contraseña entre 6 y 8 caracteres
                    </h6>
                  )}
              </div>

              <div className="form-group text-center">
                <button className="btn btn-outline-info btn-block ">Registrarse</button>
              </div>
            </div>
          )}

          {/* {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} /> */}
        </form>
      </div>
      </div>
    </div>
  );
};

export default CrearUsuario;