import { Fragment } from 'react';
import './Producto.css';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import {
  borrarProducto,
  setProductId,
  setProductToEdit,
  obtenerProductosAuthor,
} from '../../slices/productSlice';

const ProductoUser = ({ producto }) => {
  const { title, price, images, _id, description } = producto;
  const dispatch = useDispatch();
  const history = useHistory();

  // Confirmar si desea Eliminar el Producto
  const confirmarBorrarProducto = (_id) => {
    Swal.fire({
      title: 'Seguro quieres eliminar ?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar Producto!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(borrarProducto(_id)).then((res) => {
          dispatch(obtenerProductosAuthor(producto.author._id));
          history.push(`/productos/auth/${producto.author._id}`);
        });
      }
    });
  };

  const verProductoId = (producto) => {
    console.log(producto);
    dispatch(setProductId(producto));
    history.push(`/productos/${producto._id}`);
  };

  const sendtoEdicion = (producto) => {
    dispatch(setProductToEdit(producto));
    history.push(`/productos/user/editar/${producto._id}`);
  };
  return (
    <Fragment>
      <div className='col'>
        <div
          className='card shadow-sm me-1 ms-1 '
          type='button'
          onClick={() => verProductoId(producto)}
        >
          <img src={images[0].url} className='card-img-top ' alt={images[0].filename}></img>
          <div className='card-body '>
            <h5 className='excerpt titleH5 card-title'>{title}</h5>
            <h5 className='price-hp m-1 mb-1'>{price}€</h5>
            <div className='excerpt pproductoTitle m-1 mb-1' rows='1'>
              {description}
            </div>
          </div>
        </div>
        {producto.author._id === sessionStorage.getItem('userId') && (
          <div className='card-footer text-center mb-3 gap-2 rounded m-2 me-2'>
            <button
              className='col-md-3 m-2 ms-3 btn btn-outline-success me-2'
              onClick={() => sendtoEdicion(producto)}
            >
              Editar
            </button>

            <button
              className='col-md-4 m-2 ms-3 btn btn-outline-warning me-2'
              onClick={() => confirmarBorrarProducto(_id)}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductoUser;
