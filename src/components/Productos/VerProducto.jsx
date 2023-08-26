import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './VerProducto.css';
import { toDate, format } from 'date-fns';
import { Helmet } from 'react-helmet';
import { cargarProductosAuthor, extraerIdDeURL } from '../../helpers/utils';
import SendMessage from '../WhatsApp/SendMessage';
import Footer from '../WhatsApp/layout/Footer';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addFavoriteProduct, obtenerDatosUsuario, removeFavoriteProduct } from '../../slices/usersSlice';
import _ from 'lodash';
import { getFavoriteProducts } from '../../slices/favoriteProductsSlice';
import { obtenerProductoIdApi } from '../../slices/productSlice';

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
  useEffect(() => {
    dispatch(obtenerProductoIdApi(productoId));
    
  }, [dispatch]);
 
  const isLogged = sessionStorage.getItem('userId') !== null;
 
  let productoFavoritos = [];
  if (isLogged && useSelector((state) => state.users.user) !== undefined){    
    productoFavoritos =  useSelector((state) => state.users.user.favoritos);      
  } else if (isLogged && useSelector((state) => state.users.user) === undefined){
    console.log('obtener datos usuario');
      
    dispatch(obtenerDatosUsuario(userId));
  }

  const existe = (productoFavoritos, producto) => {
    return _.includes(productoFavoritos, producto);
  };

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

  return (
    <Fragment>
      <div>
        <Helmet>
          <meta property='og:type' content='Product' />
          <meta property='og:title' name='title' content={producto.title} />
          <meta property='og:image' name='image' content={producto.images[0].url} />
          <meta property='og:description' name='description' content={producto.description} />
        </Helmet>
      </div>
      <div className='container col-sm-9 col-md-9 col-lg-7 col-xl-7'>
        <div className='cardVerProducto mt-3 '>
          <div
            className='d-flex justify-content-start  mt-3'
            type='button'
            onClick={() => cargarProductosAuthor(dispatch, history, producto)}
          >
            {producto.author.imagesAvatar[0].url === undefined ? (
              <img
                src='/Avatar_Default2.png'
                className='card-img-topAvatar ms-4 mt-3'
                alt='avatar for User'
              ></img>
            ) : (
              <img
                src={producto.author.imagesAvatar[0].url}
                className='card-img-topAvatar ms-4 mt-3'
                alt='avatarUser'
              ></img>
            )}
            <h5 className='h2Author ms-2 mt-4'>{authorName}</h5>
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
                  <a className=' ' href={producto.images[0].url} target='_blank' rel='noreferrer'>
                    <img
                      src={producto.images[0].url}
                      style={{ height: '25rem' }}
                      key={producto.images[0]._id}
                      className='card-img-top mt-3'
                      alt='...'
                    ></img>
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
                        alt='...'
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
            <h5 className='card-title titleH5V rounded mt-1'>{producto.title}</h5>
            <div className='container'>
              <div className='row justify-content-end'>
                <div className='col-3 align-self-end pproductoTitleFecha '>{clonedDateFormat}</div>
                {sessionStorage.getItem('userId') !== null &&
                  (favorite ? (
                    <BsHeartFill
                      className='col-1 align-self-end  mb-1 rounded'
                      style={{ color: 'red' }}
                      onClick={() => {
                        handleFavorite();
                      }}
                    />
                  ) : (
                    <BsHeart
                      className='col-1 align-self-end  mb-1 rounded'
                      style={{ color: 'black' }}
                      onClick={() => {
                        handleFavorite();
                      }}
                    />
                  ))}
              </div>
            </div>
            <div className='card-header mb-2'>
              <p className='card-title pproductoTitle'>{producto.description}</p>
            </div>
            <div className='card-header'>
              <div className='row'>
                <h4 className='align-self-start card-title pproductoTitle col-7'>
                  E-mail: {producto.author.email}
                </h4>
              </div>
              <div className='card-title pproductoTitle'>
                <SendMessage phoneNumber={producto.author.telefono} />
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
