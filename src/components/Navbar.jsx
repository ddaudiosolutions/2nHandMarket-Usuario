import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import IconoBusqueda from './Productos/iconos/IconoBusqueda';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const handleIconClick = (typeProduct) => {
    history.push(`/productos?busqueda=${typeProduct}&page=0`);
    setShowMenu(false); // Oculta el menú después de hacer clic en un ícono
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-transparent'>
      <div className='container-fluid justify-content-between'>
        <button className='navbar-toggler' type='button' onClick={() => setShowMenu(!showMenu)}>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
          <ul
            className={`navbar-nav w-100 d-flex justify-content-around`}
            style={{ listStyle: 'none', padding: 0 }}
          >
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='tablas' onClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='velas' onClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='mastiles' onClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='botavaras' onClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='accesorios' onClick={handleIconClick} />
            </li>
            <li className={`nav-item me-2`} style={{ flex: '1', textAlign: 'center' }}>
              <IconoBusqueda typeProduct='ultimos_productos' onClick={handleIconClick} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
