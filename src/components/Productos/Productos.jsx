import { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import ListaProductos from './ListaProductos';
import ListadoPosts from './ListadoPosts';

import './Producto.css';
import {
  obtenerProductos,
  obtenerProductosMasVistos,
  obtenerProductosPorPalabras,
} from '../../slices/productSlice';
import { obtenerBuscoPosts } from '../../slices/buscoPostSlice';
import { obtenerDatosUsuario } from '../../slices/usersSlice';
import { getFavoriteProducts } from '../../slices/favoriteProductsSlice';
import SearchByWords from './busquedaPorTexto/SearchByWords';
import Navbar from '../Navbar';
import HappyBanner from '../banners/HappyBanner';
import { ProductoMasVistos } from '../googleAnalytics/ProductoMasVistos';
import { Helmet } from 'react-helmet';

import WebCamsContainer from '../webCams/WebCamsContainer';
import GoogleAds from '../adsense/GoogleAds';

const Productos = () => {
  // const history = useHistory();
  const productos = useSelector((state) => state.products.productos.prodAll);
  const productosPorPalabras = useSelector((state) => state.products.productsByWords);
  const paginasTotales = useSelector((state) => state.products.totalPages);
  const productosMasVistos = useSelector(
    (state) => state.products.productosMasVistos.productosVistas
  );
  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const buscoPosts = useSelector((state) => state.buscoPosts.obtenerBuscoPost);
  const paginas = new Array(paginasTotales).fill(null).map((v, i) => i);

  // TRAEMOS LAS SOLICITUDES DE BUSQUEDA
  const params = new URL(document.location).searchParams;
  const busquedaquery = params.get('busqueda');
  const pagequery = params.get('page');
  const [searchWords, setSearchWords] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const mostrarProductoMasVistos =
    location.pathname === '/productos' && location.search === '?busqueda=ultimos_productos&page=0';

  const cargarProductos = () =>
    dispatch(obtenerProductos({ busquedaquery, pagequery })).then(() =>
      dispatch(obtenerProductosMasVistos())
    );
  const cargarBuscoPosts = () => dispatch(obtenerBuscoPosts());
  /* const userData = useSelector((state) => state.users.user); */
  useEffect(() => {
    cargarBuscoPosts();
    cargarProductos(busquedaquery, pagequery);
  }, [busquedaquery, pagequery]);

  useEffect(() => {
    if (sessionStorage.getItem('userId')) {
      dispatch(obtenerDatosUsuario(sessionStorage.getItem('userId'))).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.favoritos));
        }
      });
    }
  }, [sessionStorage.getItem('userId')]);

  useEffect(() => {
    dispatch(obtenerProductosPorPalabras(searchWords));
  }, [searchWords]);

  return (
    <Fragment>
      <Helmet>
        <title>WindyMarket</title>
        <meta name='description' content='Material windsurf segunda mano' />
        <meta
          name='keywords'
          content='windsurf, botavara, arnés, vela, aleta, wingfoil, foil, freride, slalom'
        />
        <meta name='author' content='Windymarket' />
        <meta property='og:title' content='Material windsurf segunda mano' />
        <meta
          property='og:description'
          content='Material de windsurf, wingfoil, foil, de segunda mano'
        />
        {/*   <meta property='og:image' content='https://example.com/image.jpg' />
        <meta property='og:url' content='https://example.com/my-page' /> */}
      </Helmet>
      <div className='container '>
        <div className='row'>
          <div className='bg-form col-12 justify-content-center mx-auto rounded mb-3 mt-2'>
            <WebCamsContainer />
            <div className='mx-auto'>
              <SearchByWords setSearchWords={setSearchWords} />
            </div>
            <div className='mb-3 col-9 mx-auto bg-form mt-4'>
              <div className='col col-lg-9 mx-auto'>
                <GoogleAds />
                <h2 className='text-center mb-5'> Compra y vende material para Navegar </h2>
              </div>
              <div>
                <div className='row'>
                  <Navbar />
                </div>
              </div>
            </div>
          </div>
          <div className='col mx-auto mt-3'>
            {productosPorPalabras !== undefined && productosPorPalabras.length === 0 ? (
              <>
                <h2 className='text-center'> Últimas novedades </h2>
                <ListaProductos productos={productos} />
              </>
            ) : (
              <ListaProductos productos={productosPorPalabras} />
            )}
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

          {mostrarProductoMasVistos && productosMasVistos !== undefined ? (
            <div className='mt-3'>
              <h2 className='text-center'> Productos Más Vistos </h2>
              <div className='d-flex justify-content-center mt-4 '>
                <ProductoMasVistos productosMasvistos={productosMasVistos} />
              </div>
            </div>
          ) : null}
          <HappyBanner />
          <div className='col mx-auto mt-4 mb-2'>
            {busquedaquery === 'ultimos_productos' ? (
              <Fragment>
                <div className='bg-form col-9 justify-content-center mx-auto rounded mb-3 mt-2'>
                  <div className=' bg-form text-center mb-3 p-4 rounded'>
                    <div className='col col-lg-9 mx-auto'>
                      <h4 className=' '>Pide lo que Quieras Encontrar</h4>
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
