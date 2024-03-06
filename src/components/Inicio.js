import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { obtenerDatosUsuario } from '../slices/usersSlice';

const Inicio = () => {
  const dispatch = useDispatch();

  // Verifica tanto el token como el userId antes de hacer el dispatch
  const userToken = sessionStorage.getItem('userToken');
  const userId = sessionStorage.getItem('userId');
  if (userToken && userId) {
    console.log('Pillando token y userId');
    dispatch(obtenerDatosUsuario(userId)).then((res) => {
      if (res.payload && res.payload.status === 200) {
        window.location = '/';
      }
    });
  }
  console.log('INICIO si token');

  // Si no hay token o userId, se redirecciona directamente sin hacer el dispatch
  return <Redirect to='productos?busqueda=ultimos_productos&page=0'></Redirect>;
};

export default Inicio;

