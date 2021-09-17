import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { loginUsuario } from "../actions/loginActions";
//import Swal from 'sweetalert2';


const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  //const { message } = useSelector((state) => state.message);
  //const history = useHistory()
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
      setLoading(true)
      //window.location.reload();
      dispatch(loginUsuario(email, password))
        .then(() => {        
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } 
    
    const {register, formState:{errors}, handleSubmit} = useForm();


  if (isLoggedIn) {
    return <Redirect to="/productos" />;
  }

  return (
    <div className="container-fluid vh-100" style={{ marginTop: "300px" }}>
      <div className="d-flex justify-content-center">
        <div className="rounded col-md-4 col-sm-12 shadow-lg p-5 bg-warning">
          <div className="text-center">
            <h3 className="text-primary">Acceso Usuarios</h3>
          </div>

          <form data-cy='formulario' onSubmit={handleSubmit(handleLogin)} >
            <div className="form-group">
              <label htmlFor="username">E-mail</label>
              <input
              data-cy='email'
                type="text"
                className="form-control"
                {...register("email", {required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/})}//eslint-disable-line
                id='email'
                value={email}
                onChange={onChangeUsername}                
              />
              {errors.email?.type === 'required' && 'Email is required'}
              {errors.email?.type === 'pattern' && 'El formato del mail no es correcto'}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
              data-cy='password'
                type="password"
                className="form-control"
                {...register("password")}
                value={password}
                onChange={onChangePassword}
              />
              {errors.password?.type === 'required'&& 'Password is required'}
            </div>

            <div className="form-group text-center">
              <button
                data-cy='btn-login'
                className="btn btn-primary btn-block mt-3"
                disabled={loading}
                
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
