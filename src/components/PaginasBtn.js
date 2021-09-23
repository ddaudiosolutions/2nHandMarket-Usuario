import './Producto.css'


const PaginasBtn = ({paginaS, envioPagina}) => {
    return ( 
        <button className='rounded btn btn-info page-link ' onClick={(e) => {                
            envioPagina(paginaS)
            console.log(paginaS)
               }}>{paginaS + 1}</button>
     );
}
 
export default PaginasBtn;