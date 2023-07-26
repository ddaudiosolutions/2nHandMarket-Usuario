import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import FormBusqueda from '../FormBusqueda';
import ListaProductos from './ListaProductos';
import ListadoPosts from './ListadoPosts';

import './Producto.css';
import { obtenerProductos } from '../../slices/productSlice';
import { obtenerBuscoPosts } from '../../slices/buscoPostSlice';
import { obtenerDatosUsuario } from '../../slices/usersSlice';

const Productos = () => {
  // const history = useHistory();
  const productos = useSelector((state) => state.products.prodAll);
  const paginasTotales = useSelector((state) => state.products.totalPages);

  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const buscoPosts = useSelector((state) => state.buscoPosts.obtenerBuscoPost);
  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);
  console.log(buscoPosts);

  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const params = new URL(document.location).searchParams;
  const busquedaquery = params.get('busqueda');
  const pagequery = params.get('page');

  const dispatch = useDispatch();

  const cargarProductos = () => dispatch(obtenerProductos({ busquedaquery, pagequery }));
  const cargarBuscoPosts = () => dispatch(obtenerBuscoPosts());

  const userData = useSelector((state) => state.users.user);

  useEffect(() => {
    if (userData === undefined) {
      console.log('cargando usuario');
      dispatch(obtenerDatosUsuario(sessionStorage.getItem('userId')));
    }
    cargarBuscoPosts();
    cargarProductos(busquedaquery, pagequery);
    // eslint-disable-next-line
  }, [busquedaquery, pagequery]);

  return (
    <Fragment>
      <div className='container '>
        <div className='row'>
          <div className='bg-form col-12 justify-content-center mx-auto rounded mb-3 mt-2'>
            <div className='mb-3 col-9 mx-auto bg-form mt-4'>
              <div className='col col-lg-9 mx-auto'>
                <h2 className='text-center'>¿Qué buscas hoy?</h2>
              </div>
              <div className='col col-md-9 col-lg-9 mx-auto bg-form mt-5 '>
                <FormBusqueda busquedaquery={busquedaquery} />
              </div>
            </div>
          </div>
          <div className='col mx-auto'>
            <ListaProductos productos={productos} />
          </div>

          <div className='d-flex justify-content-center mt-4 '>
            {busquedaquery !== 'ultimos_productos'
              ? paginas.map((pagina) => (
                  <Link
                    type='submit'
                    key={pagina}
                    to={`/productos?busqueda=${busquedaquery}&page=${pagina}`}
                    className='rounded btn btn-select page-link'
                  >
                    {pagina + 1}
                  </Link>
                ))
              : null}
          </div>

          <div className='col mx-auto mt-4 mb-2'>
            {busquedaquery === 'ultimos_productos' ? (
              <Fragment>
                <div className='bg-form col-9 justify-content-center mx-auto rounded mb-3 mt-2'>
                  <div className=' bg-form text-center mb-3 p-4 rounded'>
                    <div className='col col-lg-9 mx-auto'>
                      <h2 className=' '>Pide lo que Quieras Encontrar</h2>
                    </div>
                  </div>
                </div>

                <div className='col-12 mx-auto'>
                  <ListadoPosts buscoPosts={buscoPosts} />
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Productos;