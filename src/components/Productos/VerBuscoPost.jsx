import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './VerBuscoPost.css';
import { toDate, format } from 'date-fns';
import { useHistory } from 'react-router';
import { cargarProductosAuthor } from '../../helpers/utils';
import SendMessage from '../WhatsApp/SendMessage';
import Footer from '../WhatsApp/layout/Footer';

const VerBuscoPost = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const post = useSelector((state) => state.buscoPosts.setPostId);

  if (post === null) return null;

  /// CONVERTIMOS LA FECHA A UN FORMATO COMUN
  const date = new Date(post.creado);
  const clonedDate = toDate(date);
  const clonedDateFormat = format(clonedDate, 'dd-MM-yyyy');
  const authorName = post.author.nombre;

  return (
    <Fragment>
      <div className='container col-sm-9 col-md-9 col-lg-7 col-xl-7'>
        <div className='cardVerProducto mt-3 '>
          <div
            className='d-flex justify-content-start  mt-3'
            type='button'
            onClick={() => cargarProductosAuthor(dispatch, history, post)}
          >
            {post.author.imagesAvatar[0].url === undefined ? (
              <img
                src='/Avatar_Default2.png'
                className='card-img-topAvatar ms-4 mt-3'
                alt='avatar for User'
              ></img>
            ) : (
              <img
                src={post.author.imagesAvatar[0].url}
                className='card-img-topAvatar ms-4 mt-3'
                alt='avatarUser'
              ></img>
            )}
            <h5 className='h2Author ms-2 mt-4'>{authorName}</h5>
          </div>
          <div className='d-flex'>
            <img
              src='/SE_BUSCA_LOGO.png'
              className='card-img-top1-buscoPost'
              alt='SE_BUSCA_IMG'
            ></img>
          </div>

          <div className='card-body'>
            <h5 className='card-title titleH5V rounded text-center mt-4'>{post.title}</h5>
            <h5 className='card-title pproductoTitleFecha me-3'>{clonedDateFormat}</h5>
            <div className='card-header mb-2'>
              <p className='card-title pproductoTitle'>{post.description}</p>
            </div>
            <div className='card-header'>
              <SendMessage phoneNumber={post.author.telefono} />
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerBuscoPost;
