import { Fragment } from "react";
import "./Producto.css";
import { useHistory } from "react-router-dom";
//import { useSelector } from "react-redux";
import Swal from "sweetalert2";
//REDUX
import { useDispatch } from "react-redux";
import {borrarBuscoPostsUserAction, obtenerBuscoPostEditarAction} from '../actions/buscoPostActions'
// import { obtenerProductoEditarActionUser } from "../actions/productoActions";
// import { borrarProductoAction } from "../actions/productoActions";

const ProductoUser = ({ postUser }) => {
  //const { user: currentUser } = useSelector((state) => state.auth);
  const { title, _id } = postUser;
  //console.log(_id)
  const dispatch = useDispatch();
  const history = useHistory();

 // console.log(currentUser);

  //Confirmar si desea Eliminar el Producto
  const confirmarBorrarBuscoPosts = (_id) => {
    Swal.fire({
      title: "Seguro quieres eliminar ?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar Busqueda!",
    }).then((result) => {
      if (result.isConfirmed) {
        //pasalor al Action
        dispatch(borrarBuscoPostsUserAction(_id));
        // la confirmación de esto se pasa al productoAction correspondiente
      }
    });
    //history.push('/productos')
  };

  const sendtoEdicion = () => {
    dispatch(obtenerBuscoPostEditarAction(postUser));
    console.log(postUser)
    history.push(`/buscoposts/user/editar/${postUser._id}`);
  };
  return (
    <Fragment>
      <div className="col">
        <div className="card shadow-sm me-1 ms-1 mt-4">
        <img
              src='/SE_BUSCA_LOGO.png'
              className="card-img-top-post"
              alt='SE_BUSCA_IMG'
            ></img>
          
          <div className="card-body">           
            <h5 className="titleH5 card-title text-center">{title}</h5>
            <div className="container-fluid text-center mt-3 mb-3 gap-2">
              <button
                className="btn btn-outline-success me-2"
                onClick={() => sendtoEdicion(postUser)}
              >
                Editar Producto
              </button>

              <button
                className="btn btn-outline-warning "
                 onClick={() => confirmarBorrarBuscoPosts(_id)}
              >
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      </div>

      
    </Fragment>
  );
};

export default ProductoUser;
