
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Form from "react-validation/build/form";
// import input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
//import { isEmail } from "validator";
import { useForm } from "react-hook-form";

import { registroActions } from "../actions/registroActions";


// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     console.log(value.length)
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
    
//   }
// };

// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         El formato del Email, No es Correcto!.
//       </div>
//     );
//   }
// };



// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

const CrearUsuario = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
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
    e.preventDefault();
    setSuccessful(false);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(registroActions(username, email, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="container-fluid vh-100" style={{ marginTop: "300px" }}>
      <div className="d-flex justify-content-center">
        <div className="rounded col-md-4 col-sm-12 shadow-lg p-5 bg-success">
          <div className="text-center" >
            <h3 className="" >Registrarse</h3>
          </div>

        <form onSubmit={handleSubmit(handleRegister)} >
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username" >Nombre</label>
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

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  //name="email"
                  {...register("email", {required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}//eslint-disable-line
                  //value={email}
                  onChange={onChangeEmail}
                  //validations={[validEmail]}
                />
                {errors.email?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Introduce un correo Válido
                    </h6>
                  )}
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  {...register("password", {required: true, maxLength: 8, minLength: 6})}
                  //value={password}
                  onChange={onChangePassword}
                 //validations={[vpassword]}
                />
                {errors.password?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Debes introducir una contraseña
                    </h6>
                  )}
                  {errors.password?.type === "required" && (
                    <h6 className="alert alert-warning col-6 text-center mx-auto mt-1">
                      Debes introducir una contraseña entre 6 y 8 caracteres
                    </h6>
                  )}
              </div>

              <div className="form-group text-center">
                <button className="btn btn-primary btn-block ">Registrarse</button>
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