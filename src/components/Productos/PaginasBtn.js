import './Producto.css';

const PaginasBtn = ({ paginaS, envioPagina }) => {
  return (
    <button
      className='rounded btn btn-select page-link '
      onClick={() => {
        envioPagina(paginaS);
      }}
    >
      {paginaS + 1}
    </button>
  );
};

export default PaginasBtn;
