import { BsJournal } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setProductToEdit } from '../../../slices/productSlice';
import { useHistory } from 'react-router';

const BotonEditarProducto = ({ producto }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sendtoEdicion = (producto) => {
    dispatch(setProductToEdit(producto));
    history.push(`/productos/user/editar/${producto._id}`);
  };
  return (
    <BsJournal
      className='ms-3'
      style={{ /* color: 'red', */ fontSize: '2.5rem' }}
      onClick={() => {
        sendtoEdicion(producto);
      }}
    />
  );
};

export default BotonEditarProducto;
