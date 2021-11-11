import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./VerBuscoPost.css";

import { obtenerBuscoPostIdApiAction } from "../actions/buscoPostActions";

import { toDate, format } from "date-fns";

const VerBuscoPost = () => {
  const post = useSelector((state) => state.buscoposts.buscoPostIdApi);
  console.log(post);

  const buscoPostIdUrl = window.location.pathname.split("/")[2];
  console.log(buscoPostIdUrl);

  const dispatch = useDispatch();

  const enviarBuscoPostId = (url) =>   
    dispatch(obtenerBuscoPostIdApiAction(url));

  useEffect(() => {
    console.log("useeffect");
    enviarBuscoPostId(buscoPostIdUrl);
    // eslint-disable-next-line
  }, []);

  if (post === null) return null;

  ///CONVERTIMOS LA FECHA A UN FORMATO COMUN
  const date = new Date(post.creado);
  const clonedDate = toDate(date);
  const clonedDateFormat = format(clonedDate, "dd-MM-yyyy");

  let authorName = post.author.nombre;

  // const cargarProductosAuthor = (post) => {
  //   dispatch(obtenerProductosActionAuthor(post.author._id));

  //   history.push(`/productos/auth/${producto.author._id}`);
  // };

  return (
    <Fragment>
      <div className="container col-sm-9 col-md-9 col-lg-7 col-xl-7">
        <div className="cardVerProducto mt-3 ">
          <div
            className="d-flex justify-content-start  mt-3"
            type="button"
            // onClick={() => cargarProductosAuthor(producto)}
          >
            {post.author.imagesAvatar[0].url === undefined ? (
              <img
                src="/Avatar_Default2.png"
                className="card-img-topAvatar ms-4 mt-3"
                alt="avatar for User"
              ></img>
            ) : (
              <img
                src={post.author.imagesAvatar[0].url}
                className="card-img-topAvatar ms-4 mt-3"
                alt="avatarUser"
              ></img>
            )}
            <h5 className="h2Author ms-2 mt-4">{authorName}</h5>
          </div>
          <div className="d-flex">
            <img
              src="/SE_BUSCA_LOGO.png"
              className="card-img-top1-buscoPost"
              alt="SE_BUSCA_IMG"
            ></img>
          </div>

          <div className="card-body">
            <h5 className="card-title titleH5V rounded text-center mt-4">
              {post.title}
            </h5>
            {/* <div className=" mb-3 text-center">
              <span className=" price-hp1">Precio: {producto.price} €</span>
            </div> */}
            <h5 className="card-title pproductoTitleFecha me-3">
              {clonedDateFormat}
            </h5>
            <div className="card-header mb-2">
              <p className="card-title pproductoTitle">{post.description}</p>
            </div>
            <div className="card-header">
              {/* <span className="card-title  pproductoTitle text-center">Contacto:</span> */}

              <p className="card-title pproductoTitle ">{post.contacto === '' ? post.author.email : post.contacto}</p>
              {/* <a className="card-title pproductoTitle" href={`https://api.whatsapp.com/send?phone=34${producto.author.telefono}&text=Hola Estoy interesado en tus productos`}>
                Mi Telefono
              </a> */}
              <p className="card-title pproductoTitle ">
                {post.author.direccion}
              </p>
            </div>

          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VerBuscoPost;
