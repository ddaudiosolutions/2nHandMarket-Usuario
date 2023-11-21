import Producto from './Producto';
const ListaProductosBusqueda = ({ productos }) => {
  console.log(productos);
  return (
    <div
      className='row row-cols-2 row-cols-xs-4 row-cols-sm-3 
    row-cols-md-3 row-cols-lg-4 row-cols-xl-4 row-cols-xxl-4 g-2 justify-content-center mx-4 '
    >
      {!productos
        ? null
        : productos.map((producto, busqueda) => (
            <Producto key={producto._id} producto={producto} busqueda={busqueda} />
          ))}
    </div>
  );
};

export default ListaProductosBusqueda;
