import { Fragment } from "react";
import "./Producto.css";
import { useHistory } from "react-router-dom";
//import { useSelector } from "react-redux";
import Swal from "sweetalert2";
//REDUX
import { useDispatch } from "react-redux";
import { obtenerProductoEditarActionUser } from "../actions/productoActions";
import { borrarProductoAction } from "../actions/productoActions";

const ProductoUser = ({ producto }) => {
  //const { user: currentUser } = useSelector((state) => state.auth);
  const { title, price, images, _id } = producto;
  //console.log(_id)
  const dispatch = useDispatch();
  const history = useHistory();

 // console.log(currentUser);

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

  const sendtoEdicion = (producto) => {
    dispatch(obtenerProductoEditarActionUser(producto));
    //console.log(producto)
    history.push(`/productos/user/editar/${producto._id}`);
  };
  return (
    <Fragment>
      <div className="col">
        <div className="card shadow-sm me-1 ms-1 mt-4">
          <img
            src={images[0].url}
            className="card-img-top mt-3"
            alt={images[0].filename}
          ></img>
          <div className="card-body">
            <div className="card-body text-center">
              <span className="price-hp">{price} €</span>
            </div>
            <h5 className="titleH5 card-title text-center">{title}</h5>
            <div className="container-fluid text-center mt-3 mb-3 gap-2">
              <button
                className="btn btn-outline-success me-2"
                onClick={() => sendtoEdicion(producto)}
              >
                Editar Producto
              </button>

              <button
                className="btn btn-outline-warning "
                onClick={() => confirmarBorrarProducto(_id)}
              >
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-sm-6 col-md-3 col-lg-3 col-xl-2">
        <div className="card m-2 bg-grey">
          <div className="card-header text-center mb-3 ">
            <h5>{title}</h5>
          </div>
          <img
            className="image-fluid m-3"
            style={{ height: "100px", objectFit: "cover" }}
            src={images[0].url}
            alt="imagen nula"
          ></img>
          <div className="card-body text-center">
            <p style={{ color: "red" }}>{price}€</p>

            <div className="card-body ">
              <button
                className="btn btn-success mb-2"
                onClick={() => sendtoEdicion(producto)}
              >
                Editar Producto
              </button>

              <button
                className="btn btn-danger ml-2"
                onClick={() => confirmarBorrarProducto(_id)}
              >
                Eliminar Producto
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};

export default ProductoUser;
