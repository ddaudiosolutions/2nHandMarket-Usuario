import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './VerProducto.css';
import { toDate, format } from 'date-fns';
/* import { Helmet } from 'react-helmet'; */
import { cargarProductosAuthor, extraerIdDeURL } from '../../helpers/utils';
/* import SendMessage from '../WhatsApp/SendMessage'; */
import Footer from '../WhatsApp/layout/Footer';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import {
  addFavoriteProduct,
  obtenerDatosUsuario,
  removeFavoriteProduct,
} from '../../slices/usersSlice';
import _ from 'lodash';
import { getFavoriteProducts } from '../../slices/favoriteProductsSlice';
import {
  changeReservedProductState,
  changeVendidoProductState,
  obtenerProductoIdApi,
} from '../../slices/productSlice';
import ContactoentreUsers from '../envioMensajes/ContactoentreUsers';
import BotonGestionEnvio from '../gestionEnvios/BotonGestionEnvio';

import GestionEnvioModal from '../modals/GestionEnvioModal';
import BotonReservarProducto from './botonesProducto/BotonReservarProducto';
import BotonVendidoProducto from './botonesProducto/BotonVendidoProducto';
import BotonEditarProducto from './botonesProducto/BotonEditarProducto';
import GoogleAds from '../adsense/GoogleAds';
/* import ReactGA from 'react-ga4'; */

const VerProducto = () => {
  const producto = useSelector((state) => state.products.productoId);
  let paginaActual = useSelector((state) => state.products.paginaActual);

  if (paginaActual === undefined) {
    paginaActual = 0;
  }
  const url = window.location.href;
  const productoId = extraerIdDeURL(url);
  const dispatch = useDispatch();
  const history = useHistory();

  const fechaCreado = producto !== undefined ? producto.creado : null;
  const authorName = producto !== undefined ? producto.author.nombre : null;

  /// CONVERTIMOS LA FECHA A UN FORMATO COMUN
  const date = new Date(fechaCreado);
  const clonedDate = toDate(date);
  const clonedDateFormat = clonedDate !== 'Invalid Date' ? format(clonedDate, 'dd-MM-yyyy') : null;
  const userId = sessionStorage.getItem('userId');
  // meter el dispatch dentro de un useffect

  const [reservado, setReservado] = useState(producto ? producto.reservado : false);
  const handleReservado = () => {
    if (reservado) {
      dispatch(
        changeReservedProductState({
          productId: producto._id,
          reservado: false,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(obtenerProductoIdApi(productoId));
        }
      });
    } else if (reservado === false) {
      dispatch(
        changeReservedProductState({
          productId: producto._id,
          reservado: true,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(obtenerProductoIdApi(productoId));
        }
      });
    }
  };
  const [vendido, setVendido] = useState(producto ? producto.vendido : false);

  useEffect(() => {
    if (producto !== undefined) {
      setReservado(producto.reservado);
      setVendido(producto.vendido);
    }
  }, [producto]);

  const handleVendido = () => {
    if (vendido) {
      dispatch(
        changeVendidoProductState({
          productId: producto._id,
          vendido: false,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(obtenerProductoIdApi(productoId));
        }
      });
    } else if (vendido === false) {
      dispatch(
        changeVendidoProductState({
          productId: producto._id,
          vendido: true,
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(obtenerProductoIdApi(productoId));
        }
      });
    }
  };

  useEffect(() => {
    dispatch(obtenerProductoIdApi(productoId));
  }, [dispatch]);

  useEffect(() => {
    if (producto && producto.images && producto.images.length > 0) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', producto.images[0].url || ''); // Actualizar la URL de la imagen en las etiquetas OG
      }
    }
  }, [producto]);

  const isLogged = sessionStorage.getItem('userId') !== null;

  let productoFavoritos = [];
  if (isLogged && useSelector((state) => state.users.user) !== undefined) {
    productoFavoritos = useSelector((state) => state.users.user.favoritos);
  } else if (isLogged && useSelector((state) => state.users.user) === undefined) {
    dispatch(obtenerDatosUsuario(userId));
  }

  const existe = (productoFavoritos, producto) => {
    return _.includes(productoFavoritos, producto);
  };

  // CREAR FORMULARIO PARA GESTION DE DATOS DE ENVIO
  const [showForm, setShowForm] = useState(false);

  const [favorite, setFavorite] = useState(
    producto ? existe(productoFavoritos, producto._id) : false
  );

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (favorite) {
      dispatch(
        removeFavoriteProduct({
          productId: producto._id,
          userId: sessionStorage.getItem('userId'),
        })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    } else if (favorite === false) {
      dispatch(
        addFavoriteProduct({ productId: producto._id, userId: sessionStorage.getItem('userId') })
      ).then((res) => {
        if (res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    }
  };

  if (producto === null || producto === undefined) return null;

  /* useEffect(() => {
    // Asegúrate de que ReactGA haya sido inicializado en alguna parte de tu aplicación
    ReactGA.event({
      category: 'Producto',
      action: 'Ver_Producto',
      label: 'Visita_Producto',
    });
  }, [producto]); */

  return (
    <Fragment>
      <GestionEnvioModal
        show={showForm}
        handleClose={() => setShowForm(false)}
        datosRemitente={producto}
      />
      <div>
        <GoogleAds />
      </div>
      <div className='container col-sm-9 col-md-9 col-lg-7 col-xl-7'>
        <div className='cardVerProducto mt-3 '>
          <div className='d-flex justify-content-between'>
            <div
              className='d-flex justify-content-start  mt-3'
              type='button'
              onClick={() => cargarProductosAuthor(dispatch, history, producto)}
            >
              {producto.author.imagesAvatar[0].url === undefined ? (
                <img
                  src='/Avatar_Default2.png'
                  className='card-img-topAvatar ms-4 mt-3'
                  alt='avatar for User windymarket windsurf segunda mano'
                ></img>
              ) : (
                <img
                  src={producto.author.imagesAvatar[0].url}
                  className='card-img-topAvatar ms-4 mt-3'
                  alt='avatarUser windymarket windsurf segunda mano'
                ></img>
              )}
              <h5 className='h2Author ms-2 mt-4'>{authorName}</h5>
            </div>
            <div>
              {sessionStorage.getItem('userId') === producto.author._id && (
                <div className='mt-4'>
                  <BotonReservarProducto
                    reservado={reservado} // Cambia 'colorSiReservado' y 'colorSiNoReservado' por los colores reales que desees
                    handleReservado={handleReservado}
                    setReservado={setReservado}
                  />
                  <BotonVendidoProducto
                    vendido={vendido}
                    handleVendido={handleVendido}
                    setVendido={setVendido}
                  />
                  <BotonEditarProducto producto={producto} />
                </div>
              )}
            </div>
          </div>
          <div>
            <div
              id='carouselExampleControlsNoTouching'
              className='carousel carousel-dark slide'
              data-bs-touch='false'
              data-bs-interval='false'
            >
              <div className='carousel-inner'>
                <div className='carousel-item active'>
                  <a
                    className=' '
                    href={
                      producto.images && producto.images.length > 0 && producto.images[0].url
                        ? producto.images[0].url
                        : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg'
                    }
                    target='_blank'
                    rel='noreferrer'
                  >
                    <img
                      src={
                        producto.images && producto.images.length > 0 && producto.images[0].url
                          ? producto.images[0].url
                          : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg'
                      }
                      style={{ height: '25rem' }}
                      key={
                        producto.images && producto.images.length > 0 && producto.images[0]._id
                          ? producto.images[0]._id
                          : 'fakeImage'
                      }
                      className='card-img-top mt-3'
                      alt='...'
                    ></img>
                    {reservado && (
                      <div className='text-container mt-3'>
                        <div className='text-over-image'>Reservado</div>
                      </div>
                    )}
                    {vendido && (
                      <div className='text-container mt-3'>
                        <div className='text-over-image'>Vendido</div>
                      </div>
                    )}
                  </a>
                </div>
                {producto.images.slice(1).map((image) => (
                  <div className='carousel-item' key={image._id}>
                    <a className=' ' href={image.url} target='_blank' rel='noreferrer'>
                      <img
                        src={image.url}
                        style={{ height: '25rem' }}
                        key={image._id}
                        className='card-img-top mt-3'
                        alt='... windymarket windsurf segunda mano'
                      ></img>
                    </a>
                  </div>
                ))}
              </div>
              <button
                className='carousel-control-prev'
                type='button'
                data-bs-target='#carouselExampleControlsNoTouching'
                data-bs-slide='prev'
              >
                <span className='carousel-control-prev-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Previous</span>
              </button>
              <button
                className='carousel-control-next'
                type='button'
                data-bs-target='#carouselExampleControlsNoTouching'
                data-bs-slide='next'
              >
                <span className='carousel-control-next-icon' aria-hidden='true'></span>
                <span className='visually-hidden'>Next</span>
              </button>
            </div>
          </div>

          <div className='card-body'>
            <h4 className=' price-hp1'>Precio: {producto.price} €</h4>
            <h5 className='card-title titleH5VerProducto rounded mt-1'>{producto.title}</h5>
            <div className='container'>
              <div className='row align-items-end mb-3 mt-4'>
                {sessionStorage.getItem('userId') !== null && producto.delivery && (
                  <div className='col-auto ' style={{ paddingLeft: 0 }}>
                    <BotonGestionEnvio setShowForm={setShowForm} />
                  </div>
                )}
                <div className='col d-flex justify-content-end'>
                  <div className='col-3 pproductoTitleFecha '>{clonedDateFormat}</div>
                  {sessionStorage.getItem('userId') !== null &&
                    (favorite ? (
                      <BsHeartFill
                        className='col-1  mb-1 rounded'
                        style={{ color: 'red' }}
                        onClick={() => {
                          handleFavorite();
                        }}
                      />
                    ) : (
                      <BsHeart
                        className='col-1   mb-1 rounded'
                        style={{ color: 'black' }}
                        onClick={() => {
                          handleFavorite();
                        }}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className='card-header mb-2'>
              <p className='card-title pproductoTitle'>{producto.description}</p>
            </div>
            <div className='card-header'>
              <div className='card-title pproductoTitle'>
                {sessionStorage.getItem('userId') !== null && (
                  <>
                    {!producto.author.showPhone && (
                      <div>
                        <label>Llámame o manda un WhatsApp: {producto.author.telefono}</label>
                      </div>
                    )}
                    <ContactoentreUsers
                      productId={productoId}
                      sellerEmail={producto.author.email}
                      sellerName={producto.author.nombre}
                    />
                  </>
                )}
                {/* <SendMessage phoneNumber={producto.author.telefono} /> */}
                <Footer />
              </div>
            </div>

            <div className='text-center my-4'>
              <Link
                to={`/productos?busqueda=${producto.categoria}&page=${paginaActual}`}
                className='btn btn-outline-success'
              >
                Volver a Categoria: {producto.categoria.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerProducto;
