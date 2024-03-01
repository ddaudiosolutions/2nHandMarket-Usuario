// useFavoriteHandler.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFavoriteProduct, 
  removeFavoriteProduct, 
  getFavoriteProducts } from 'path/to/your/actions';

const useFavoriteHandler = (producto, existe) => {
  const [favorite, setFavorite] = useState(existe); // Asumiendo un estado inicial, ajusta según sea necesario
  const dispatch = useDispatch();

  const handleFavorite = () => {
    setFavorite(!favorite);

    if (favorite) {
      dispatch(removeFavoriteProduct({
        productId: producto._id,
        userId: sessionStorage.getItem('userId'),
      })).then((res) => {
        if (res.payload && res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    } else {
      dispatch(addFavoriteProduct({
        productId: producto._id,
        userId: sessionStorage.getItem('userId'),
      })).then((res) => {
        if (res.payload && res.payload.status === 200) {
          dispatch(getFavoriteProducts(res.payload.data.user.favoritos));
        }
      });
    }
  };

  return { favorite, handleFavorite };
};

export default useFavoriteHandler;
