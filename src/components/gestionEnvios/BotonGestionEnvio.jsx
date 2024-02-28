function BotonGestionEnvio({ setShowForm }) {
  return (
    <>
      <button
        className='btn btn-primary'
        onClick={() => {
          setShowForm(true);
        }}
      >
        Gestionar Envíos
      </button>
    </>
  );
}

export default BotonGestionEnvio;
