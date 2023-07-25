import { Fragment } from "react";
import "./Producto.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProductId } from "../../slices/productSlice";


const Producto = ({ producto }) => {
  const {
    title,
    price,
    images,
    description,
  } = producto;
  console.log(producto);
  const dispatch = useDispatch();
  const history = useHistory();

  const verProductoId = (producto) => {
    console.log(producto)
    dispatch(setProductId(producto));
    history.push(`/productos/${producto._id}`);
  };
  const firsImage = images[0].url ? images[0].url : 'https://res.cloudinary.com/dhe1gcno9/image/upload/v1645218203/ProductosMarketV2/AvataresUsuarios/LOGO_CIRCULAR_FONDO_BLANCO_cvhmuo.png';
  const firsFilename = images[0].filename ? images[0].filename : 'WindyMarket';

  return (
    <Fragment>
      <div className="col">
        <div
          className="card shadow-sm me-1 ms-1 "
          type="button"
          onClick={() => verProductoId(producto)}
        >
          <div className="">
            <img
              src={firsImage}
              className="card-img-top"
              alt={firsFilename}
            ></img>

          </div>
          <div className="card-body">
            <h5 className="excerpt titleH5 card-title m-1">{title}</h5>
            <h5 className="price-hp m-1 mb-3">{price}€</h5>
            <div className="excerpt pproductoTitle m-1 mb-3" rows="1">
              {description}
            </div>

          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default Producto;
