function IconoBusqueda({ typeProduct, handleIconClick }) {
  let icono;
  switch (typeProduct) {
    case 'tablas':
      icono = 'table_windsurf.png';
      break;
    case 'velas':
      icono = 'windsurf_sail.jpg';
      break;
    case 'mastiles':
      icono = 'mast_sail.jpg';
      break;
    case 'botavaras':
      icono = 'boom_sail.jpg';
      break;
    case 'accesorios':
      icono = 'Accesorios_Windsurf.png';
      break;
    case 'ultimos_productos':
      icono = 'windsurf_pack.jpg';
      break;
    default:
      icono = 'Avatar_Default.png';
      break;
  }
  return (
    <div className='col-md'>
      <div
        className='card text-center mb-3 rounded border-light'
        onClick={() => handleIconClick(typeProduct)}
      >
        <div className='col-md mx-auto'>
          <img
            className='card-img-top'
            src={icono}
            alt={typeProduct}
            style={{ width: '60px', height: '60px' }}
          />
        </div>
        <h6>{typeProduct}</h6>
      </div>
    </div>
  );
}

export default IconoBusqueda;
