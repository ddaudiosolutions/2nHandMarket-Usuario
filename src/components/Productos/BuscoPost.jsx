import { Fragment } from 'react';
import './BuscoPost.css';
import { useHistory } from 'react-router-dom';
// REDUX
import { useDispatch } from 'react-redux';
import { setPostId } from '../../slices/buscoPostSlice';

const BuscoPost = ({ buscoPost }) => {
  const { title } = buscoPost;
  const titulo = title.toUpperCase();
  const dispatch = useDispatch();
  const history = useHistory();

  const verBuscoPostId = (buscoPost) => {
    dispatch(setPostId(buscoPost));
    history.push(`/buscoposts/${buscoPost._id}`);
  };

  return (
    <Fragment>
      <div className='col' style={{ width: '212px', height: '284px' }}>
        <div
          className='card shadow-sm me-1 ms-1 '
          type='button'
          onClick={() => verBuscoPostId(buscoPost)}
        >
          <div className=''>
            <img
              src='/SE_BUSCA_LOGO.png'
              className='card-img-top-post'
              alt='SE_BUSCA_IMG material segunda mano'
            ></img>
          </div>
          <div className='card-body '>
            <h5 className='excerpt titleH5-post card-title m-1 text-center mb-5'>{titulo}</h5>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BuscoPost;
