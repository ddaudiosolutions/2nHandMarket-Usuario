import { Fragment } from "react";
//import imageNull from "../images/logo192.png";
import { useHistory, } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
//REDUX
import { useDispatch } from "react-redux";
import { editarProductoActionUser, obtenerProductoEditarActionUser } from "../actions/productoActions";
import { borrarProductoAction } from "../actions/productoActions";

const ProductoUser = ({ producto }) => {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { title, price, images , _id } = producto;
  console.log(_id)
  const dispatch = useDispatch();
  const history = useHistory();
 
  console.log(currentUser);

  
  //Confirmar si desea Eliminar el Producto
  const confirmarBorrarProducto = (_id) => {
    Swal.fire({
      title: "Seguro quieres eliminar ?",
      text: "Esta acción no se puede revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrar Producto!",
    }).then((result) => {
      if (result.isConfirmed) {        
        //pasalor al Action
        dispatch(borrarProductoAction(_id));
        // la confirmación de esto se pasa al productoAction correspondiente
      }
    });
    //history.push('/productos')
  };

  
  const sendtoEdicion = producto => {
    dispatch(obtenerProductoEditarActionUser(producto))   
    console.log(producto)
    history.push(`/productos/user/editar/${producto._id}`)

  }
  return (
    <Fragment>
      <div className="card mb-2 ">
        <div className="card-header text-center">
          <h5>{title}</h5>
        </div>
        <img className="card-img-top" src={images[0].url} alt="imagen nula"></img>
        <div className="card-body text-center">
          <p style={{ color: "red" }}>{price}€</p>
        </div>
        <div className="card-body text-center">
          <button
            className="btn btn-success"
            onClick={() => sendtoEdicion(producto)}
          >
            Editar Producto
          </button>
        </div>
        <div className="card-body text-center">
          <button
            className="btn btn-danger"
            onClick={() => confirmarBorrarProducto(_id)}
          >
            Eliminar Producto
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductoUser;
