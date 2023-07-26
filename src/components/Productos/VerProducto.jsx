import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './VerProducto.css';
import { toDate, format } from 'date-fns';
import { Helmet } from 'react-helmet';
import { cargarProductosAuthor } from '../../helpers/utils';
import SendMessage from '../WhatsApp/SendMessage';
import Footer from '../WhatsApp/layout/Footer';

const VerProducto = () => {
  const producto = useSelector((state) => state.products.productoId);
  // const productoIdurl = window.location.pathname.split("/")[2];

  let paginaActual = useSelector((state) => state.products.paginaActual);
  if (paginaActual === undefined) {
    paginaActual = 0;
  }
  console.log(producto);
  const dispatch = useDispatch();
  const history = useHistory();

  if (producto === null) return null;

  /// CONVERTIMOS LA FECHA A UN FORMATO COMUN
  const date = new Date(producto.creado);
  const clonedDate = toDate(date);
  const clonedDateFormat = format(clonedDate, 'dd-MM-yyyy');

  const authorName = producto.author.nombre;

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
            <h5 className='card-title titleH5V rounded text-center mt-4'>{producto.title}</h5>
            <div className=' mb-3 text-center'>
              <span className=' price-hp1'>Precio: {producto.price} €</span>
            </div>
            <h5 className='card-title pproductoTitleFecha me-3'>{clonedDateFormat}</h5>
            <div className='card-header mb-2'>
              <p className='card-title pproductoTitle'>{producto.description}</p>
            </div>
            <div className='card-header'>
              <p className='card-title pproductoTitle '>{producto.author.email}</p>
              {/*  <p className="card-title pproductoTitle ">
                {producto.author.direccion}
              </p> */}

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
