import { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProductId } from '../../slices/productSlice';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { addFavoriteProduct, removeFavoriteProduct } from '../../slices/usersSlice';
import _ from 'lodash';
import { getFavoriteProducts } from '../../slices/favoriteProductsSlice';
import './Producto.css';

const Producto = ({ producto }) => {
  const { title, price, images, description } = producto;
  const productoFavoritos =
    sessionStorage.getItem('userId') !== null
      ? useSelector((state) => state.users.user.favoritos)
      : null;
  const dispatch = useDispatch();
  const history = useHistory();
  const existe = (productoFavoritos, producto) => {
    return _.includes(productoFavoritos, producto);
  };
  const verProductoId = (producto) => {
    dispatch(setProductId(producto));
    history.push(`/productos/${producto._id}`);
  };

  const [favorite, setFavorite] = useState(existe(productoFavoritos, producto._id));
  // funcion para cambiar el estado de verdadero a falso al pulsar el boton favoritos
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

  const firstImage =
    images.length > 0 && images[0].url
      ? images[0].url
      : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1707814598/ProductosMarketV2/WINDY_fakeImage_fbkd2s.jpg';

  console.log('firstImage', firstImage);
  const firstFilename = (images.length === 0 || images[0].filename) ?? 'WindyMarket';

  return (
    <Fragment>
      <div className='col-5' style={{ width: '212px', height: '289px' }}>
        <div
          className='card me-1 ms-1 border-light'
          type='button'
          onClick={() => verProductoId(producto)}
        >
          <div className=''>
            <img src={firstImage} className='card-img-top' alt={firstFilename}></img>
          </div>
        </div>
        <div className='card-body'>
          <div className='container'>
            <div className='row'>
              <h5 className='col product-price m-1'>{price}€</h5>
              {sessionStorage.getItem('userId') !== null &&
                (favorite ? (
                  <BsHeartFill
                    className='col-2 mt-1'
                    style={{ color: 'red', paddingRight: '5px' }}
                    onClick={() => {
                      handleFavorite();
                    }}
                  />
                ) : (
                  <BsHeart
                    className='col-2 mt-1'
                    style={{ color: 'black', paddingRight: '5px' }}
                    onClick={() => {
                      handleFavorite();
                    }}
                  />
                ))}
            </div>
          </div>
          <h5 className='titleH5-product  card-title m-1'>{title}</h5>
          <div className='prodPreDescription m-1 mb-3' rows='2'>
            {description}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Producto;
