import { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

const Bienvenida = () => {
  return (
    <Fragment>
      <div className='row '>
        <Redirect to='/productos?busqueda=ultimos_productos&page=0'> </Redirect>
      </div>
    </Fragment>
  );
};

export default Bienvenida;
