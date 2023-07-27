import BuscoPost from './BuscoPost';
const ListadoPosts = ({ buscoPosts }) => {
  console.log(buscoPosts);
  return (
    <div
      className='row row-cols-2 row-cols-xs-2 
    row-cols-sm-2 row-cols-md-3 row-cols-lg-4 
    row-cols-xl-4 row-cols-xxl-5 g-2 justify-content-center mx-5'
    >
      {!buscoPosts
        ? null
        : buscoPosts.map((buscoPost) => <BuscoPost key={buscoPost._id} buscoPost={buscoPost} />)}
    </div>
  );
};

export default ListadoPosts;
