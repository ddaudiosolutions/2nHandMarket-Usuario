import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { obtenerDatosUsuario } from '../slices/usersSlice';

const Inicio = () => {
  const dispatch = useDispatch();
  if (sessionStorage.getItem('userToken')) {
    console.log('pillando token');
    dispatch(obtenerDatosUsuario(sessionStorage.getItem('userId'))).then((res) => {
      if (res.payload.status === 200) window.location = '/';
    });
  }
  return <Redirect to='productos?busqueda=ultimos_productos&page=0'></Redirect>;
};

export default Inicio;
